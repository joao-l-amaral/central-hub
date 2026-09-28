package pt.amaralsoftware.gameq.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.models.GameQPlatform;
import pt.amaralsoftware.gameq.models.entity.CatDigitalStoresEntity;
import pt.amaralsoftware.gameq.repository.CatDigitalStoresRepository;
import pt.amaralsoftware.gameq.resolvers.PlatformIconResolver;

import java.util.*;

@ApplicationScoped
public class CatDigitalStoresService {

    private static final Logger log = LoggerFactory.getLogger(CatDigitalStoresService.class);
    @Inject
    CatDigitalStoresRepository catDigitalStoresRepository;
    @Inject
    PlatformIconResolver platformIconResolver;

    public void getGameMetadata(String platformName) {
        Set<String> ignorePlatform = Set.of("Microsoft Xbox");

        if(ignorePlatform.contains(platformName)){
            log.info("Ignore platform");
        }
    }

    public List<GameQPlatform> getDigitalStoresNames() {
        log.debug("Getting PC digital stores names");

        List<CatDigitalStoresEntity> digitalStores = catDigitalStoresRepository.findAll(Sort.by("name", Sort.Direction.Ascending)).list();

        List<GameQPlatform> gameQPlatforms = new ArrayList<>();

        try {
            Map<String, String> iconMap = platformIconResolver.getIconsByPlatformName();

            gameQPlatforms = digitalStores.stream()
                    .filter(digitalStore -> Boolean.FALSE.equals(digitalStore.getConsole()))
                    .map(digitalStore -> new GameQPlatform(
                            digitalStore.getName(),
                            true,
                            iconMap.get(digitalStore.getName())
                    ))
                    .toList();

        } catch (Exception e) {
            log.error("Error occurred while getting PC digital stores names", e);
        }

        return gameQPlatforms;
    }
}