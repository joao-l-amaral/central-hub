package pt.amaralsoftware.gameq.clients;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import pt.amaralsoftware.gameq.models.xboxApi.XboxApiResponse;

@RegisterRestClient(configKey = "xbox")
public interface XboxApiClient {

    @GET
    @Path("/v2/titles/{xuid}")
    @Produces(MediaType.APPLICATION_JSON)
    XboxApiResponse getTitles(
        @PathParam("xuid") String xuid,
        @HeaderParam("x-authorization") String apiKey
    );

}
