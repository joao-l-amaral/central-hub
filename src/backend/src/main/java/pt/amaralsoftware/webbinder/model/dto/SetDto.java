package pt.amaralsoftware.webbinder.model.dto;

public class SetDto {
    private String id;
    private String name;
    private String logo;
    private String symbol;
    private Integer totalCards;

    public SetDto() {
    }

    public SetDto(String id, String name, String logo, String symbol, Integer totalCards) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.symbol = symbol;
        this.totalCards = totalCards;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Integer getTotalCards() {
        return totalCards;
    }

    public void setTotalCards(Integer totalCards) {
        this.totalCards = totalCards;
    }
}