package pt.amaralsoftware.authentication.api;

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
import pt.amaralsoftware.authentication.models.dto.UserInfoDTO;
import pt.amaralsoftware.authentication.service.AuthService;

import java.net.URI;

@Path("/auth")
@Authenticated
public class AuthAPI {
    private final Logger log = LoggerFactory.getLogger(AuthAPI.class);

    @Inject
    AuthService authService;

    @GET
    @Path("/session")
    public RestResponse<UserInfoDTO> getSession() {
        log.info("Check if the web is logged in.");

        UserInfoDTO userInfo = authService.getUserInfo();

        return RestResponse.ok(userInfo);
    }

    @GET
    @Path("/login")
    @Produces(MediaType.TEXT_HTML)
    public RestResponse<Void> login(@QueryParam("redirect_uri") String redirectUri) {
        return RestResponse.seeOther(URI.create(redirectUri));
    }

    @GET
    @Path("/logout")
    @Produces(MediaType.TEXT_HTML)
    public RestResponse<Void> logout(
            @QueryParam("redirect_uri") String redirectUri,
            @QueryParam("idToken") String idToken
    ) {
        String logoutUrl = authService.getLogoutUrl(redirectUri,idToken);
        return RestResponse.seeOther(URI.create(logoutUrl));
    }

}