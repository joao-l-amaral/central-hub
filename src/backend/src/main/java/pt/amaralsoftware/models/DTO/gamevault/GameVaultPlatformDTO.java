package pt.amaralsoftware.models.DTO.gamevault;

import java.io.Serializable;
import java.util.List;

public class GameVaultPlatformDTO implements Serializable {
    List<String> listOfPlatforms;
    List<String> listOfSelectedPlatforms;

    public GameVaultPlatformDTO() {
    }

    public List<String> getListOfPlatforms() {
        return listOfPlatforms;
    }

    public void setListOfPlatforms(List<String> listOfPlatforms) {
        this.listOfPlatforms = listOfPlatforms;
    }

    public List<String> getListOfSelectedPlatforms() {
        return listOfSelectedPlatforms;
    }

    public void setListOfSelectedPlatforms(List<String> listOfSelectedPlatforms) {
        this.listOfSelectedPlatforms = listOfSelectedPlatforms;
    }
}
