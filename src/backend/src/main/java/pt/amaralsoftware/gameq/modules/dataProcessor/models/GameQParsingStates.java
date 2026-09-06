package pt.amaralsoftware.gameq.modules.dataProcessor.models;

public enum GameQParsingStates {
     INITIALIZE,
     IDLE,
     DOWNLOADING,
     DOWNLOADED,
     EXTRACTED,
     PLATFORMS_PARSED,
     GAMES_PARSED,
     COMPLETED,
     ERROR
}
