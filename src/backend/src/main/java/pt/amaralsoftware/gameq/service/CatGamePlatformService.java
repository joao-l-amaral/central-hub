package pt.amaralsoftware.gameq.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.models.GameQPlatform;
import pt.amaralsoftware.gameq.models.entity.CatGamePlatformEntity;
import pt.amaralsoftware.gameq.repository.CatGamePlatformRepository;
import pt.amaralsoftware.gameq.resolvers.PlatformIconResolver;
import pt.amaralsoftware.shared.util.JSONSerializer;
import pt.amaralsoftware.shared.util.MapSerializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class CatGamePlatformService {

    private static Logger log = LoggerFactory.getLogger(CatGamePlatformService.class);

    @Inject
    CatGamePlatformRepository catGamePlatformRepository;
    @Inject
    PlatformIconResolver platformIconResolver;

    public List<String> getSelectedPlatforms() {
         return catGamePlatformRepository.getSelectedPlatforms();
    }

    public List<GameQPlatform> getPlatformNames() {
        List<CatGamePlatformEntity> videoGamePlatforms = catGamePlatformRepository.findAll(Sort.by("name", Sort.Direction.Ascending)).list();

        List<GameQPlatform> gameVaultPlatformFiltered = new ArrayList<>();

        try {
            Map<String, String> iconMap = platformIconResolver.getIconsByPlatformName();

            gameVaultPlatformFiltered = videoGamePlatforms.stream()
                    .filter(platform -> iconMap.containsKey(platform.getName()))
                    .map(platform -> new GameQPlatform(
                            platform.getName(),
                            platform.getToImport(),
                            iconMap.get(platform.getName())
                    ))
                    .toList();

        } catch (IOException e) {
            log.error("Error while getting platform names: {}", e.getMessage());
        }

        return gameVaultPlatformFiltered;
    }

    @Transactional
    public void updatePlatforms(String payload) throws IOException {
        List<String> platformList = JSONSerializer.fromJSON(payload, List.class);

        List<CatGamePlatformEntity> allPlatforms = catGamePlatformRepository.findAll().list();

        for(CatGamePlatformEntity platform : allPlatforms) {
            String name = platform.getName();
            platform.setToImport(platformList.contains(name));

            catGamePlatformRepository.persist(platform);
        }
    }

    @Transactional
    public void savePlatforms(Map<String, Object> platform) {
        if(!platform.isEmpty()) {
            CatGamePlatformEntity catGamePlatformEntity = MapSerializer.fromMapToObj(platform, CatGamePlatformEntity.class);

            if (catGamePlatformRepository.find("Where name = ?1", catGamePlatformEntity.getName()).firstResult() == null) {
                catGamePlatformRepository.persist(catGamePlatformEntity);
            }

        }
    }
}