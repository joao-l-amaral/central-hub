package pt.amaralsoftware.gameq.modules.dataProcessor.models;

import pt.amaralsoftware.core.modules.processor.models.ProcessState;

public enum GameParsingStates implements ProcessState {
     INITIALIZE,
     IDLE,
     DOWNLOADING,
     DOWNLOADED,
     EXTRACTED,
     PLATFORMS_PARSED,
     GAMES_PARSED,
     XBOX_GAMES_PARSED,
     FINISHED,
     NO_CHANGE,
     ERROR;
     @Override
     public boolean isTerminal() {
          return this == FINISHED || this == ERROR || this == NO_CHANGE;
     }
}