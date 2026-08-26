package pt.amaralsoftware.shared.util;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import pt.amaralsoftware.shared.client.NtfyClient;

import java.util.Base64;

@ApplicationScoped
public class NtfyUtils {

    @ConfigProperty(name = "ntfy.topic")
    String nrfyTopic;

    @ConfigProperty(name = "ntfy.user")
    String ntfyUser;

    @ConfigProperty(name = "ntfy.password")
    String ntfyPassword;

    @RestClient
    NtfyClient ntfyClient;

    public void send(String messageToSend) {
        String authHeader = basicToken();
        this.ntfyClient.send(nrfyTopic, authHeader, messageToSend);
    }

    private String basicToken() {
        String credentials = ntfyUser + ":" + ntfyPassword;
        String encodedAuth = Base64.getEncoder().encodeToString(credentials.getBytes());
        return "Basic " + encodedAuth;
    }
}
