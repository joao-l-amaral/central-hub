package pt.amaralsoftware.gameq.modules.gameProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameDataStates;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameOrder;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;

import java.util.List;

@ApplicationScoped
public class GamePlatformFamilyFlow extends ExecutionFlow {

    @Inject
    CatGamePlatformService catGamePlatformService;

    @Override
    public void executeWorkflow(GameOrder order) {
        String platformName = order.getInformation().getPlatform();

        String[] platform = platformName.split(" ");

        if(platform.length > 1) {
            platformName = platform[0];
        }

        List<String> platforms = catGamePlatformService.getPlatformFamily(platformName);

        order.setPlatformFamily(platforms);

        order.setState(GameDataStates.FINISHED);
    }
}
