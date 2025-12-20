package pt.amaralsoftware.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import pt.amaralsoftware.models.GameVaultConfiguration;
import pt.amaralsoftware.models.entity.CatConfigEntity;
import pt.amaralsoftware.repository.CatConfigRepository;
import pt.amaralsoftware.util.JSONSerializer;

import java.io.IOException;

@ApplicationScoped
public class CatConfigService {

    @Inject
    CatConfigRepository catConfigRepository;

    public GameVaultConfiguration getVideoGameConfig() throws IOException {
        CatConfigEntity catConfigEntity = catConfigRepository.find("WHERE module = 'GameVault'").firstResult();
        return JSONSerializer.fromJSON(catConfigEntity.getConfiguration(), GameVaultConfiguration.class);
    }

    public GameVaultConfiguration getGameVaultPlatform() throws IOException {
        CatConfigEntity catConfigEntity = catConfigRepository.find("WHERE module = 'GameVault'").firstResult();
        String configuration = catConfigEntity.getConfiguration();
        return JSONSerializer.fromJSON(configuration, GameVaultConfiguration.class);
    }
}