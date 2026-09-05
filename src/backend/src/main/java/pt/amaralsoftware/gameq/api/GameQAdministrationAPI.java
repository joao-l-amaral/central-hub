package pt.amaralsoftware.gameq.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.application.service.CatConfigService;
import pt.amaralsoftware.gameq.config.LoadGameDatabaseSchedule;
import pt.amaralsoftware.gameq.models.GameVaultConfiguration;
import pt.amaralsoftware.gameq.modules.dataProcessor.GameQGameDataProcessor;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;

import java.io.IOException;

@Path("/gameq/administrarion")
public class GameQAdministrationAPI {
    private final Logger log = LoggerFactory.getLogger(GameQAdministrationAPI.class);

    @Inject
    LoadGameDatabaseSchedule loadGameDatabaseSchedule;
    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatConfigService catConfigService;
    @Inject
    GameQGameDataProcessor gameQGameDataProcessor;

    @GET
    @Path("/forceLoadGameVaultDatabase")
    public RestResponse<String> forceDatabaseLoad() {
        //loadGameDatabaseSchedule.init();
        gameQGameDataProcessor.execute();
        return RestResponse.ok("Data base sync forcefully loaded.");
    }

    @GET
    @Path("/configuration")
    public RestResponse<GameVaultConfiguration> getConfiguration() {
        log.debug("Get video game vault configuration");

        try {
            GameVaultConfiguration gameVaultConfiguration = catConfigService.getVideoGameConfig();
            return RestResponse.ok(gameVaultConfiguration);
        } catch (IOException e) {
            log.error("Error getting video game config. {}", e.getMessage());
        }
        return RestResponse.noContent();
    }

    @PATCH
    @Path("/updatePlatforms")
    public RestResponse<String> updatePlatforms(String payload) {

        try {
            catGamePlatformService.updatePlatforms(payload);
        } catch (IOException e) {
            log.error("Error updating platforms. {}", e.getMessage());
        }

        return RestResponse.ok();
    }

    @PUT
    @Path("/updatePlatformConfiguration")
    public RestResponse<String> updatePlatformConfiguration(String payload) {
        catConfigService.updateGameVaultConfiguration(payload);

        return RestResponse.ok();
    }

}