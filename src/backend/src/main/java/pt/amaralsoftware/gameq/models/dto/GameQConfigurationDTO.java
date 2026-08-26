package pt.amaralsoftware.gameq.models.dto;

import pt.amaralsoftware.gameq.models.GameQPlatform;

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
