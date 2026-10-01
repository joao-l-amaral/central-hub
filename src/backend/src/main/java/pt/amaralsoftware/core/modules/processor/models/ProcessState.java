package pt.amaralsoftware.core.modules.processor.models;

import java.io.Serializable;

public interface ProcessState extends Serializable {
    boolean isTerminal();
}
