package pt.amaralsoftware.webbinder.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.webbinder.model.entity.CardFamilyEntity;

@ApplicationScoped
public class CardFamilyRepository implements PanacheRepository<CardFamilyEntity> {

}