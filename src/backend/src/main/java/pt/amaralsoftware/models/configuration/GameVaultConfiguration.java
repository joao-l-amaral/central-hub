package pt.amaralsoftware.models;

import java.util.List;

public class GameVaultConfiguration {
    List<String> keyWordsToLookFor;
    List<String> keyWordsToIgnore;

    public GameVaultConfiguration() {
    }

    public List<String> getKeyWordsToLookFor() {
        return keyWordsToLookFor;
    }

    public void setKeyWordsToLookFor(List<String> keyWordsToLookFor) {
        this.keyWordsToLookFor = keyWordsToLookFor;
    }

    public List<String> getKeyWordsToIgnore() {
        return keyWordsToIgnore;
    }

    public void setKeyWordsToIgnore(List<String> keyWordsToIgnore) {
        this.keyWordsToIgnore = keyWordsToIgnore;
    }
}
