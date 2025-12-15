package pt.amaralsoftware.auth;

import io.quarkus.security.Authenticated;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.Base64;

@Authenticated
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthFilter implements ContainerRequestFilter {

    @ConfigProperty(name = "auth.basic.token")
    String basicAuthToken;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String authHeader = requestContext.getHeaderString("Authorization");

        if (authHeader == null || !isValid(authHeader)) {
            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED)
                            .entity("Authorization header is missing or invalid.")
                            .build()
            );
        }
    }

    private boolean isValid(String authHeader) {
        String encoded = Base64.getEncoder().encodeToString(basicAuthToken.getBytes());
        String token = String.format("Basic %s", encoded);

        return authHeader.startsWith("Basic ") && authHeader.equals(token);
    }
}
