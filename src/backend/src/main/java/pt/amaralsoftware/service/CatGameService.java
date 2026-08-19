package pt.amaralsoftware.service;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.models.DTO.gameq.GameQGameDTO;
import pt.amaralsoftware.models.entity.CatGameEntity;
import pt.amaralsoftware.repository.CatGameRepository;
import pt.amaralsoftware.resolvers.PlatformIconResolver;
import pt.amaralsoftware.util.MapSerializer;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ApplicationScoped
public class CatGameService {

    private static final Logger log = LoggerFactory.getLogger(CatGameService.class);
    @Inject
    CatGameRepository catGameRepository;
    @Inject
    PlatformIconResolver platformIconResolver;

    @Transactional
    public void saveGames(Map<String, Object> game) {
        if(!game.isEmpty()) {
            CatGameEntity catGameEntity = MapSerializer.fromMapToObj(game, CatGameEntity.class);

            if (catGameRepository.find("Where name = ?1", catGameEntity.getName()).firstResult() == null) {
                catGameRepository.persist(catGameEntity);
            }
        }
    }

    public Long getAllGamesCount() {
        return catGameRepository.count();
    }

    public List<CatGameEntity> getAllGames(Integer page, Integer pageSize, String sortOrder) {
        return catGameRepository.findAll(resolveSort(sortOrder, "name"))
                .page(Page.of(page, pageSize))
                .list();
    }

    public Long getGamesByPlatformCount(String platform) {
        return catGameRepository.find("Where platform = ?1", platform).count();
    }

    public List<CatGameEntity> getGamesByPlatform(String platform, Integer page, Integer pageSize, String sortOrder) {
        return catGameRepository.find("Where platform = ?1", resolveSort(sortOrder, "name"), platform)
                .page(Page.of(page-1, pageSize))
                .list();
    }

    public List<GameQGameDTO> getGamesListFromSearch(String game) {
        return catGameRepository
                .find("Where name ILIKE ?1", Sort.by("name", Sort.Direction.Ascending), "%" + game + "%")
                .list()
                .stream()
                .map(gameEntity -> {
                    try {
                        Map<String, String> iconsByPlatformName = platformIconResolver.getIconsByPlatformName();
                        String platformIcon = iconsByPlatformName.get(gameEntity.getPlatform());
                        String releaseDate = gameEntity.getReleaseDate();
                        Integer releaseYear = StringUtils.isNotBlank(releaseDate) ? ZonedDateTime.parse(releaseDate).getYear() : -1;
                        return new GameQGameDTO(gameEntity.getName(), platformIcon, releaseYear, gameEntity.getDeveloper());
                    } catch (IOException e) {
                        log.error(e.getMessage());
                    }
                    return new GameQGameDTO();
                })
                .collect(Collectors.toList());
    }

    private Sort resolveSort(String sortOrder, String defaultField) {
        if (StringUtils.isBlank(sortOrder)) {
            return Sort.by(defaultField);
        }

        String field = defaultField;
        Sort.Direction direction = Sort.Direction.Ascending;

        for (String part : sortOrder.split(",")) {
            String[] kv = part.split(":", 2);
            if (kv.length != 2) continue;

            switch (kv[0].trim().toLowerCase()) {
                case "field" -> field = kv[1].trim();
                case "direction" -> direction = "DESC".equalsIgnoreCase(kv[1].trim())
                        ? Sort.Direction.Descending
                        : Sort.Direction.Ascending;
            }
        }

        return Sort.by(field, direction);
    }
}