package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.shared.util.NtfyUtils;

import java.io.*;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Scanner;

@ApplicationScoped
public class DataDownloaderFlow extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataDownloaderFlow.class);
    private static final String FILE_DOWNLOAD_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp/input/Metadata.zip" : "tmp/input/Metadata.zip";
    private static final String FILE_EXTRACTED_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp" : "tmp/output";

    private static final String FILE_HASH_FILE = "hash.txt";

    @Inject
    NtfyUtils ntfyUtils;

    @Override
    public GameQParsingStates executeWorkflow(GameQParsingStates currentState) {
        log.info("Starting data downloader flow");

        try {
            Boolean haveData = checkAndLoadFile();

            if(BooleanUtils.isTrue(haveData)) {
                String metadaHashValue = calcFileHash();

                File file = new File(String.format("%s/%s", FILE_EXTRACTED_PATH, FILE_HASH_FILE));

                if(file.exists()) {
                    String existingHashValue = this.readHashFile(file);

                    if(StringUtils.equals(metadaHashValue, existingHashValue)) {
                        Path path = Paths.get(FILE_DOWNLOAD_PATH);
                        Files.delete(path);

                        log.debug("The downloaded file didn't change.");

                        this.ntfyUtils.send("Video game metadata game didn't change.");

                        return GameQParsingStates.DOWNLOADED;
                    } else {
                        Files.delete(file.toPath());
                        this.createHashFile(metadaHashValue);
                    }
                } else {
                    this.createHashFile(metadaHashValue);
                }

            } else {
                Boolean gamesMetaDataDownloaded = downloadMetaData();
                if(BooleanUtils.isTrue(gamesMetaDataDownloaded)) {
                    return GameQParsingStates.DOWNLOADED;
                }
            }
        } catch (IOException | NoSuchAlgorithmException e) {
            log.error("Game vault data source failed to process. {}", e.getMessage());
            this.ntfyUtils.send("[GameVault] Failed to process metadata file.");
            return GameQParsingStates.ERROR;
        }

        return GameQParsingStates.DOWNLOADED;
    }

    private Boolean checkAndLoadFile() {

        File file = new File(FILE_DOWNLOAD_PATH);

        log.info("Check if file {} exists.", file.getAbsolutePath());

        if(!file.exists()) {
            log.error("File {} not found.", file.getAbsolutePath());
            this.ntfyUtils.send("[GameVault] Downloading new metadata file.");
            return false;
        }

        return true;
    }

    private Boolean downloadMetaData() throws IOException {

        File file = new File(FILE_DOWNLOAD_PATH);

        log.info("Downloading file {}", file.getAbsolutePath());

        long bytesDownloaded = downloadFile();

        if(bytesDownloaded == 0) {
            log.error("Could not download file {}", file.getAbsolutePath());
            this.ntfyUtils.send("[GameVault] It was not possible to download the metadata file.");
            return false;
        }

        return true;
    }

    private long downloadFile() throws IOException {
        final String fileUrl = "https://gamesdb.launchbox-app.com/Metadata.zip";

        URL url = URI.create(fileUrl).toURL();
        URLConnection conn = url.openConnection();
        conn.setConnectTimeout(15_000);
        conn.setReadTimeout(30_000);

        try (InputStream in = URI.create(fileUrl).toURL().openStream()) {
            return Files.copy(in, Paths.get(FILE_DOWNLOAD_PATH), StandardCopyOption.REPLACE_EXISTING);
        }
    }

    private String calcFileHash() throws NoSuchAlgorithmException, IOException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(Files.readAllBytes(Paths.get(FILE_DOWNLOAD_PATH)));
        byte[] digest = md.digest();
        return Arrays.toString(digest);
    }

    private String readHashFile(File file) throws FileNotFoundException {
        String data = null;
        Scanner myReader = new Scanner(file);
        while (myReader.hasNextLine()) {
            data = myReader.nextLine();
        }
        myReader.close();
        return data;
    }

    private void createHashFile(String metadaHashValue) throws IOException {
        try ( FileWriter myWriter = new FileWriter(FILE_EXTRACTED_PATH + "/" + FILE_HASH_FILE)) {
            myWriter.write(metadaHashValue);
        }
    }

}
