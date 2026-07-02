package pt.amaralsoftware.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.config.LoadGameDatabaseSchedule;
import pt.amaralsoftware.models.DTO.gamevault.GameVaultPlatformDTO;
import pt.amaralsoftware.models.configuration.GameVaultConfiguration;
import pt.amaralsoftware.service.CatConfigService;
import pt.amaralsoftware.service.CatGamePlatformService;

import java.io.IOException;

@Path("/games")
public class GameVaultAPI {
    private final Logger log = LoggerFactory.getLogger(GameVaultAPI.class);

    @Inject
    LoadGameDatabaseSchedule loadGameDatabaseSchedule;
    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatConfigService catConfigService;

    @GET
    @Path("/forceLoadGameVaultDatabase")
    public RestResponse<String> forceDatabaseLoad() {
        loadGameDatabaseSchedule.init();
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

    @GET
    @Path("/listOfPlatforms")
    public RestResponse<GameVaultPlatformDTO> getPlatforms() {
        log.debug("Get the list of platforms");

        GameVaultPlatformDTO platforms = catGamePlatformService.getPlatformNames();

        if(platforms == null) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(platforms);
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