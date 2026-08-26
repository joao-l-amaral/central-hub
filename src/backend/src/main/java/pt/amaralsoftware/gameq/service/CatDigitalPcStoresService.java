package pt.amaralsoftware.gameq.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.models.GameQPlatform;
import pt.amaralsoftware.gameq.models.entity.CatDigitalPcStoresEntity;
import pt.amaralsoftware.gameq.repository.CatDigitalPcStoresRepository;
import pt.amaralsoftware.gameq.resolvers.PlatformIconResolver;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class CatDigitalPcStoresService {

    private static final Logger log = LoggerFactory.getLogger(CatDigitalPcStoresService.class);
    @Inject
    CatDigitalPcStoresRepository catDigitalPcStoresRepository;
    @Inject
    PlatformIconResolver platformIconResolver;

    public List<GameQPlatform> getPCDigitalStoresNames() {
        log.debug("Getting PC digital stores names");

        List<CatDigitalPcStoresEntity> pcDigitalStores = catDigitalPcStoresRepository.findAll(Sort.by("name", Sort.Direction.Ascending)).list();


        List<GameQPlatform> gameVaultPlatforms = new ArrayList<>();

        try {
            Map<String, String> iconMap = platformIconResolver.getIconsByPlatformName();

            gameVaultPlatforms = pcDigitalStores.stream()
                    .map(pcDigitalStore -> new GameQPlatform(
                            pcDigitalStore.getName(),
                            true,
                            iconMap.get(pcDigitalStore.getName())
                    ))
                    .toList();

        } catch (Exception e) {
            log.error("Error occurred while getting PC digital stores names", e);
        }

        return gameVaultPlatforms;
    }
}