package pt.amaralsoftware.application.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.application.models.entity.GuiRemoteEntity;

@ApplicationScoped
public class GuiRemoteRepository implements PanacheRepository<GuiRemoteEntity> {

}