package pt.amaralsoftware.gameq.modules.dataProcessor.models;

public record ParsingResult(GameQParsingStates state, Integer numberOfGamesImported, Integer numberOfPlatformsImported, String message) {
    public static ParsingResult ok(GameQParsingStates state) {
        return new ParsingResult(state, null, null, null);
    }

    public static ParsingResult ok(GameQParsingStates state, Integer numberOfGamesImported, Integer numberOfPlatformsImported) {
        return new ParsingResult(state, numberOfGamesImported, numberOfPlatformsImported, null);
    }

    public static ParsingResult ok(GameQParsingStates state, String message) {
        return new ParsingResult(state, null, null, message);
    }

    public static ParsingResult error(String message) {
        return new ParsingResult(GameQParsingStates.ERROR, null, null, message);
    }
}