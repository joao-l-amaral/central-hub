package pt.amaralsoftware.gameq.models.xboxApi;

public class XboxApiConfiguration {
    private String xuid;
    private String apiKey;

    public XboxApiConfiguration() {
    }

    public String getXuid() {
        return xuid;
    }

    public void setXuid(String xuid) {
        this.xuid = xuid;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
}
