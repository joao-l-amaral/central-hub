package pt.amaralsoftware.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import pt.amaralsoftware.models.configuration.ApplicationConfiguration;

@ApplicationScoped
public class ApplicationService {

    @ConfigProperty(name = "is.auth.activate")
    Boolean isAuthActivate;

    public ApplicationConfiguration getApplicationConfiguration() {
        ApplicationConfiguration applicationConfiguration = new ApplicationConfiguration();
        applicationConfiguration.setIsAuthActivate(isAuthActivate);

        return applicationConfiguration;
    }

}

