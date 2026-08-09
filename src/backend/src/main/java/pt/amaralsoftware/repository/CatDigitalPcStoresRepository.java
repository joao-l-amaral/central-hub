package pt.amaralsoftware.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.models.entity.CatDigitalPcStoresEntity;

@ApplicationScoped
public class CatDigitalPcStoresRepository implements PanacheRepository<CatDigitalPcStoresEntity> {

}