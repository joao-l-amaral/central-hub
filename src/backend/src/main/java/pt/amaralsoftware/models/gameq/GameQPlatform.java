package pt.amaralsoftware.models.gameq;

public class GameQPlatform {
    private String platformName;
    private Boolean isSelected;

    public GameQPlatform() {
    }

    public GameQPlatform(String platformName, Boolean isSelected) {
        this.platformName = platformName;
        this.isSelected = isSelected;
    }

    public String getPlatformName() {
        return platformName;
    }

    public Boolean getSelected() {
        return isSelected;
    }
}
