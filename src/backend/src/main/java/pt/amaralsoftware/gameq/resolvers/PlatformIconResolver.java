package pt.amaralsoftware.gameq.resolvers;

import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.application.service.CatConfigService;
import pt.amaralsoftware.gameq.models.GameQConfiguration;
import pt.amaralsoftware.shared.util.MapUtils;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class PlatformIconResolver {

    private static Logger log = LoggerFactory.getLogger(PlatformIconResolver.class);

    @Inject
    CatConfigService catConfigService;

    @CacheResult(cacheName = "icon-by-platform-name")
    public Map<String, String> getIconsByPlatformName() throws IOException {
        log.info("Getting icons by platform name");

        GameQConfiguration gameQConfiguration = catConfigService.getGameQConfiguration();

        List<Map<String, Object>> platforms = gameQConfiguration.getPlatforms();

        return platforms.stream()
                .collect(Collectors.toMap(
                        p -> MapUtils.getPropertyAsString(p, "platform"),
                        p -> MapUtils.getPropertyAsString(p, "icon"),
                        (a, b) -> a
                ));
    }
}