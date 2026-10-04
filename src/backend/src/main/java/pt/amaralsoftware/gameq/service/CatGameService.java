package pt.amaralsoftware.gameq.service;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.mapper.CatGameMapper;
import pt.amaralsoftware.gameq.models.dto.GameDTO;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;
import pt.amaralsoftware.gameq.repository.CatGameRepository;
import pt.amaralsoftware.gameq.resolvers.PlatformIconResolver;
import pt.amaralsoftware.shared.util.MapSerializer;
import pt.amaralsoftware.shared.util.MapUtils;

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

    final Map<String, String> mapPlatformMatrix = Map.of(
            "Microsoft Xbox One", "Application",
            "Microsoft Xbox 360", "Xbox360Game"
    );

    @Transactional
    public CatGameEntity setExtraInfoForGameCatalog(String gameName, String titleId, String displayImage, String platform) {

        String name=gameName.replace("™", "").replace("®", "").trim();

        List<CatGameEntity> games = this.findGames(name);

        if (CollectionUtils.isEmpty(games)) {
            return null;
        }

        CatGameEntity catGameEntity = games.getFirst();

        String mappedPlatform = mapPlatformMatrix .get(catGameEntity.getPlatform());

        boolean isFromCorrectPlatform = mappedPlatform != null && mappedPlatform.equals(platform);

        if(isFromCorrectPlatform) {
            catGameEntity.setDisplayImage(displayImage);
            catGameRepository.persist(catGameEntity);
        }

        return catGameEntity;
    }

    @Transactional
    public void saveGames(Map<String, Object> game) {
        if(!game.isEmpty()) {
            CatGameEntity catGameEntity = MapSerializer.fromMapToObj(game, CatGameEntity.class);
            catGameEntity.setId(MapUtils.getPropertyAsString(game, "databaseID"));

            if (catGameRepository.find("id = ?1", catGameEntity.getId()).firstResult() == null) {
                catGameRepository.persist(catGameEntity);
            }
        }
    }

    public Long getTotalGamesCount(String platform) {
        return (StringUtils.isBlank(platform)) ?
                catGameRepository.count() :
                catGameRepository.find("platform = ?1", platform).count();
    }

    public List<GameDTO> getGamesList(String platform, Integer page, Integer pageSize, String sortOrder) {
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

    public List<GameDTO> getGamesListFromSearch(String game) {
        return catGameRepository
                .find("name ILIKE ?1", Sort.by("name", Sort.Direction.Ascending), "%" + game + "%")
                .list()
                .stream()
                .map(gameEntity -> {
                    try {
                        Map<String, String> iconsByPlatformName = platformIconResolver.getIconsByPlatformName();
                        String platformIcon = iconsByPlatformName.get(gameEntity.getPlatform());

                        GameDTO gameQGameDTO = catGameMapper.toDto(gameEntity);
                        gameQGameDTO.setPlatformIcon(platformIcon);

                        return gameQGameDTO;
                    } catch (IOException e) {
                        log.error(e.getMessage());
                    }
                    return new GameDTO();
                })
                .collect(Collectors.toList());
    }

    public GameDTO getSelectedGame(String gameName) {
        CatGameEntity catGameEntity = catGameRepository.find("name = ?1", gameName).firstResult();

        if(catGameEntity != null) {
            return catGameMapper.toDto(catGameEntity);
        }

        return null;
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

            String key = kv[0].trim().toLowerCase();
            String value = kv[1].trim();

            if ("field".equals(key)) {
                field = value;
            } else if ("direction".equals(key)) {
                direction = "DESC".equalsIgnoreCase(value)
                        ? Sort.Direction.Descending
                        : Sort.Direction.Ascending;
            }
        }

        return Sort.by(field, direction);
    }

    public List<CatGameEntity> findGames(String inputName) {
        List<CatGameEntity> exactMatches = catGameRepository
                .find("name = ?1", inputName)
                .list();

        if (!exactMatches.isEmpty()) {
            return exactMatches;
        }

        return catGameRepository.find("name ilike ?1 order by releaseDate ASC", "%" + inputName + "%").list();
    }

}