package pt.amaralsoftware.gameq.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;
import pt.amaralsoftware.gameq.models.entity.CatDigitalStoresEntity;
import pt.amaralsoftware.gameq.models.entity.CatGameEntity;
import pt.amaralsoftware.gameq.models.entity.CatOwnGameEntity;
import pt.amaralsoftware.gameq.repository.CatDigitalStoresRepository;
import pt.amaralsoftware.gameq.repository.CatGameRepository;
import pt.amaralsoftware.gameq.repository.CatOwnGameRepository;

@ApplicationScoped
public class CatOwnGameService {
    private static final Logger log = LoggerFactory.getLogger(CatOwnGameService.class);

    @Inject
    CatOwnGameRepository catOwnGameRepository;
    @Inject
    CatGameRepository catGameRepository;
    @Inject
    CatDigitalStoresRepository catDigitalStoresRepository;

    @Transactional
    public void addGame(CatGameEntity catGameEntity, String digitalStore, String totalAchievement, String currentAchievement) {
        log.info("Adding game to CatOwnGameEntity: {}, {}, {}, {}", catGameEntity.getName(), digitalStore, totalAchievement, currentAchievement);

        CatDigitalStoresEntity store = resolveStore(digitalStore);

        CatOwnGameEntity own = catOwnGameRepository
                .find("game = ?1", catGameEntity)
                .firstResultOptional()
                .orElseGet(() -> {
                    CatOwnGameEntity created = new CatOwnGameEntity();
                    created.setId(UUID.randomUUID());
                    created.setGame(catGameEntity);
                    catOwnGameRepository.persist(created);
                    return created;
                });

        own.setDigitalStore(store);
        own.setTotalAchievements(totalAchievement);
        own.setCurrentAchievements(currentAchievement);
    }

    private CatDigitalStoresEntity resolveStore(String name) {
        if (StringUtils.isBlank(name)) {
            return null;
        }
        return catDigitalStoresRepository
                .find("name = ?1", name)
                .firstResultOptional()
                .orElseThrow(() -> new NotFoundException("Unknown digital store: " + name));
    }

}