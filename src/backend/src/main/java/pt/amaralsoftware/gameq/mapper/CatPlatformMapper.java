package pt.amaralsoftware.gameq.mapper;

import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.gameq.models.dto.PlatformDTO;
import pt.amaralsoftware.gameq.models.entity.CatGamePlatformEntity;

@ApplicationScoped
public class CatPlatformMapper {
    public PlatformDTO toDto(CatGamePlatformEntity entity) {
        return new PlatformDTO(
                entity.getName(),
                entity.getReleaseDate(),
                entity.getDeveloper(),
                entity.getManufacturer(),
                entity.getCpu(),
                entity.getMemory(),
                entity.getGraphics(),
                entity.getSound(),
                entity.getDisplay(),
                entity.getNotes(),
                entity.getMedia(),
                entity.getMaxControllers()
        );
    }


    public CatGamePlatformEntity toEntity(PlatformDTO dto) {
        return new CatGamePlatformEntity(
                dto.getName(),
                dto.getReleaseDate(),
                dto.getDeveloper(),
                dto.getManufacturer(),
                dto.getCpu(),
                dto.getMemory(),
                dto.getGraphics(),
                dto.getSound(),
                dto.getDisplay(),
                dto.getNotes(),
                dto.getMedia(),
                dto.getMaxControllers()
        );
    }
}