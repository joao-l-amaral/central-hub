package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.collections4.CollectionUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import pt.amaralsoftware.application.service.CatConfigService;
import pt.amaralsoftware.core.modules.processor.models.Criticity;
import pt.amaralsoftware.core.modules.processor.models.DiagnosticMessage;
import pt.amaralsoftware.gameq.clients.XboxApiClient;
import pt.amaralsoftware.gameq.models.GameQConfiguration;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;
import pt.amaralsoftware.gameq.models.xboxApi.XboxApiConfiguration;
import pt.amaralsoftware.gameq.models.xboxApi.XboxApiResponse;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingGamesOrder;
import pt.amaralsoftware.gameq.service.CatGameService;
import pt.amaralsoftware.gameq.service.CatOwnGameService;
import pt.amaralsoftware.shared.util.MapUtils;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class DataProcessXboxGamesFlow extends ExecutionFlow {

    @Inject
    CatGameService catGameService;
    @Inject
    CatOwnGameService catOwnGameService;
    @Inject
    CatConfigService catConfigService;
    @Inject
    @RestClient
    XboxApiClient xboxApiClient;

    @Override
    public void executeWorkflow(ParsingGamesOrder order) {
        log.info("Fetch data from Xbox API and process it");

        try {
            GameQConfiguration gameQConfiguration = this.catConfigService.getGameQConfiguration();

            XboxApiConfiguration xbox = gameQConfiguration.getXbox();

            if (xbox != null) {
                String xuid = gameQConfiguration.getXbox().getXuid();
                String apiKey = gameQConfiguration.getXbox().getApiKey();

                XboxApiResponse titlesByXuid = this.xboxApiClient.getTitles(xuid, apiKey);
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
            } else {
                log.error("Xbox configuration is missing in GameQConfiguration.");
                order.setState(GameParsingStates.ERROR);
                order.setDiagnosticMessage(new DiagnosticMessage("Xbox configuration is missing in GameQConfiguration.", Criticity.ERROR));
            }
        } catch (IOException e) {
            log.error("Error fetching data from Xbox API. {}", e.getMessage());
            order.setState(GameParsingStates.ERROR);
            order.setDiagnosticMessage(new DiagnosticMessage("Error fetching data from Xbox API.", Criticity.ERROR));
        }
    }

}
