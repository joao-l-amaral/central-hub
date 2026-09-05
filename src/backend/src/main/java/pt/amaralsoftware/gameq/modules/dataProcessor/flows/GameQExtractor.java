package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;

@ApplicationScoped
public class GameQExtractor extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(GameQExtractor.class);

    @Override
    public GameQParsingStates executeWorkflow(GameQParsingStates currentState) {
        log.info("Starting GameQExtractor flow");

        return GameQParsingStates.EXTRACTED;
    }

}
