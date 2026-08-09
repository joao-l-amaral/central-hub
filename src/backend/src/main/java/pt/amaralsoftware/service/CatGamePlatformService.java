package pt.amaralsoftware.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.DTO.gameq.GameVaultPlatformDTO;
import pt.amaralsoftware.models.gameq.GameQConfiguration;
import pt.amaralsoftware.models.gameq.GameVaultConfiguration;
import pt.amaralsoftware.models.entity.CatGamePlatformEntity;
import pt.amaralsoftware.models.gameq.GameQPlatform;
import pt.amaralsoftware.repository.CatGamePlatformRepository;
import pt.amaralsoftware.util.JSONSerializer;
import pt.amaralsoftware.util.MapSerializer;
import pt.amaralsoftware.util.MapUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class CatGamePlatformService {

    private static Logger log = LoggerFactory.getLogger(CatGamePlatformService.class);

    @Inject
    CatGamePlatformRepository catGamePlatformRepository;
    @Inject
    CatConfigService catConfigService;

    public List<String> getSelectedPlatforms() {
         return catGamePlatformRepository.getSelectedPlatforms();
    }

    public List<GameQPlatform> getPlatformNames() {
        List<CatGamePlatformEntity> videoGamePlatforms = catGamePlatformRepository.findAll(Sort.by("name", Sort.Direction.Ascending)).list();

        List<GameQPlatform> gameVaultPlatformFiltered = new ArrayList<>();

        try {
            GameQConfiguration gameQConfiguration = catConfigService.getGameQPlatform();

            List<Map<String, Object>> platforms = gameQConfiguration.getPlatforms();

            Map<String, String> iconByPlatformName = platforms.stream()
                    .collect(Collectors.toMap(
                            p -> MapUtils.getPropertyAsString(p, "platform"),
                            p -> MapUtils.getPropertyAsString(p, "icon"),
                            (a, b) -> a
                    ));

            gameVaultPlatformFiltered = videoGamePlatforms.stream()
                    .filter(platform -> iconByPlatformName.containsKey(platform.getName()))
                    .map(platform -> new GameQPlatform(
                            platform.getName(),
                            platform.getToImport(),
                            iconByPlatformName.get(platform.getName())
                    ))
                    .toList();

        } catch (IOException e) {
            log.error("Error while getting platform names: {}", e.getMessage());
        }

        return gameVaultPlatformFiltered;

    }

    /* @Deprecated
    public GameVaultPlatformDTO getPlatformNamesOld() {

        List<CatGamePlatformEntity> videoGamePlatforms = catGamePlatformRepository.findAll().list();
        List<String> selectedPlatforms = catGamePlatformRepository.getSelectedPlatforms();

        GameVaultPlatformDTO gameVaultPlatformDTO = new GameVaultPlatformDTO();
        try {
            GameVaultConfiguration gameVaultPlatform = catConfigService.getGameQPlatform();

            List<String> keyWordsToLookFor = gameVaultPlatform.getKeyWordsToLookFor();
            List<String> keyWordsToIgnore = gameVaultPlatform.getKeyWordsToIgnore();

            List<String> gameVaultPlatformFiltered = videoGamePlatforms.stream().map(CatGamePlatformEntity::getName)
                    .filter(name ->
                            keyWordsToLookFor.stream().anyMatch(name::contains)
                    )
                    .filter(name ->
                            keyWordsToIgnore.stream().noneMatch(name::contains)
                    )
                    .toList();


            gameVaultPlatformDTO.setListOfPlatforms(gameVaultPlatformFiltered);
            gameVaultPlatformDTO.setListOfSelectedPlatforms(selectedPlatforms);

        } catch (IOException e) {
            log.error("Error while getting platform names: {}", e.getMessage());
        }

        return gameVaultPlatformDTO;
    } */

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