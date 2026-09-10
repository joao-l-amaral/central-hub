package pt.amaralsoftware.gameq.modules.dataProcessor;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.flows.*;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;

@ApplicationScoped
public class GameDataProcessor {

    private final Logger log = LoggerFactory.getLogger(GameDataProcessor.class);

    @Inject
    DataDownloaderFlow dataDownloaderFlow;
    @Inject
    DataExtractorFlow dataExtractorFlow;
    @Inject
    DataPlatformParserFlow dataPlatformParserFlow;
    @Inject
    DataGameParserFlow dataGameParserFlow;
    @Inject
    DataCleanUpFlow dataCleanUpFlow;
    @Inject
    DataInitializeFlow dataInitializeFlow;

    private GameQParsingStates currentState = GameQParsingStates.INITIALIZE;
    private String lastErrorMessage;
    private String message;
    private Integer numberOfPlatformsImported;
    private Integer numberOfGamesImported;

    public void run() {
        lastErrorMessage = null;
        message = null;

        while (currentState != GameQParsingStates.COMPLETED) {

            if (currentState == GameQParsingStates.ERROR) {
                log.warn("Recovering from ERROR state by resetting to INITIALIZE.");
                currentState = GameQParsingStates.INITIALIZE;
                return;
            }

            executeFlow();
        }
        currentState = GameQParsingStates.INITIALIZE;
    }

    private void executeFlow() {
        log.info("Current game data processing state: {}", currentState);

        ParsingFlow flow = switch (currentState) {
            case INITIALIZE -> dataInitializeFlow;
            case IDLE, DOWNLOADING -> dataDownloaderFlow;
            case DOWNLOADED -> dataExtractorFlow;
            case EXTRACTED -> dataPlatformParserFlow;
            case PLATFORMS_PARSED -> dataGameParserFlow;
            case GAMES_PARSED -> dataCleanUpFlow;
            default -> throw new IllegalStateException("Unhandled state: " + currentState);
        };

        ParsingResult result = flow.executeWorkflow(currentState);
        currentState = result.state();

        if(result.numberOfGamesImported() != null) {
            numberOfGamesImported = result.numberOfGamesImported();
        }

        if(result.numberOfPlatformsImported() != null) {
            numberOfPlatformsImported = result.numberOfPlatformsImported();
        }

        if (currentState == GameQParsingStates.ERROR) {
            lastErrorMessage = result.message();
        } else {
            message = result.message();
        }

    }

    public String getLastErrorMessage() {
        return lastErrorMessage;
    }

    public String getMessage() {
        return message;
    }

    public Integer getNumberOfPlatformsImported() {
        return numberOfPlatformsImported;
    }

    public Integer getNumberOfGamesImported() {
        return numberOfGamesImported;
    }
}