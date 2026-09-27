package pt.amaralsoftware.gameq.models.dto;

import java.io.Serializable;

public class PlatformDTO implements Serializable {
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

    public PlatformDTO() {
    }

    public PlatformDTO(String name, String releaseDate, String developer, String manufacturer, String cpu, String memory, String graphics, String sound, String display, String notes, String media, String maxControllers) {
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
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public String getMemory() {
        return memory;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }

    public String getGraphics() {
        return graphics;
    }

    public void setGraphics(String graphics) {
        this.graphics = graphics;
    }

    public String getSound() {
        return sound;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public String getMaxControllers() {
        return maxControllers;
    }

    public void setMaxControllers(String maxControllers) {
        this.maxControllers = maxControllers;
    }
}
