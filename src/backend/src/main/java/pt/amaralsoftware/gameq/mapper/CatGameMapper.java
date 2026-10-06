package pt.amaralsoftware.gameq.mapper;

import jakarta.enterprise.context.ApplicationScoped;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import pt.amaralsoftware.gameq.models.dto.GameDTO;
import pt.amaralsoftware.gameq.models.entity.CatDigitalStoresEntity;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;
import pt.amaralsoftware.gameq.models.entity.CatOwnGameEntity;

import java.time.LocalDate;

@ApplicationScoped
public class CatGameMapper {

    public GameDTO toDto(CatGameEntity entity) {
        String releaseDate = entity.getReleaseDate();
        Integer releaseYear = StringUtils.isNotBlank(releaseDate)
                ? LocalDate.parse(releaseDate).getYear()
                : null;

        GameDTO gameDTO = new GameDTO(
                entity.getName(),
                releaseYear,
                entity.getOverview(),
                NumberUtils.toInt(entity.getMaxPlayers()),
                entity.getVideoUrl(),
                entity.getCommunityRating(),
                entity.getPlatform(),
                entity.getEsrb(),
                entity.getDeveloper(),
                entity.getPublisher()
        );

        CatOwnGameEntity ownGame = entity.getOwnGame();

        if(ownGame != null) {
            gameDTO.setComplete(ownGame.getCompleted());
            gameDTO.setDateOfFinish(ownGame.getDateOfFinish());

            CatDigitalStoresEntity digitalStore = ownGame.getDigitalStore();

            if(digitalStore != null) {
                gameDTO.setName(digitalStore.getName());
                gameDTO.setCooperationName(digitalStore.getCooperationName());
                gameDTO.setWebsite(digitalStore.getWebsite());
            }
        }

        return gameDTO;
    }

    public CatGameEntity toEntity(GameDTO dto) {
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