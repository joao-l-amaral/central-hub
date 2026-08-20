package pt.amaralsoftware.gameq.models;

public class GameQPlatform {
    private String platformName;
    private Boolean isSelected;
    private String icon;

    public GameQPlatform() {
    }

    public GameQPlatform(String platformName, Boolean isSelected, String icon) {
        this.platformName = platformName;
        this.isSelected = isSelected;
        this.icon = icon;
    }

    public String getPlatformName() {
        return platformName;
    }

    public String getIcon() {
        return icon;
    }

    public Boolean getSelected() {
        return isSelected;
    }
}
