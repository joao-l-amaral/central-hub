package pt.amaralsoftware.shared.client;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "ntfy")
public interface NtfyClient {

    @POST
    @Path("/{topic}")
    @Consumes(MediaType.TEXT_PLAIN)
    void send(
        @PathParam("topic") String topic,
        @HeaderParam("Authorization") String auth,
        String message
    );

}
