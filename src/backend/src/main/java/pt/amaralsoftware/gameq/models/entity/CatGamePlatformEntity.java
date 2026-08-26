
package pt.amaralsoftware.gameq.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "cat_game_platform")
public class CatGamePlatformEntity extends PanacheEntityBase implements Serializable {
    @Id
    private String name;
    private String releaseDate;
    private String developer;
    private String manufacturer;
    private String cpu;
    private String memory;
    private String graphics;
    private String sound;
    private String display;
    private String notes;
    private String media;
    private String maxControllers;
    @Column(name ="is_to_import")
    private Boolean isToImport;

    public CatGamePlatformEntity() {
    }

    public CatGamePlatformEntity(String name, String releaseDate, String developer, String manufacturer, String cpu, String memory, String graphics, String sound, String display, String notes, String media, String maxControllers, Boolean isToImport) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.developer = developer;
        this.manufacturer = manufacturer;
        this.cpu = cpu;
        this.memory = memory;
        this.graphics = graphics;
        this.sound = sound;
        this.display = display;
        this.notes = notes;
        this.media = media;
        this.maxControllers = maxControllers;
        this.isToImport = isToImport;
    }

    public String getName() {
        return name;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getDeveloper() {
        return developer;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public String getCpu() {
        return cpu;
    }

    public String getMemory() {
        return memory;
    }

    public String getGraphics() {
        return graphics;
    }

    public String getSound() {
        return sound;
    }

    public String getDisplay() {
        return display;
    }

    public String getNotes() {
        return notes;
    }

    public String getMedia() {
        return media;
    }

    public String getMaxControllers() {
        return maxControllers;
    }

    public Boolean getToImport() {
        return isToImport;
    }

    public void setToImport(Boolean toImport) {
        isToImport = toImport;
    }
}