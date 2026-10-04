package pt.amaralsoftware.gameq.modules.dataProcessor;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.core.modules.processor.Processor;
import pt.amaralsoftware.core.modules.processor.models.Order;
import pt.amaralsoftware.gameq.modules.dataProcessor.flows.*;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingGamesOrder;

@ApplicationScoped
public class DataProcessor extends Processor<GameParsingStates> {

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
    @Inject
    DataProcessXboxGamesFlow dataProcessXboxGamesFlow;

    @Override
    protected Order<GameParsingStates> createOrder(String targetEntity) {
        return new ParsingGamesOrder();
    }

    @Override
    public void executeFlow() {
        log.info("Current game data processing state: {}", order.getState());

        ExecutionFlow flow = switch (order.getState()) {
            case INITIALIZE -> dataInitializeFlow;
            case IDLE, DOWNLOADING -> dataDownloaderFlow;
            case DOWNLOADED -> dataExtractorFlow;
            case EXTRACTED -> dataPlatformParserFlow;
            case PLATFORMS_PARSED -> dataGameParserFlow;
            case GAMES_PARSED -> dataProcessXboxGamesFlow;
            //case XBOX_GAMES_PARSED -> dataProcessPlayStationGamesFlow; // Through psn-api solo docker container
            //case PS_GAMES_PARSED -> dataProcessSteamGamesFlow; // Through steam public API
            //case STEAM_GAMES_PARSED -> dataCleanUpFlow; // TO finish... placeholder
            case XBOX_GAMES_PARSED -> dataCleanUpFlow;
            default -> null;
        };

        if (flow != null) {
            flow.executeWorkflow((ParsingGamesOrder) order);
        }
    }
}