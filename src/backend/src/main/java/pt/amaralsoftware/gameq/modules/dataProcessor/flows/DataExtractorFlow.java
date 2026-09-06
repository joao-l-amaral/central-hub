package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@ApplicationScoped
public class DataExtractorFlow extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataExtractorFlow.class);

    private static final long MAX_UNCOMPRESSED_SIZE = 1024L * 1024 * 1024;

    @Override
    public ParsingResult executeWorkflow(GameQParsingStates currentState) {
        log.info("Starting extractor flow by extracting {}", METADATA_DOWNLOAD_PATH);

        File destDir = new File(FILE_EXTRACTED_PATH);
        if (!destDir.exists()) destDir.mkdirs();

        byte[] buffer = new byte[8192];
        long totalBytesWritten = 0;

        try (ZipInputStream zis = new ZipInputStream(new BufferedInputStream(new FileInputStream(METADATA_DOWNLOAD_PATH)))) {

            ZipEntry zipEntry;
            while ((zipEntry = zis.getNextEntry()) != null) {
                File newFile = new File(destDir, zipEntry.getName());
                Path newFilePath = newFile.getCanonicalFile().toPath();

                if (!newFilePath.startsWith(destDir.getCanonicalFile().toPath())) {
                    throw new IOException("Zip entry escapes destination directory: " + zipEntry.getName());
                }

                if (zipEntry.isDirectory()) {
                    Files.createDirectories(newFilePath);
                } else {
                    Files.createDirectories(newFilePath.getParent());

                    try (OutputStream fos = new BufferedOutputStream(Files.newOutputStream(newFilePath))) {
                        int len;
                        while ((len = zis.read(buffer)) > 0) {
                            totalBytesWritten += len;
                            if (totalBytesWritten > MAX_UNCOMPRESSED_SIZE) {
                                Files.delete(Paths.get(METADATA_DOWNLOAD_PATH));
                                throw new IOException("Zip extraction exceeded size limit, possible zip bomb");
                            }
                            fos.write(buffer, 0, len);
                        }
                    }
                }
                zis.closeEntry();
            }

            return ParsingResult.ok(GameQParsingStates.EXTRACTED);

        } catch (IOException e) {
            log.error("Error occurred while extracting files", e);
        }

        return ParsingResult.error("Error occurred while extracting files");
    }

}
