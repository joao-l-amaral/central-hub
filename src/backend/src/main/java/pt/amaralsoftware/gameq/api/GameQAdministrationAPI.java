package pt.amaralsoftware.gameq.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.apache.commons.collections4.CollectionUtils;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.application.service.CatConfigService;
import pt.amaralsoftware.gameq.config.LoadGameDatabaseSchedule;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;
import pt.amaralsoftware.shared.models.RemoteDataSourceResult;

import java.io.IOException;
import java.util.List;

@Path("/gameq/administration")
public class GameQAdministrationAPI {
    private final Logger log = LoggerFactory.getLogger(GameQAdministrationAPI.class);

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
    public RestResponse<String> getConfiguration() {
        log.debug("Get video game vault configuration");

        String gameVaultConfiguration = catConfigService.getVideoGameConfig();

        if (gameVaultConfiguration == null) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(gameVaultConfiguration);
    }

    @GET
    @Path("/listOfPlatforms")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<RemoteDataSourceResult<String>> getListOfPlatforms(
        @QueryParam("page") @DefaultValue("0") Integer page,
        @QueryParam("pageSize") @DefaultValue("15") Integer pageSize
    ) {
        log.debug("Get list of platforms");

        List<String> selectedPlatforms = catGamePlatformService.getSelectedPlatforms();

        if (CollectionUtils.isEmpty(selectedPlatforms)) {
            return RestResponse.noContent();
        }

        RemoteDataSourceResult<String> result = new RemoteDataSourceResult<>();
        result.setItems(selectedPlatforms);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setTotalCount(Long.valueOf(selectedPlatforms.size()));

        return RestResponse.ok(result);
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