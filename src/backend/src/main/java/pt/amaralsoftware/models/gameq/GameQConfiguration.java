package pt.amaralsoftware.models.gameq;

import java.util.List;
import java.util.Map;

public class GameQConfiguration {
    List<Map<String, Object>> platforms;

    public GameQConfiguration() {
    }

    public GameQConfiguration(List<Map<String, Object>> platforms) {
        this.platforms = platforms;
    }

    public List<Map<String, Object>> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<Map<String, Object>> platforms) {
        this.platforms = platforms;
    }
}
