package pt.amaralsoftware.application.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.models.GameQConfiguration;
import pt.amaralsoftware.gameq.models.GameVaultConfiguration;
import pt.amaralsoftware.application.models.entity.CatConfigEntity;
import pt.amaralsoftware.application.repository.CatConfigRepository;
import pt.amaralsoftware.shared.util.JSONSerializer;

import java.io.IOException;

@ApplicationScoped
public class CatConfigService {

    private static final Logger log = LoggerFactory.getLogger(CatConfigService.class);
    @Inject
    CatConfigRepository catConfigRepository;

    public GameVaultConfiguration getVideoGameConfig() throws IOException {
        CatConfigEntity catConfigEntity = catConfigRepository.find("WHERE module = 'GameVault'").firstResult();
        return JSONSerializer.fromJSON(catConfigEntity.getConfiguration(), GameVaultConfiguration.class);
    }

    public GameQConfiguration getGameQConfiguration() throws IOException {
        CatConfigEntity catConfigEntity = catConfigRepository.find("WHERE module = 'GameVault'").firstResult();
        String configuration = catConfigEntity.getConfiguration();
        return JSONSerializer.fromJSON(configuration, GameQConfiguration.class);
    }

    @Transactional
    public void updateGameVaultConfiguration(String payload) {
        log.debug("Updating GameVault configuration: {}", payload);

        CatConfigEntity catConfigEntity = catConfigRepository.find("WHERE module = 'GameVault'").firstResult();

        catConfigEntity.setConfiguration(payload);

        catConfigRepository.persist(catConfigEntity);
    }
}