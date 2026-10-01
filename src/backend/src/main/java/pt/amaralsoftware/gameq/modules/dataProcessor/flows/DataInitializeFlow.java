package pt.amaralsoftware.gameq.modules.dataProcessor.flows;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.core.modules.processor.models.Criticity;
import pt.amaralsoftware.core.modules.processor.models.DiagnosticMessage;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ExecutionFlow;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.GameParsingStates;
import pt.amaralsoftware.gameq.modules.dataProcessor.models.ParsingGamesOrder;
import pt.amaralsoftware.shared.util.NtfyUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@ApplicationScoped
public class DataInitializeFlow extends ExecutionFlow {

    @Inject
    NtfyUtils ntfyUtils;

    @Override
    public void executeWorkflow(ParsingGamesOrder order) {
        log.info("Setting up parsing flow");

        try {
            createFolderStructure(FILE_DOWNLOAD_PATH);
            createFolderStructure(FILE_EXTRACTED_PATH);

            order.setState(GameParsingStates.IDLE);
        } catch (IOException e) {
            log.error("Game vault data source failed to process. {}", e.getMessage());
            this.ntfyUtils.send("[GameVault] Failed to create folder structure for parsing flow.");
            order.setState(GameParsingStates.ERROR);
            order.setDiagnosticMessage(new DiagnosticMessage("Failed to create folder structure for parsing flow.", Criticity.ERROR));
        }


    }

    private void createFolderStructure(String folderPath) throws IOException {
        log.info("Creating folder {}", folderPath);

        Path parent = Paths.get(folderPath).getParent();
        if (parent != null) {
            Files.createDirectories(Path.of(folderPath));
        }
    }

}
