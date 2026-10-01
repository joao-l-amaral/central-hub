package pt.amaralsoftware.gameq.modules.gameProcessor;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.core.modules.processor.Processor;
import pt.amaralsoftware.core.modules.processor.models.Order;
import pt.amaralsoftware.gameq.modules.gameProcessor.flows.*;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameDataStates;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameOrder;


@ApplicationScoped
public class GameProcessor extends Processor<GameDataStates> {

    @Inject
    GameSelectionFlow gameSelectionFlow;
    @Inject
    GameMetaDataFlow gameMetaDataFlow;
    @Inject
    GamePlatformFlow gamePlatformFlow;
    @Inject
    GamePlatformFamilyFlow gamePlatformFamilyFlow;
    @Inject
    GamePlatformServiceStatusFlow gamePlatformServiceStatusFlow;

    @Override
    protected Order<GameDataStates> createOrder(String targetEntity) {
        return new GameOrder(targetEntity);
    }

    @Override
    public void executeFlow() {
        log.info("Current game data processing state");

        ExecutionFlow flow = switch (order.getState()) {
            case IDLE -> gameSelectionFlow;
            case GAME_DATA -> gameMetaDataFlow;
            case PLATFORM_DATA -> gamePlatformFlow;
            case PLATFORM_DATA_FAMILY -> gamePlatformFamilyFlow;
            case PLATFORM_SERVICE -> gamePlatformServiceStatusFlow;
            default -> null;
        };

        if (flow != null) {
            flow.executeWorkflow((GameOrder) order);
        }
    }
}
