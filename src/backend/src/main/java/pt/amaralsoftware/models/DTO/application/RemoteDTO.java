package pt.amaralsoftware.models.DTO.application;

public class RemoteDTO {
    private String name;
    private String url;
    private String title;

    public RemoteDTO(String name, String url, String title) {
        this.name = name;
        this.url = url;
        this.title = title;
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
}
