package pt.amaralsoftware.gameq.modules.base.models;

import java.io.Serializable;

public interface ProcessState extends Serializable {
    boolean isTerminal();
}
