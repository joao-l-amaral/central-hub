package pt.amaralsoftware.gameq.models.xboxApi;

import java.util.List;
import java.util.Map;

public class XboxApiResponseContent {
    private String xuid;
    private List<Map<String, Object>> titles;

    public XboxApiResponseContent() {
    }

    public String getXuid() {
        return xuid;
    }

    public void setXuid(String xuid) {
        this.xuid = xuid;
    }

    public List<Map<String, Object>> getTitles() {
        return titles;
    }

    public void setTitles(List<Map<String, Object>> titles) {
        this.titles = titles;
    }
}
