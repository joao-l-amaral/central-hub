package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameQParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingResult;
import pt.amaralsoftware.shared.util.NtfyUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@ApplicationScoped
public class DataInitializeFlow extends ParsingFlow {

    private final Logger log = LoggerFactory.getLogger(DataInitializeFlow.class);

    @Inject
    NtfyUtils ntfyUtils;

    @Override
    public ParsingResult executeWorkflow(GameQParsingStates currentState) {
        log.info("Setting up parsing flow");

        try {
            createFolderStructure(FILE_DOWNLOAD_PATH);
            createFolderStructure(FILE_EXTRACTED_PATH);
        } catch (IOException e) {
            log.error("Game vault data source failed to process. {}", e.getMessage());
            this.ntfyUtils.send("[GameVault] Failed to create folder structure for parsing flow.");
            return ParsingResult.error("Failed to create folder structure for parsing flow.");
        }

        return ParsingResult.ok(GameQParsingStates.IDLE);
    }

    private void createFolderStructure(String folderPath) throws IOException {
        log.info("Creating folder {}", folderPath);

        Path parent = Paths.get(folderPath).getParent();
        if (parent != null) {
            Files.createDirectories(Path.of(folderPath));
        }
    }

}
