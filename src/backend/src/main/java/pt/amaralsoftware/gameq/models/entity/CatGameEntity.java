
package pt.amaralsoftware.gameq.models.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "cat_game")
public class CatGameEntity extends PanacheEntityBase implements Serializable {
    @Id
    private String name;
    @Column(name="release_year")
    private String releaseYear;
    @Column(name="release_date")
    private String releaseDate;
    private String overview;
    @Column(name="max_players")
    private String maxPlayers;
    @Column(name="video_url")
    private String videoUrl;
    @Column(name="community_rating")
    private String communityRating;
    private String platform;
    private String esrb;
    private String developer;
    private String publisher;

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

    public String getReleaseYear() {
        return releaseYear;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getOverview() {
        return overview;
    }

    public String getMaxPlayers() {
        return maxPlayers;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public String getCommunityRating() {
        return communityRating;
    }

    public String getPlatform() {
        return platform;
    }

    public String getEsrb() {
        return esrb;
    }

    public String getDeveloper() {
        return developer;
    }

    public String getPublisher() {
        return publisher;
    }


}