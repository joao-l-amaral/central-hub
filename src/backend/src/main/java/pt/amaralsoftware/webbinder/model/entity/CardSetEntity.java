package pt.amaralsoftware.webbinder.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "cat_set", schema = "\"Card_Collection\"")
public class CardSetEntity implements Serializable {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "logo", columnDefinition = "text")
    private String logo;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "symbol", columnDefinition = "text")
    private String symbol;

    public CardSetEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
}