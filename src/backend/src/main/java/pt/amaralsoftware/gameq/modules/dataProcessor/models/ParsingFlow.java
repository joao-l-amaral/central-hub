package pt.amaralsoftware.gameq.modules.dataProcessor.models;

public abstract class ParsingFlow {
    public abstract GameQParsingStates executeWorkflow(GameQParsingStates currentState);
}
