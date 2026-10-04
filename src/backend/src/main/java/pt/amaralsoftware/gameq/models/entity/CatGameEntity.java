
package pt.amaralsoftware.gameq.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "cat_game")
public class CatGameEntity extends PanacheEntityBase implements Serializable {

    @Id
    private String name;
    @Column(name = "release_year")
    private String releaseYear;
    @Column(name = "release_date")
    private String releaseDate;
    private String overview;
    @Column(name = "max_players")
    private String maxPlayers;
    @Column(name = "video_url")
    private String videoUrl;
    @Column(name = "community_rating")
    private String communityRating;
    private String platform;
    private String esrb;
    private String developer;
    private String publisher;
    @Column(name = "title_id")
    private String titleId;
    @Column(name = "display_image")
    private String displayImage;

    @OneToOne(mappedBy = "game", fetch = FetchType.EAGER)
    private CatOwnGameEntity ownGame;

    public CatGameEntity() {
    }

    public CatGameEntity(String name, String releaseYear, String communityRating, String platform, String esrb, String developer, String publisher) {
        this.name = name;
        this.releaseYear = releaseYear;
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

    public String getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(String releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(String maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
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

    public CatOwnGameEntity getOwnGame() {
        return ownGame;
    }

    public void setOwnGame(CatOwnGameEntity ownGame) {
        this.ownGame = ownGame;
    }

    public String getTitleId() {
        return titleId;
    }

    public void setTitleId(String titleId) {
        this.titleId = titleId;
    }

    public String getDisplayImage() {
        return displayImage;
    }

    public void setDisplayImage(String displayImage) {
        this.displayImage = displayImage;
    }
}