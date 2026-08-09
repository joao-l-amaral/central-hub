package pt.amaralsoftware.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.lang3.BooleanUtils;
import pt.amaralsoftware.models.entity.CatGamePlatformEntity;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CatGamePlatformRepository implements PanacheRepository<CatGamePlatformEntity> {

    @PersistenceContext
    public List<String> getSelectedPlatforms() {
        List<String> platforms = new ArrayList<>();

        List<CatGamePlatformEntity> platformToBeImportedList = find("WHERE isToImport = true").list();

        platformToBeImportedList.forEach(platformEntity -> {
            Boolean toImport = platformEntity.getToImport();
            if(BooleanUtils.isTrue(toImport)) {
                platforms.add(platformEntity.getName());
            }
        });

        return platforms;
    }
}