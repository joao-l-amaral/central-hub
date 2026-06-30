package pt.amaralsoftware.models.configuration;

public class Remotes {
    private String name;
    private String url;
    private String title;

    public Remotes(String name, String url, String title) {
        this.name = name;
        this.url = url;
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}