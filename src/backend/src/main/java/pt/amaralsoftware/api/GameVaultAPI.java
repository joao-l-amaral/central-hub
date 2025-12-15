package pt.amaralsoftware.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.config.LoadGameDatabaseSchedule;

@Path("/games/api")
public class GameVaultAPI {
    private final Logger log = LoggerFactory.getLogger(GameVaultAPI.class);

    @Inject
    LoadGameDatabaseSchedule loadGameDatabaseSchedule;

    @GET
    @Path("/forceLoadGameVaultDatabase")
    public RestResponse<String> forceDatabaseLoad() {
        loadGameDatabaseSchedule.init();
        return RestResponse.ok("Data base sync forcefully loaded.");
    }

}