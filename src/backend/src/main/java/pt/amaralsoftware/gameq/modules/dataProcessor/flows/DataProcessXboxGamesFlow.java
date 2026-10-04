package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.collections4.CollectionUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import pt.amaralsoftware.gameq.clients.XboxApiClient;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;
import pt.amaralsoftware.gameq.models.xboxApi.XboxApiResponse;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingGamesOrder;
import pt.amaralsoftware.gameq.service.CatGameService;
import pt.amaralsoftware.gameq.service.CatOwnGameService;
import pt.amaralsoftware.shared.util.MapUtils;

import java.util.List;
import java.util.Map;

@ApplicationScoped
public class DataProcessXboxGamesFlow extends ExecutionFlow {

    @Inject
    CatGameService catGameService;
    @Inject
    CatOwnGameService catOwnGameService;
    @Inject
    @RestClient
    XboxApiClient xboxApiClient;
    @ConfigProperty(name = "xbox.api.xuid")
    String xuid;

    @Override
    public void executeWorkflow(ParsingGamesOrder order) {
        log.info("Fetch data from Xbox API and process it");

        XboxApiResponse titlesByXuid = this.xboxApiClient.getTitleByXuid(xuid);
        List<Map<String, Object>> titles = titlesByXuid.getContent().getTitles();

        for (Map<String, Object> title : titles) {
            String type = MapUtils.getPropertyAsString(title, "type");
            List<String> devices = MapUtils.getPropertyAsStringList(title, "devices");

            if(type.equals("Game") && CollectionUtils.containsAny(devices, List.of("Xbox360", "XboxOne"))) {
                String name = MapUtils.getPropertyAsString(title, "name");
                String titleId = MapUtils.getPropertyAsString(title, "titleId");
                String displayImage = MapUtils.getPropertyAsString(title, "displayImage");
                String platform = MapUtils.getPropertyAsString(title, "mediaItemType");
                String totalAchievements = MapUtils.getPropertyAsString(title, "achievement.totalAchievements");
                String currentAchievements = MapUtils.getPropertyAsString(title, "achievement.currentAchievements");

                CatGameEntity currentGame = catGameService.setExtraInfoForGameCatalog(name, titleId, displayImage, platform);
                if(currentGame != null) {
                    catOwnGameService.addGame(currentGame, "Xbox", totalAchievements, currentAchievements);
                }
            }
        }


        order.setState(GameParsingStates.XBOX_GAMES_PARSED);
    }

}
