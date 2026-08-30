package pt.amaralsoftware.gameq.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class UpdateSelectedPlatformPayload implements Serializable {
    private String consoleName;
    @JsonProperty("isToImport")
    private Boolean isToImport;

    public UpdateSelectedPlatformPayload() {
    }

    public String getConsoleName() {
        return consoleName;
    }

    public void setConsoleName(String consoleName) {
        this.consoleName = consoleName;
    }

    public Boolean getToImport() {
        return isToImport;
    }

    public void setToImport(Boolean toImport) {
        isToImport = toImport;
    }
}
