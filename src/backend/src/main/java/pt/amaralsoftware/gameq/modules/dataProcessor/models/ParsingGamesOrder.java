package pt.amaralsoftware.gameq.modules.dataProcessor.models;

import pt.amaralsoftware.core.modules.processor.models.Order;

public class ParsingGamesOrder extends Order<GameParsingStates> {
    private String message;
    private Integer numberOfPlatformsImported;
    private Integer numberOfGamesImported;


    public ParsingGamesOrder() {
        super();
        this.setState(GameParsingStates.INITIALIZE);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getNumberOfPlatformsImported() {
        return numberOfPlatformsImported;
    }

    public void setNumberOfPlatformsImported(Integer numberOfPlatformsImported) {
        this.numberOfPlatformsImported = numberOfPlatformsImported;
    }

    public Integer getNumberOfGamesImported() {
        return numberOfGamesImported;
    }

    public void setNumberOfGamesImported(Integer numberOfGamesImported) {
        this.numberOfGamesImported = numberOfGamesImported;
    }
}
