package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.WordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsedMetadataModel;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;
import pt.amaralsoftware.gameq.service.CatGameService;

import javax.xml.XMLConstants;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.XMLEvent;
import java.io.*;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class DataGameParser extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataGameParser.class);

    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatGameService catGameService;
    @Inject
    EntityManager entityManager;

    @Override
    public ParsingResult executeWorkflow(GameQParsingStates currentState) {
      log.info("Starting GameQGameParser flow");

      List<String> consolePlatformToLookUp = catGamePlatformService.getSelectedPlatforms();

      if (CollectionUtils.isEmpty(consolePlatformToLookUp)) {
          log.warn("No console platforms selected for game lookup.");
          return ParsingResult.error("No console platforms selected for game lookup.");
      }

      File xmlFile = new File(String.format("%s/%s", FILE_EXTRACTED_PATH, "Metadata.xml"));

      if (!xmlFile.exists()) {
          log.error("Metadata XML file not found: {}", xmlFile.getAbsolutePath());
          return ParsingResult.error("Metadata XML file not found.");
      }

      XMLInputFactory factory = XMLInputFactory.newInstance();
      factory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
      factory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
      factory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");

      ParsedMetadataModel parsedMetadataModel = new ParsedMetadataModel();
      int gamesParsed = 0;

      try (InputStream is = new BufferedInputStream(new FileInputStream(xmlFile))) {
          XMLEventReader reader = factory.createXMLEventReader(is);

          try {
              while (reader.hasNext()) {
                  XMLEvent event = reader.nextEvent();

                  if (event.isStartElement()) {
                      String tagName = event.asStartElement().getName().getLocalPart();

                      if (tagName.equals("Game")) {
                          parsedMetadataModel.setGame(true);
                          parsedMetadataModel.setNameFoundInLookUpList(false);
                          continue;
                      }

                      parsedMetadataModel.setCurrentKey(setKey(parsedMetadataModel, tagName));

                  } else if (event.isCharacters()) {
                      String text = event.asCharacters().getData().trim();
                      addValue(parsedMetadataModel.getCurrentValue(), text);

                  } else if (event.isEndElement()) {
                      String tagName = event.asEndElement().getName().getLocalPart();

                      if (tagName.equals("Game")) {
                          saveGame(parsedMetadataModel, consolePlatformToLookUp);
                          parsedMetadataModel = new ParsedMetadataModel();

                          gamesParsed++;
                          if (gamesParsed % 1000 == 0) {
                              log.info("Parsed {} games so far", gamesParsed);
                          }
                          continue;
                      }

                      parsedMetadataModel.addGameToMap();
                      parsedMetadataModel.setCurrentValue(new StringBuilder());
                  }
              }
          } finally {
              reader.close();
          }

          log.info("Finished parsing {} games", gamesParsed);
          return ParsingResult.ok(GameQParsingStates.GAMES_PARSED);

      } catch (XMLStreamException | IOException e) {
          log.error("Failed to parse games after {} entries", gamesParsed, e);
      }

      return ParsingResult.error("Failed to parse games.");
    }

    private String setKey(ParsedMetadataModel parsedMetadataModel, String tagName) {
        Boolean isGame = parsedMetadataModel.getGame();
        if(BooleanUtils.isTrue(isGame) && StringUtils.isNoneBlank(tagName)) {
            parsedMetadataModel.resetCurrentValue();
            return normalizeKey(tagName);
        }
        return null;
    }

    private String normalizeKey(String tagName) {
        String key = WordUtils.uncapitalize(tagName);

        return switch (key) {
            case "eSRB" -> "esrb";
            case "videoURL" -> "videoUrl";
            default -> key;
        };
    }

    private void addValue(StringBuilder sb, String value) {
        if(StringUtils.isNotBlank(value)) {
            sb.append(value);
        }
    }

    private void saveGame(ParsedMetadataModel parsedMetadataModel, List<String> consolePlatformToLookUp) {
        parsedMetadataModel.setGame(false);
        Map<String, Object> gameMap = parsedMetadataModel.getGameMap();
        Boolean nameFoundInLookUpList = parsedMetadataModel.getNameFoundInLookUpList();
        Map<String, Object> processedGame = this.processGames(gameMap, consolePlatformToLookUp, nameFoundInLookUpList);
        if (!processedGame.isEmpty()) {
            log.debug("Saving game {}", processedGame);
            catGameService.saveGames(processedGame);
        }
        parsedMetadataModel.clearGameMap();
    }

    private Map<String, Object> processGames(
            Map<String, Object> gameMap,
            List<String> consolePlatformToLookUp,
            boolean nameFoundInLookUpList
    ) {

        String platform = String.valueOf(gameMap.get("platform"));

        nameFoundInLookUpList = isNameFoundInLookUpList(consolePlatformToLookUp, nameFoundInLookUpList, platform);

        if(BooleanUtils.isTrue(nameFoundInLookUpList)) {
            return gameMap;
        }

        return Collections.emptyMap();
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

}
