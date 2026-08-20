package pt.amaralsoftware.gameq.service;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.mapper.CatGameMapper;
import pt.amaralsoftware.gameq.models.dto.GameQGameDTO;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;
import pt.amaralsoftware.gameq.repository.CatGameRepository;
import pt.amaralsoftware.gameq.resolvers.PlatformIconResolver;
import pt.amaralsoftware.shared.util.MapSerializer;

import java.io.IOException;
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
    @Inject
    CatGameMapper catGameMapper;

    @Transactional
    public void saveGames(Map<String, Object> game) {
        if(!game.isEmpty()) {
            CatGameEntity catGameEntity = MapSerializer.fromMapToObj(game, CatGameEntity.class);

            if (catGameRepository.find("name = ?1", catGameEntity.getName()).firstResult() == null) {
                catGameRepository.persist(catGameEntity);
            }
        }
    }

    public Long getTotalGamesCount(String platform) {
        return (StringUtils.isBlank(platform)) ?
                catGameRepository.count() :
                catGameRepository.find("platform = ?1", platform).count();
    }

    public List<GameQGameDTO> getGamesList(String platform, Integer page, Integer pageSize, String sortOrder) {
        List<CatGameEntity> games = (StringUtils.isBlank(platform))
                ?
                catGameRepository.findAll(resolveSort(sortOrder, "name"))
                        .page(Page.of(page, pageSize))
                        .list()
                :
                catGameRepository.find("platform = ?1", resolveSort(sortOrder, "name"), platform)
                        .page(Page.of(page-1, pageSize))
                        .list();

        return games.stream()
                .map(catGameMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<GameQGameDTO> getGamesListFromSearch(String game) {
        return catGameRepository
                .find("name ILIKE ?1", Sort.by("name", Sort.Direction.Ascending), "%" + game + "%")
                .list()
                .stream()
                .map(gameEntity -> {
                    try {
                        Map<String, String> iconsByPlatformName = platformIconResolver.getIconsByPlatformName();
                        String platformIcon = iconsByPlatformName.get(gameEntity.getPlatform());

                        GameQGameDTO gameQGameDTO = catGameMapper.toDto(gameEntity);
                        gameQGameDTO.setPlatformIcon(platformIcon);

                        return gameQGameDTO;
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