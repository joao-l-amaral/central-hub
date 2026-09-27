package pt.amaralsoftware.gameq.modules.gameProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.lang3.StringUtils;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameDataStates;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameOrder;
import pt.amaralsoftware.gameq.service.CatDigitalStoresService;

@ApplicationScoped
public class GameMetaDataFlow extends ExecutionFlow {

    @Inject
    CatDigitalStoresService catDigitalStoresService;

    @Override
    public void executeWorkflow(GameOrder order) {
        String digitalPCStore = order.getInformation().getDigitalPCStore();
        if (StringUtils.isNotBlank(digitalPCStore)) {
            String platform = order.getInformation().getPlatform();
            catDigitalStoresService.getGameMetadata(platform);

            // TODO pc digital metadata there should be a issue for this.
        }
        order.setState(GameDataStates.PLATFORM_DATA);
    }
}
