package pt.amaralsoftware.gameq.clients;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.rest.client.annotation.ClientHeaderParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import pt.amaralsoftware.gameq.models.xboxApi.XboxApiResponse;

@RegisterRestClient(configKey = "xbox")
public interface XboxApiClient {

    default String apiKeyHeader() {
        return ConfigProvider.getConfig().getValue("xbox.api.key", String.class);
    }

    @GET
    @Path("/v2/titles/{xuid}")
    @Produces(MediaType.APPLICATION_JSON)
    @ClientHeaderParam(name = "x-authorization", value = "{apiKeyHeader}")
    XboxApiResponse getTitleByXuid(@PathParam("xuid") String xuid);

}
