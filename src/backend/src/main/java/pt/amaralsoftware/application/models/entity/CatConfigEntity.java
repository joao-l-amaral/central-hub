
package pt.amaralsoftware.application.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "cat_config")
public class CatConfigEntity extends PanacheEntityBase implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String module;
    private String configuration;

    public CatConfigEntity() {
    }

    public CatConfigEntity(String module, String configuration) {
        this.module = module;
        this.configuration = configuration;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }
}
