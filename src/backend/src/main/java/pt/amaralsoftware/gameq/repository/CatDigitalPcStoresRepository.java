package pt.amaralsoftware.gameq.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.gameq.models.entity.CatDigitalPcStoresEntity;

@ApplicationScoped
public class CatDigitalPcStoresRepository implements PanacheRepository<CatDigitalPcStoresEntity> {

}