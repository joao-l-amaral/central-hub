package pt.amaralsoftware.gameq.modules.gameProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameDataStates;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameOrder;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;

@ApplicationScoped
public class GamePlatformServiceStatusFlow extends ExecutionFlow {

    @Inject
    CatGamePlatformService catGamePlatformService;

    @Override
    public void executeWorkflow(GameOrder order) {
        order.setState(GameDataStates.FINISHED);
    }
}
