package pt.amaralsoftware.models.gameq;

import java.util.List;

public class GameQConfiguration {
    List<GameQPlatform> platforms;

    public GameQConfiguration() {
    }

    public GameQConfiguration(List<GameQPlatform> platforms) {
        this.platforms = platforms;
    }

    public List<GameQPlatform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<GameQPlatform> platforms) {
        this.platforms = platforms;
    }
}
