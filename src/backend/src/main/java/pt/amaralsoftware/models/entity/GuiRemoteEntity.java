package pt.amaralsoftware.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "gui_remote")
public class GuiRemoteEntity extends PanacheEntityBase implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;
    private String url;
    private String title;
    private Boolean enable;

    public GuiRemoteEntity() {
    }

    public GuiRemoteEntity(String name, String url, String title, Boolean enable) {
         this.name = name;
         this.url = url;
         this.title = title;
         this.enable = enable;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getEnable() {
        return enable;
    }
}
