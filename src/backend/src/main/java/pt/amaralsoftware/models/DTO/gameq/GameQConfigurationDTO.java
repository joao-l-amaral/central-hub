package pt.amaralsoftware.models.DTO.gameq;

import pt.amaralsoftware.models.gameq.GameQPlatform;

import java.util.List;

public class GameQConfigurationDTO {
    List<GameQPlatform> platforms;

    public GameQConfigurationDTO() {
    }

    public GameQConfigurationDTO(List<GameQPlatform> platforms) {
        this.platforms = platforms;
    }

    public List<GameQPlatform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<GameQPlatform> platforms) {
        this.platforms = platforms;
    }
}
