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
    DataPlatformParser dataPlatformParser;
    @Inject
    DataGameParser dataGameParser;
    @Inject
    DataCleanUp dataCleanUp;
    @Inject
    DataInitializeFlow dataInitializeFlow;

    private GameQParsingStates currentState = GameQParsingStates.INITIALIZE;
    private String lastErrorMessage;

    public void run() {
        lastErrorMessage = null;

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
            case EXTRACTED -> dataPlatformParser;
            case PLATFORMS_PARSED -> dataGameParser;
            case GAMES_PARSED -> dataCleanUp;
            default -> throw new IllegalStateException("Unhandled state: " + currentState);
        };

        ParsingResult result = flow.executeWorkflow(currentState);
        currentState = result.state();

        if (currentState == GameQParsingStates.ERROR) {
            lastErrorMessage = result.errorMessage();
        }
    }

    public String getLastErrorMessage() {
        return lastErrorMessage;
    }

}