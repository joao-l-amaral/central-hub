package pt.amaralsoftware.gameq.models;

import pt.amaralsoftware.gameq.models.xboxApi.XboxApiConfiguration;

import java.util.List;
import java.util.Map;

public class GameQConfiguration {
    List<Map<String, Object>> platforms;
    XboxApiConfiguration xbox;

    public GameQConfiguration() {
    }

    public GameQConfiguration(List<Map<String, Object>> platforms, XboxApiConfiguration xbox) {
        this.platforms = platforms;
        this.xbox = xbox;
    }

    public List<Map<String, Object>> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<Map<String, Object>> platforms) {
        this.platforms = platforms;
    }

    public XboxApiConfiguration getXbox() {
        return xbox;
    }

    public void setXbox(XboxApiConfiguration xbox) {
        this.xbox = xbox;
    }
}
