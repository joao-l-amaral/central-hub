package pt.amaralsoftware.core.modules.processor.models;

import java.io.Serializable;

public class DiagnosticMessage implements Serializable {
    private String message;
    private Criticity criticity;

    public DiagnosticMessage() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Criticity getCriticity() {
        return criticity;
    }

    public void setCriticity(Criticity criticity) {
        this.criticity = criticity;
    }
}
