package pt.amaralsoftware.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.entity.CatDigitalPcStoresEntity;
import pt.amaralsoftware.models.gameq.GameQConfiguration;
import pt.amaralsoftware.models.gameq.GameQPlatform;
import pt.amaralsoftware.repository.CatDigitalPcStoresRepository;
import pt.amaralsoftware.util.MapUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class CatDigitalPcStoresService {

    private static final Logger log = LoggerFactory.getLogger(CatDigitalPcStoresService.class);
    @Inject
    CatDigitalPcStoresRepository catDigitalPcStoresRepository;
    @Inject
    CatConfigService catConfigService;

    public List<GameQPlatform> getPCDigitalStoresNames() {
        log.debug("Getting PC digital stores names");

        List<CatDigitalPcStoresEntity> pcDigitalStores = catDigitalPcStoresRepository.findAll(Sort.by("name", Sort.Direction.Ascending)).list();


        List<GameQPlatform> gameVaultPlatforms = new ArrayList<>();

        try {
            GameQConfiguration gameQConfiguration = catConfigService.getGameQPlatform();

            List<Map<String, Object>> platforms = gameQConfiguration.getPlatforms();

            Map<String, String> iconByPlatformName = platforms.stream()
                    .collect(Collectors.toMap(
                            p -> MapUtils.getPropertyAsString(p, "platform"),
                            p -> MapUtils.getPropertyAsString(p, "icon"),
                            (a, b) -> a
                    ));


            gameVaultPlatforms = pcDigitalStores.stream()
                    .map(pcDigitalStore -> new GameQPlatform(
                            pcDigitalStore.getName(),
                            true,
                            iconByPlatformName.get(pcDigitalStore.getName())
                    ))
                    .toList();

        } catch (Exception e) {
            log.error("Error occurred while getting PC digital stores names", e);
        }

        return gameVaultPlatforms;
    }
}