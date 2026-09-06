package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;
import pt.amaralsoftware.shared.util.NtfyUtils;

import java.io.*;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Scanner;

@ApplicationScoped
public class DataDownloaderFlow extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataDownloaderFlow.class);

    @Inject
    NtfyUtils ntfyUtils;

    @Override
    public ParsingResult executeWorkflow(GameQParsingStates currentState) {
        log.info("Starting data downloader flow");

        Boolean haveData = checkAndLoadFile();

        try {
            if (BooleanUtils.isNotTrue(haveData)) {
                return downloadMetaData();
            }

            String metadataHashValue = calcFileHash(METADATA_DOWNLOAD_PATH);
            File hashFile = new File(String.format("%s/%s", FILE_EXTRACTED_PATH, FILE_HASH_FILE));

            String existingHashValue = readHashFile(hashFile);

            if (metadataHashValue.equals(existingHashValue)) {
                Files.delete(Paths.get(METADATA_DOWNLOAD_PATH));
                log.debug("The downloaded file didn't change.");
                ntfyUtils.send("Video game metadata game didn't change.");
                return ParsingResult.error("The downloaded file didn't change.");
            }

            if(StringUtils.isNotBlank(existingHashValue)) {
                Files.delete(hashFile.toPath());
            }

            createHashFile(metadataHashValue);
            return ParsingResult.ok(GameQParsingStates.DOWNLOADED);

        } catch (IOException| NoSuchAlgorithmException e) {
            log.error("Game vault data source failed to process. {}", e.getMessage());
            this.ntfyUtils.send("[GameVault] Failed to process metadata file.");
        }

        return ParsingResult.error("Failed to process metadata file.");
    }

    private Boolean checkAndLoadFile() {

        File file = new File(METADATA_DOWNLOAD_PATH);

        log.info("Check if file {} exists.", file.getAbsolutePath());

        if (file.exists()) return true;

        log.info("File {} not found.", file.getAbsolutePath());
        this.ntfyUtils.send("[GameVault] Downloading new metadata file.");
        return false;
    }

    private ParsingResult downloadMetaData() throws IOException, NoSuchAlgorithmException {

        String metaDataPath = METADATA_DOWNLOAD_PATH;

        File file = new File(metaDataPath);

        log.info("Downloading file {}", file.getAbsolutePath());

        long bytesDownloaded = downloadFile(metaDataPath);

        if(bytesDownloaded == 0) {
            log.error("Could not download file {}", file.getAbsolutePath());
            this.ntfyUtils.send("[GameVault] It was not possible to download the metadata file.");
            return ParsingResult.error("Failed to download metadata file.");
        }

        return ParsingResult.ok(GameQParsingStates.DOWNLOADING);
    }

    private long downloadFile(String targetPath) throws IOException {
        final String fileUrl = "https://gamesdb.launchbox-app.com/Metadata.zip";

        URL url = URI.create(fileUrl).toURL();
        URLConnection conn = url.openConnection();
        conn.setConnectTimeout(15_000);
        conn.setReadTimeout(30_000);

        try (InputStream in = URI.create(fileUrl).toURL().openStream()) {
            return Files.copy(in, Paths.get(targetPath), StandardCopyOption.REPLACE_EXISTING);
        }
    }

    private String calcFileHash(String targetPath) throws NoSuchAlgorithmException, IOException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(Files.readAllBytes(Paths.get(targetPath)));
        byte[] digest = md.digest();
        return Arrays.toString(digest);
    }

    private String readHashFile(File file) throws FileNotFoundException {
        if (file.exists()) {
            String data = null;
            Scanner myReader = new Scanner(file);
            while (myReader.hasNextLine()) {
                data = myReader.nextLine();
            }
            myReader.close();
            return data;
        }
        return "";
    }

    private void createHashFile(String metadataHashValue) throws IOException {
        try ( FileWriter myWriter = new FileWriter(FILE_EXTRACTED_PATH + "/" + FILE_HASH_FILE)) {
            myWriter.write(metadataHashValue);
        }
    }

}
