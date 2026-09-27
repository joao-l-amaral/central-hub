
package pt.amaralsoftware.gameq.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity
@Table(name = "cat_own_games")
public class CatOwnGameEntity extends PanacheEntityBase implements Serializable {

    @Id
    private String id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_name", referencedColumnName = "name", unique = true)
    private CatGameEntity game;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "digital_pc_store", referencedColumnName = "name", nullable = true)
    private CatDigitalStoresEntity digitalStore;

    @Column(name = "is_complete")
    private Boolean isCompleted;

    @Column(name = "date_of_finish")
    private ZonedDateTime dateOfFinish;

    public CatOwnGameEntity() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CatGameEntity getGame() {
        return game;
    }

    public void setGame(CatGameEntity game) {
        this.game = game;
    }

    public Boolean getCompleted() {
        return isCompleted;
    }

    public void setCompleted(Boolean completed) {
        isCompleted = completed;
    }

    public ZonedDateTime getDateOfFinish() {
        return dateOfFinish;
    }

    public void setDateOfFinish(ZonedDateTime dateOfFinish) {
        this.dateOfFinish = dateOfFinish;
    }

    public CatDigitalStoresEntity getDigitalStore() {
        return digitalStore;
    }

    public void setDigitalStore(CatDigitalStoresEntity digitalStore) {
        this.digitalStore = digitalStore;
    }
}