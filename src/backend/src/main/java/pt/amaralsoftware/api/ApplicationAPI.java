package pt.amaralsoftware.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.DTO.application.RemoteDTO;
import pt.amaralsoftware.models.DTO.auth.UserInfoDTO;
import pt.amaralsoftware.models.Remotes;
import pt.amaralsoftware.models.configuration.ApplicationConfiguration;
import pt.amaralsoftware.repository.GuiRemoteRepository;
import pt.amaralsoftware.service.ApplicationService;
import pt.amaralsoftware.service.GuiRemoteService;

import java.util.List;

@Path("/")
public class ApplicationAPI {
    private final Logger log = LoggerFactory.getLogger(ApplicationAPI.class);

    @Inject
    ApplicationService applicationService;
    @Inject
    GuiRemoteService guiRemoteService;

    @GET
    @Path("/remotes")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<RemoteDTO>> getGuiRemotes() {
        log.info("Get the avaiable Gui Remotes");

        List<RemoteDTO> enabledGuiRemotes = guiRemoteService.getEnabledGuiRemotes();

        if (enabledGuiRemotes.isEmpty()) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(enabledGuiRemotes);
    }

    @GET
    @Path("/configurations")
    @Produces(MediaType.APPLICATION_JSON)
    public ApplicationConfiguration configuration() {
        log.info("Get Appplication configuration");

        return applicationService.getApplicationConfiguration();
    }

}