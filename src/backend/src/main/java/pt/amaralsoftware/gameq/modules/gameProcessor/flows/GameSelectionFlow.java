package pt.amaralsoftware.gameq.modules.gameProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.gameq.models.dto.GameDTO;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameDataStates;
import pt.amaralsoftware.gameq.modules.gameProcessor.models.GameOrder;
import pt.amaralsoftware.gameq.service.CatGameService;

@ApplicationScoped
public class GameSelectionFlow extends ExecutionFlow {

    @Inject
    CatGameService catGameService;

    @Override
    public void executeWorkflow(GameOrder order) {
        String targetEntity = order.getTargetEntity();
        GameDTO selectedGame = catGameService.getSelectedGame(targetEntity);

        if (selectedGame != null) {
            order.setInformation(selectedGame);
            order.setState(GameDataStates.GAME_DATA);
        } else {
            order.setState(GameDataStates.NO_CONTENT);
        }
    }
}
