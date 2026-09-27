package pt.amaralsoftware.gameq.modules.gameProcessor.models;

import pt.amaralsoftware.gameq.modules.base.models.ProcessState;

public enum GameDataStates implements ProcessState {
    IDLE,
    NO_CONTENT,
    GAME_DATA,
    PLATFORM_DATA,
    PLATFORM_DATA_FAMILY,
    PLATFORM_SERVICE,
    FINISHED;

    @Override
    public boolean isTerminal() {
        return this == FINISHED || this == NO_CONTENT;
    }
}