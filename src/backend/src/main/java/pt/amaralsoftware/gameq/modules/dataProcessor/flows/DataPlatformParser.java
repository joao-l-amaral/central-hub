package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class DataPlatformParser extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataPlatformParser.class);

    @Inject
    CatGamePlatformService catGamePlatformService;

    @Override
    public ParsingResult executeWorkflow(GameQParsingStates currentState) {
        log.info("Starting GameQPlatformParser flow");

        try {
            File xmlFile = new File(String.format("%s/%s", FILE_EXTRACTED_PATH, "Platforms.xml"));

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

            for (int i = 0; i < childNodes.getLength(); i++) {
                Node node = childNodes.item(i);

                if (node.getNodeType() == Node.ELEMENT_NODE && node.getNodeName().equals("Platform")) {
                    Element element = (Element) node;

                    Map<String, Object> processedPlatform = this.processPlatforms(element);
                    catGamePlatformService.savePlatforms(processedPlatform);
                }
            }
        } catch (Exception e) {
            log.error("Failed to parse platform data. {}", e.getMessage());
        }

        return ParsingResult.ok(GameQParsingStates.PLATFORMS_PARSED);
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

    private String getTagValue(String tag, Element element) {
        NodeList nodeList = element.getElementsByTagName(tag);
        if (nodeList.getLength() > 0) {
            return nodeList.item(0).getTextContent();
        }
        return "";
    }

}
