package pt.amaralsoftware.webbinder.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pt.amaralsoftware.webbinder.model.entity.OwnPokemonEntity;

@ApplicationScoped
public class OwnPokemonRepository implements PanacheRepository<OwnPokemonEntity> {

}