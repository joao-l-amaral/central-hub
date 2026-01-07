package pt.amaralsoftware.config;

import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.SystemUtils;
import org.apache.commons.text.WordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import pt.amaralsoftware.service.CatConfigService;
import pt.amaralsoftware.service.CatGamePlatformService;
import pt.amaralsoftware.service.CatGameService;
import pt.amaralsoftware.util.NtfyUtils;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
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
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

class ParsedMetadaModel {
    Boolean isGame;
    Boolean nameFoundInLookUpList;
    Map<String, Object> gameMap;
    String currentKey;
    StringBuilder currentValue;

    public ParsedMetadaModel() {
        this.isGame = false;
        this.nameFoundInLookUpList = false;
        this.gameMap = new HashMap<>();
        this.currentKey = null;
        this.currentValue = new StringBuilder();
    }

    public Boolean getGame() {
        return isGame;
    }

    public void setGame(Boolean game) {
        isGame = game;
    }

    public Boolean getNameFoundInLookUpList() {
        return nameFoundInLookUpList;
    }

    public void setNameFoundInLookUpList(Boolean nameFoundInLookUpList) {
        this.nameFoundInLookUpList = nameFoundInLookUpList;
    }

    public void setCurrentKey(String currentKey) {
        this.currentKey = currentKey;
    }

    public StringBuilder getCurrentValue() {
        return currentValue;
    }

    public void resetCurrentValue() {
        this.currentValue.setLength(0);
    }

    public void setCurrentValue(StringBuilder currentValue) {
        this.currentValue = currentValue;
    }

    public Map<String, Object> getGameMap() {
        return gameMap;
    }

    public void clearGameMap() {
        this.gameMap.clear();
    }

    public void addGameToMap() {
        this.gameMap.put(this.currentKey, this.currentValue.toString());
    }
}

@ApplicationScoped
public class LoadGameDatabaseSchedule {

    private static final Logger log = LoggerFactory.getLogger(LoadGameDatabaseSchedule.class);

    private static final String FILE_DOWNLOAD_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp/input/Metadata.zip" : "tmp/input/Metadata.zip";
    private static final String FILE_EXTRACTED_PATH = SystemUtils.IS_OS_LINUX || SystemUtils.IS_OS_MAC ? "/tmp" : "tmp/output";

    private static final String FILE_HASH_FILE = "hash.txt";
    private static final String FILE_WITH_GAME_DATA = "Metadata.xml";
    private static final String FILE_WITH_PLATFORM_DATA = "Platforms.xml";
    private static final String PLATFORM = "platform";

    @Inject
    CatConfigService catConfigService;
    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatGameService catGameService;
    @Inject
    NtfyUtils ntfyUtils;

