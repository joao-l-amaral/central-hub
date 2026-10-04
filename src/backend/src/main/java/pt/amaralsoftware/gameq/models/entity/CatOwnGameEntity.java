
package pt.amaralsoftware.gameq.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "cat_own_games")
public class CatOwnGameEntity extends PanacheEntityBase implements Serializable {

    @Id
    @Column(name = "id", nullable = false, updatable = false, columnDefinition = "uuid")
    private UUID id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id", referencedColumnName = "id", unique = true)
    private CatGameEntity game;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "digital_store", referencedColumnName = "name", nullable = true)
    private CatDigitalStoresEntity digitalStore;

    @Column(name = "is_complete")
    private Boolean isCompleted;

    @Column(name = "date_of_finish")
    private ZonedDateTime dateOfFinish;

    @Column(name = "total_achivements")
    private String totalAchievements;

    @Column(name = "current_achivements")
    private String currentAchievements;

    public CatOwnGameEntity() {
        this.id = UUID.randomUUID();
    }

    @PrePersist
    public void prePersist() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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

    public String getTotalAchievements() {
        return totalAchievements;
    }

    public void setTotalAchievements(String totalAchievements) {
        this.totalAchievements = totalAchievements;
    }

    public String getCurrentAchievements() {
        return currentAchievements;
    }

    public void setCurrentAchievements(String currentAchievements) {
        this.currentAchievements = currentAchievements;
    }
}