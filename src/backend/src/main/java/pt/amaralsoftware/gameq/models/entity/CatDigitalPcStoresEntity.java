
package pt.amaralsoftware.gameq.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "cat_digital_pc_stores")
public class CatDigitalPcStoresEntity extends PanacheEntityBase implements Serializable {
    @Id
    private String name;
    @Column(name ="cooperationname")
    private String cooperationName;
    private String website;

    public CatDigitalPcStoresEntity() {
    }

    public CatDigitalPcStoresEntity(String name, String cooperationName, String website) {
        this.name = name;
        this.cooperationName = cooperationName;
        this.website = website;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCooperationName() {
        return cooperationName;
    }

    public void setCooperationName(String cooperationName) {
        this.cooperationName = cooperationName;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}