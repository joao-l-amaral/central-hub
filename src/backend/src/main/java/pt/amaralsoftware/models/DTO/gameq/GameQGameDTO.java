package pt.amaralsoftware.models.DTO.gameq;

public class GameQGameDTO {
    private String name;
    private String releaseYear;
    private String communityRating;
    private String platform;
    private String esrb;
    private String developer;
    private String publisher;

    public GameQGameDTO() {
    }

    public GameQGameDTO(String name, String platform) {
        this.name = name;
        this.platform = platform;
    }

    public GameQGameDTO(String name, String releaseYear, String communityRating, String platform, String esrb, String developer, String publisher) {
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
}
