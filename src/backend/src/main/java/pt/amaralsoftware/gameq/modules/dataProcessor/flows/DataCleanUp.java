package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@ApplicationScoped
public class DataCleanUp extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataCleanUp.class);

    @Override
    public ParsingResult executeWorkflow(GameQParsingStates currentState) {
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

            return ParsingResult.ok(GameQParsingStates.COMPLETED);
        } catch (Exception e) {
            log.error("Error occurred while cleaning up extracted files", e);
        }

        return ParsingResult.error("Failed to clean up extracted files.");

    }

}
