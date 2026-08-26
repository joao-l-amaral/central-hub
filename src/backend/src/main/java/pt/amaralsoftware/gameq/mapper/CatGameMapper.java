package pt.amaralsoftware.gameq.mapper;

import jakarta.enterprise.context.ApplicationScoped;
import org.apache.commons.lang3.StringUtils;
import pt.amaralsoftware.gameq.models.dto.GameQGameDTO;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;

import java.time.ZonedDateTime;

@ApplicationScoped
public class CatGameMapper {

    public GameQGameDTO toDto(CatGameEntity entity) {
        String releaseDate = entity.getReleaseDate();
        Integer releaseYear = StringUtils.isNotBlank(releaseDate) ? ZonedDateTime.parse(releaseDate).getYear() : -1;

        return new GameQGameDTO(
            entity.getName(),
            releaseYear,
            entity.getCommunityRating(),
            entity.getPlatform(),
            entity.getEsrb(),
            entity.getDeveloper(),
            entity.getPublisher()
        );
    }

    public CatGameEntity toEntity(GameQGameDTO dto) {
        return new CatGameEntity(
            dto.getName(),
            String.valueOf(dto.getReleaseYear()),
            dto.getCommunityRating(),
            dto.getPlatform(),
            dto.getEsrb(),
            dto.getDeveloper(),
            dto.getPublisher()
        );
    }
}