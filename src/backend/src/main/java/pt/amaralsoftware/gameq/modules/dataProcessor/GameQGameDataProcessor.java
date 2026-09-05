package pt.amaralsoftware.gameq.modules.dataProcessor;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.flows.*;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;

@ApplicationScoped
public class GameQGameDataProcessor {

    private final Logger log = LoggerFactory.getLogger(GameQGameDataProcessor.class);

    @Inject
    DataDownloaderFlow dataDownloaderFlow;
    @Inject
    GameQExtractor gameQExtractor;
    @Inject
    GameQPlatformParser gameQPlatformParser;
    @Inject
    GameQGameParser gameQGameParser;
    @Inject
    GameQCleanUp gameQCleanUp;

    private GameQParsingStates currentState = GameQParsingStates.IDLE;

    public void execute() {
        while(currentState != GameQParsingStates.COMPLETED && currentState != GameQParsingStates.ERROR){
            executeFlow();
        }
    }

    private void executeFlow() {
        log.info("Current game data processing state: {}", currentState);

        ParsingFlow flow = switch (currentState) {
            case IDLE, DOWNLOADING -> dataDownloaderFlow;
            case DOWNLOADED -> gameQExtractor;
            case EXTRACTED -> gameQPlatformParser;
            case PLATFORMS_PARSED -> gameQGameParser;
            case GAMES_PARSED -> gameQCleanUp;
            default -> throw new IllegalStateException("Unhandled state: " + currentState);
        };
        currentState = flow.executeWorkflow(currentState);
    }
}