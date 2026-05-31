package pt.amaralsoftware.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.configuration.ApplicationConfiguration;
import pt.amaralsoftware.service.ApplicationService;

@Path("/")
public class ApplicationAPI {
    private final Logger log = LoggerFactory.getLogger(ApplicationAPI.class);

    @Inject
    ApplicationService applicationService;

    @GET
    @Path("/configurations")
    @Produces(MediaType.APPLICATION_JSON)
    public ApplicationConfiguration configuration() {
        log.info("Get Appplication configuration");

        return applicationService.getApplicationConfiguration();
    }

}