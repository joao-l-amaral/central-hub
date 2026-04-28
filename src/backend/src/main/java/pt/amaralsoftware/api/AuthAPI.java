package pt.amaralsoftware.api;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.DTO.auth.UserInfoDTO;
import pt.amaralsoftware.service.AuthService;

import java.net.URI;

@Path("/auth")
public class AuthAPI {
    private final Logger log = LoggerFactory.getLogger(AuthAPI.class);

    @Inject
    AuthService authService;

    @GET
    @Path("/session")
    @Authenticated
    public RestResponse<UserInfoDTO> getSession() {
        log.info("Check if the web is logged in.");

        UserInfoDTO userInfo = authService.getUserInfo();

        return RestResponse.ok(userInfo);
    }

    @GET
    @Path("/login")
    @Authenticated
    @Produces(MediaType.TEXT_HTML)
    public RestResponse<Void> login(@QueryParam("redirect_uri") String redirectUri) {
        return RestResponse.seeOther(URI.create(redirectUri));
    }

    @GET
    @Path("/logout")
    @Authenticated
    @Produces(MediaType.TEXT_HTML)
    public RestResponse<Void> logout(
            @QueryParam("redirect_uri") String redirectUri,
            @QueryParam("idToken") String idToken
    ) {
        String logoutUrl = authService.getLogoutUrl(redirectUri,idToken);
        return RestResponse.seeOther(URI.create(logoutUrl));
    }

}