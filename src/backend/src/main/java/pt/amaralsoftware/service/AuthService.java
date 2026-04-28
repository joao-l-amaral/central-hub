package pt.amaralsoftware.service;

import io.quarkus.oidc.IdToken;
import io.quarkus.security.credential.Credential;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import pt.amaralsoftware.models.DTO.auth.UserInfoDTO;

import java.security.Principal;
import java.util.Set;

@ApplicationScoped
public class AuthService {

    @Inject
    @IdToken
    JsonWebToken idToken;

    @ConfigProperty(name = "quarkus.oidc.auth-server-url")
    String authServerUrl;

    public UserInfoDTO getUserInfo() {
        String userName = this.idToken.getName();
        String tokenID = this.idToken.getRawToken();

        UserInfoDTO userInfoDTO = new UserInfoDTO();
        userInfoDTO.setName(userName);
        userInfoDTO.setIdToken(tokenID);

        return userInfoDTO;
    }

    public String getLogoutUrl(String redirectUri, String idToken) {
        return authServerUrl + "/protocol/openid-connect/logout?post_logout_redirect_uri=" +
                java.net.URLEncoder.encode(redirectUri, java.nio.charset.StandardCharsets.UTF_8) + "&client_id=confidential-client&id_token_hint="+idToken;
    }

}