    @Scheduled(cron = "0 0 12 ? * 1")
    public void init() {
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

                        return;
                    } else {
                        Files.delete(file.toPath());
                        this.createHashFile(metadaHashValue);
                    }
                } else {
                    this.createHashFile(metadaHashValue);
                }

                extractFolder();
                parseData();
                parseDataByStream();
                removeExtractedFile();
            } else {
                Boolean gamesMetaDataDownloaded = getGamesMetaData();
                if(BooleanUtils.isTrue(gamesMetaDataDownloaded)) {
                    init();
                }
            }
        } catch (IOException | ParserConfigurationException | SAXException | NoSuchAlgorithmException e) {
            log.error("Game vault data source failed to process. {}", e.getMessage());
        }
    }

    private void removeExtractedFile() throws IOException {
        File folder = new File(FILE_EXTRACTED_PATH);
        File[] xmlFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));

        if (xmlFiles != null) {
            for (File xml : xmlFiles) {
                Path path = Paths.get(xml.getAbsolutePath());
                Files.delete(path);
            }
        }
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

    private Boolean getGamesMetaData() throws IOException {

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

    private Map<String, Object> processPlatforms(Element platform) {
        Map<String, Object> platformMap = new HashMap<>();

        String category = getTagValue("Category", platform);

        if(category.equals("Consoles")) {
            platformMap.put("name", getTagValue("Name", platform));
            platformMap.put("releaseDate", getTagValue("ReleaseDate", platform));
            platformMap.put("developer", getTagValue("Developer", platform));
            platformMap.put("manufacturer", getTagValue("Manufacturer", platform));
            platformMap.put("cpu", getTagValue("Cpu", platform));
            platformMap.put("memory", getTagValue("Memory", platform));
            platformMap.put("graphics", getTagValue("Graphics", platform));
            platformMap.put("sound", getTagValue("Sound", platform));
            platformMap.put("display", getTagValue("Display", platform));
            platformMap.put("notes", getTagValue("Notes", platform));
            platformMap.put("media", getTagValue("Media", platform));
            platformMap.put("maxControllers", getTagValue("MaxControllers", platform));
        }

        return platformMap;
    }

    private Map<String, Object> processGames(
            Map<String, Object> gameMap,
            List<String> consolePlatformToLookUp,
            boolean nameFoundInLookUpList
    ) {

        String platform = String.valueOf(gameMap.get(PLATFORM));

        nameFoundInLookUpList = isNameFoundInLookUpList(consolePlatformToLookUp, nameFoundInLookUpList, platform);

        if(BooleanUtils.isTrue(nameFoundInLookUpList)) {
            return gameMap;
        }

        return null;
    }

    private boolean isNameFoundInLookUpList(List<String> consolePlatformToLookUp, boolean nameFoundInLookUpList, String name) {
        for (String platformToLookUp : consolePlatformToLookUp) {
            if (name.endsWith(platformToLookUp)) {
                nameFoundInLookUpList = true;
                log.info("Platform {} found in look up list", name);
                break;
            }
        }
        return nameFoundInLookUpList;
    }

    private void parseDataByStream() {
        List<String> consolePlatformToLookUp = catGamePlatformService.getSelectedPlatforms();

        File xmlFile = new File(String.format("%s/%s", FILE_EXTRACTED_PATH, LoadGameDatabaseSchedule.FILE_WITH_GAME_DATA));

        XMLInputFactory factory = XMLInputFactory.newInstance();

        factory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
        factory.setProperty("javax.xml.stream.isSupportingExternalEntities", false);

        ParsedMetadaModel parsedMetadaModel = new ParsedMetadaModel();

        try (InputStream is = new FileInputStream(xmlFile)) {
            XMLEventReader reader = factory.createXMLEventReader(is);

            while (reader.hasNext()) {
                XMLEvent event = reader.nextEvent();

                String currentKey = null;
                if (event.isStartElement()) {
                    StartElement start = event.asStartElement();
                    String tagName = start.getName().getLocalPart();

                    if (StringUtils.containsIgnoreCase(tagName, "game")) {
                        parsedMetadaModel.setGame(true);
                        parsedMetadaModel.setNameFoundInLookUpList(false);
                        continue;
                    }

                    currentKey = setKey(parsedMetadaModel, tagName);
                    parsedMetadaModel.setCurrentKey(currentKey);

                } else if (event.isCharacters()) {
                    Characters chars = event.asCharacters();
                    String text = chars.getData().trim();

                    StringBuilder currentValue = parsedMetadaModel.getCurrentValue();
                    addValue(currentValue, text);

                } else if (event.isEndElement()) {
                    String tagName = event.asEndElement().getName().getLocalPart();

                    if (StringUtils.containsIgnoreCase(tagName, "game")) {
                        saveGame(parsedMetadaModel, consolePlatformToLookUp);
                        parsedMetadaModel = new ParsedMetadaModel();
                        continue;
                    }

                    parsedMetadaModel.addGameToMap();
                    parsedMetadaModel.setCurrentValue(new StringBuilder());
                }
            }
        } catch (XMLStreamException | IOException e) {
            log.error(e.getMessage());
        }
    }

    private void saveGame(ParsedMetadaModel parsedMetadaModel, List<String> consolePlatformToLookUp) {
        parsedMetadaModel.setGame(false);
        Map<String, Object> gameMap = parsedMetadaModel.getGameMap();
        Boolean nameFoundInLookUpList = parsedMetadaModel.getNameFoundInLookUpList();
        Map<String, Object> processedGame = this.processGames(gameMap, consolePlatformToLookUp, nameFoundInLookUpList);
        if(processedGame != null) {
            log.debug("Saving game {}", processedGame);
            catGameService.saveGames(processedGame);
        }
        parsedMetadaModel.clearGameMap();
    }

    private String setKey(ParsedMetadaModel parsedMetadaModel, String tagName) {
        Boolean isGame = parsedMetadaModel.getGame();
        if(BooleanUtils.isTrue(isGame) && StringUtils.isNoneBlank(tagName)) {
            parsedMetadaModel.resetCurrentValue();
            return normalizeKey(tagName);
        }
        return null;
    }

    private void addValue(StringBuilder sb, String value) {
        if(StringUtils.isNotBlank(value)) {
            sb.append(value);
        }
    }

    private String normalizeKey(String tagName) {
        String key = WordUtils.uncapitalize(tagName);

        switch (key) {
            case "eSRB":
                return "esrb";
            case "videoURL":
                return "videoUrl";
            default:
                return key;
        }
    }

    private void parseData() throws ParserConfigurationException, IOException, SAXException {

        File xmlFile = new File(String.format("%s/%s", FILE_EXTRACTED_PATH, LoadGameDatabaseSchedule.FILE_WITH_PLATFORM_DATA));

        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();

        // Secure the factory to prevent XXE attacks
        documentBuilderFactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        documentBuilderFactory.setFeature("http://xml.org/sax/features/external-general-entities", false);
        documentBuilderFactory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        documentBuilderFactory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        documentBuilderFactory.setXIncludeAware(false);
        documentBuilderFactory.setExpandEntityReferences(false);

        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.parse(xmlFile);
        Node launchBox = document.getElementsByTagName("LaunchBox").item(0);
        NodeList childNodes = launchBox.getChildNodes();

        String parseTarget = (StringUtils.equals(LoadGameDatabaseSchedule.FILE_WITH_PLATFORM_DATA, FILE_WITH_GAME_DATA)) ? "Game" : PLATFORM;


        for (int i = 0; i < childNodes.getLength(); i++) {
//            boolean nameFoundInLookUpList = false;
            Node node = childNodes.item(i);

            if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals(parseTarget)) {
                Element element = (Element) node;

                Map<String, Object> processedPlatform = this.processPlatforms(element);
                catGamePlatformService.savePlatforms(processedPlatform);
            }
        }
    }

    private String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag);
        if (nodeList != null && nodeList.getLength() > 0) {
            return nodeList.item(0).getTextContent();
        }
        return "";
    }

    private void extractFolder() throws IOException {

        log.info("Extracting {}", FILE_DOWNLOAD_PATH);

        File dir = new File(FILE_EXTRACTED_PATH);
        if (!dir.exists()) dir.mkdirs();

        byte[] buffer = new byte[1024];

        try (ZipInputStream zis = new ZipInputStream(new FileInputStream(FILE_DOWNLOAD_PATH))) {
            ZipEntry zipEntry = zis.getNextEntry();
            while (zipEntry != null) {
                File newFile = newFile(dir, zipEntry);
                if (zipEntry.isDirectory()) {
                    newFile.mkdirs();
                } else {
                    new File(newFile.getParent()).mkdirs();

                    try (FileOutputStream fos = new FileOutputStream(newFile)) {
                        int len;
                        while ((len = zis.read(buffer)) > 0) {
                            fos.write(buffer, 0, len);
                        }
                    }
                }
                zipEntry = zis.getNextEntry();
            }
            zis.closeEntry();
        }

        Path path = Paths.get(FILE_DOWNLOAD_PATH);
        Files.delete(path);

    }

    private File newFile(File destDir, ZipEntry zipEntry) throws IOException {
        File destFile = new File(destDir, zipEntry.getName());

        String destDirPath = destDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
        }

        return destFile;
    }

    private String calcFileHash() throws NoSuchAlgorithmException, IOException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(Files.readAllBytes(Paths.get(FILE_DOWNLOAD_PATH)));
        byte[] digest = md.digest();
        return Arrays.toString(digest);
    }

}
