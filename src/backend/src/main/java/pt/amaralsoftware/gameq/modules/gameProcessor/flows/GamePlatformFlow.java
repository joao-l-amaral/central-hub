package pt.amaralsoftware.gameq.modules.gameProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.gameq.models.dto.PlatformDTO;
import pt.amaralsoftware.gameq.models.entity.CatGamePlatformEntity;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameDataStates;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameOrder;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;

@ApplicationScoped
public class GamePlatformFlow extends ExecutionFlow {

    @Inject
    CatGamePlatformService catGamePlatformService;

    @Override
    public void executeWorkflow(GameOrder order) {
        String platformName = order.getInformation().getPlatform();
        PlatformDTO platformByName = catGamePlatformService.getPlatformByName(platformName);

        order.setPlatform(platformByName);

        order.setState(GameDataStates.PLATFORM_DATA_FAMILY);
    }
}
