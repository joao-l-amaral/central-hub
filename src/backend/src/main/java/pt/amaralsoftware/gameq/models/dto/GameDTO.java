package pt.amaralsoftware.gameq.models.dto;

import java.io.Serializable;
import java.time.ZonedDateTime;

public class GameDTO implements Serializable {
    private String name;
    private Integer releaseYear;
    private String communityRating;
    private String platform;
    private String platformIcon;
    private String esrb;
    private String developer;
    private String publisher;
    private String overview;
    private Integer maxPlayers;
    private String videoUrl;
    private Boolean isComplete;
    private String digitalPCStore;
    private ZonedDateTime dateOfFinish;
    private String cooperationName;
    private String website;

    public GameDTO() {
    }

    public GameDTO(String name, Integer releaseYear, String overview, Integer maxPlayers, String videoUrl, String communityRating, String platform, String esrb, String developer, String publisher) {
        this.name = name;
        this.releaseYear = releaseYear;
        this.overview = overview;
        this.maxPlayers = maxPlayers;
        this.videoUrl = videoUrl;
        this.communityRating = communityRating;
        this.platform = platform;
        this.esrb = esrb;
        this.developer = developer;
        this.publisher = publisher;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getCommunityRating() {
        return communityRating;
    }

    public void setCommunityRating(String communityRating) {
        this.communityRating = communityRating;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getPlatformIcon() {
        return platformIcon;
    }

    public void setPlatformIcon(String platformIcon) {
        this.platformIcon = platformIcon;
    }

    public String getEsrb() {
        return esrb;
    }

    public void setEsrb(String esrb) {
        this.esrb = esrb;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public Integer getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(Integer maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public Boolean getComplete() {
        return isComplete;
    }

    public void setComplete(Boolean complete) {
        isComplete = complete;
    }

    public String getDigitalPCStore() {
        return digitalPCStore;
    }

    public void setDigitalPCStore(String digitalPCStore) {
        this.digitalPCStore = digitalPCStore;
    }

    public ZonedDateTime getDateOfFinish() {
        return dateOfFinish;
    }

    public void setDateOfFinish(ZonedDateTime dateOfFinish) {
        this.dateOfFinish = dateOfFinish;
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
