package pt.amaralsoftware.gameq.modules.dataProcessor.models;

public record ParsingResult(GameQParsingStates state, String errorMessage) {
    public static ParsingResult ok(GameQParsingStates state) {
        return new ParsingResult(state, null);
    }
    public static ParsingResult error(String message) {
        return new ParsingResult(GameQParsingStates.ERROR, message);
    }
}