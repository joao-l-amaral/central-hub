package pt.amaralsoftware.gameq.modules.dataProcessor.models;

import java.util.HashMap;
import java.util.Map;

public class ParsedMetadataModel {
    Boolean isGame;
    Boolean nameFoundInLookUpList;
    Map<String, Object> gameMap;
    String currentKey;
    StringBuilder currentValue;

    public ParsedMetadataModel() {
        this.isGame = false;
        this.nameFoundInLookUpList = false;
        this.gameMap = new HashMap<>();
        this.currentKey = null;
        this.currentValue = new StringBuilder();
    }

    public Boolean getGame() {
        return isGame;
    }

    public void setGame(Boolean game) {
        isGame = game;
    }

    public Boolean getNameFoundInLookUpList() {
        return nameFoundInLookUpList;
    }

    public void setNameFoundInLookUpList(Boolean nameFoundInLookUpList) {
        this.nameFoundInLookUpList = nameFoundInLookUpList;
    }

    public void setCurrentKey(String currentKey) {
        this.currentKey = currentKey;
    }

    public StringBuilder getCurrentValue() {
        return currentValue;
    }

    public void resetCurrentValue() {
        this.currentValue.setLength(0);
    }

    public void setCurrentValue(StringBuilder currentValue) {
        this.currentValue = currentValue;
    }

    public Map<String, Object> getGameMap() {
        return gameMap;
    }

    public void clearGameMap() {
        this.gameMap.clear();
    }

    public void addGameToMap() {
        this.gameMap.put(this.currentKey, this.currentValue.toString());
    }
}
