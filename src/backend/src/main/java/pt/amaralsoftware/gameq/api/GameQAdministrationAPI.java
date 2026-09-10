package pt.amaralsoftware.gameq.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.application.service.CatConfigService;
import pt.amaralsoftware.gameq.models.GameQConfiguration;
import pt.amaralsoftware.gameq.models.GameQPlatform;
import pt.amaralsoftware.gameq.modules.dataProcessor.GameDataProcessor;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;
import pt.amaralsoftware.shared.models.RemoteDataSourceResult;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/gameq/administration")
public class GameQAdministrationAPI {
    private final Logger log = LoggerFactory.getLogger(GameQAdministrationAPI.class);

    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatConfigService catConfigService;
    @Inject
    GameDataProcessor gameDataProcessor;

    @GET
    @Path("/loadGameDatabase")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<Map<String, Object>> forceDatabaseLoad() {
        log.info("Loading game database");

        gameDataProcessor.run();

        String errorMessage = gameDataProcessor.getLastErrorMessage();

        Map<String, Object> result = new HashMap<>();

        if (errorMessage != null) {
            log.error("Error loading game database. {}", errorMessage);
            result.put("message", errorMessage);
            return RestResponse.status(Response.Status.INTERNAL_SERVER_ERROR, result);
        }

        String message = gameDataProcessor.getMessage();

        Integer numberOfGamesImported = gameDataProcessor.getNumberOfGamesImported();
        Integer numberOfPlatformsImported = gameDataProcessor.getNumberOfPlatformsImported();

        result.put("message", message);
        result.put("numberOfGamesImported", numberOfGamesImported);
        result.put("numberOfPlatformsImported", numberOfPlatformsImported);

        return RestResponse.ok(result);
    }

    @GET
    @Path("/configuration")
    @Consumes(MediaType.APPLICATION_JSON)
    public RestResponse<GameQConfiguration> getConfiguration() {
        log.debug("Get video game vault configuration");

        try {
            GameQConfiguration gameQConfiguration = catConfigService.getGameQConfiguration();
            return RestResponse.ok(gameQConfiguration);
        } catch (IOException e) {
            log.error("Error getting video game config. {}", e.getMessage());
        }
        return RestResponse.noContent();
    }

    @PATCH
    @Path("/updatePlatforms")
    @Consumes("application/json")
    public RestResponse<String> updatePlatforms(String payload) {

        try {
            catGamePlatformService.updatePlatforms(payload);
        } catch (IOException e) {
            log.error("Error updating platforms. {}", e.getMessage());
        }

        return RestResponse.ok();
    }

    @PUT
    @Path("/update-configurations")
    @Consumes("application/json")
    @Produces("application/json")
    public RestResponse<String> updateConfigurations(String payload) {
        catConfigService.updateGameVaultConfiguration(payload);

        return RestResponse.ok();
    }

    @PUT
    @Path("/update-platform-import-status")
    @Consumes("application/json")
    public RestResponse<String> updatePlatformImportByName(String payload) {
        try {
            catGamePlatformService.updatePlatformImportStatus(payload);

            return RestResponse.ok();
        } catch (IOException e) {
            log.error("Error updating platform import name. {}", e.getMessage());
        }

        return RestResponse.noContent();
    }

    @GET
    @Path("/selectedPlatforms")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<RemoteDataSourceResult<GameQPlatform>> getGameByPlatform(
        @QueryParam("platform") String platform,
        @QueryParam("page") @DefaultValue("0") Integer page,
        @QueryParam("pageSize") @DefaultValue("15") Integer pageSize,
        @QueryParam("sortOrder") String sortOrder
    ) {
        log.info("Get list of selected platforms");

        List<GameQPlatform> platforms = catGamePlatformService.getPlatforms();

        RemoteDataSourceResult<GameQPlatform> result = new RemoteDataSourceResult<>();
        result.setItems(platforms);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setTotalCount((long) platforms.size());

        return RestResponse.ok(result);
    }

}