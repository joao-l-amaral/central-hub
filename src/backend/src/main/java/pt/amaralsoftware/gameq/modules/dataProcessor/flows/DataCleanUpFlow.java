package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.core.modules.processor.models.Criticity;
import pt.amaralsoftware.core.modules.processor.models.DiagnosticMessage;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingGamesOrder;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@ApplicationScoped
public class DataCleanUpFlow extends ExecutionFlow {

    @Override
    public void executeWorkflow(ParsingGamesOrder order) {
        log.info("Starting GameQCleanUp flow");

        try {
            File folder = new File(FILE_EXTRACTED_PATH);
            File[] xmlFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));

            if (xmlFiles != null) {
                for (File xml : xmlFiles) {
                    Path path = Paths.get(xml.getAbsolutePath());
                    Files.delete(path);
                }
            }

            order.setState(GameParsingStates.FINISHED);
        } catch (Exception e) {
            log.error("Error occurred while cleaning up extracted files", e);
            order.setState(GameParsingStates.ERROR);
            order.setDiagnosticMessage(new DiagnosticMessage("Failed to clean up extracted files.", Criticity.ERROR));
        }
    }
}
