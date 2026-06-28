package pt.amaralsoftware.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.models.entity.GuiRemoteEntity;

@ApplicationScoped
public class GuiRemoteRepository implements PanacheRepository<GuiRemoteEntity> {

}