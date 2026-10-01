package pt.amaralsoftware.gameq.modules.gameProcessor.models;

import pt.amaralsoftware.gameq.models.dto.GameDTO;
import pt.amaralsoftware.gameq.models.dto.PlatformDTO;
import pt.amaralsoftware.core.modules.processor.models.Order;

import java.util.List;

public class GameOrder extends Order<GameDataStates>  {
    private GameDTO information;
    private PlatformDTO platform;
    private List<String> platformFamily;

    public GameOrder(String targetEntity) {
        super(targetEntity);
        this.setState(GameDataStates.IDLE);
    }

    public GameDTO getInformation() {
        return information;
    }

    public void setInformation(GameDTO information) {
        this.information = information;
    }

    public PlatformDTO getPlatform() {
        return platform;
    }

    public void setPlatform(PlatformDTO platform) {
        this.platform = platform;
    }

    public List<String> getPlatformFamily() {
        return platformFamily;
    }

    public void setPlatformFamily(List<String> platformFamily) {
        this.platformFamily = platformFamily;
    }
}
