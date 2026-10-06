package pt.amaralsoftware.webbinder.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;

@Entity
@Table(name = "cat_own_pokemon", schema = "\"Card_Collection\"")
public class OwnPokemonEntity implements Serializable {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image", columnDefinition = "text")
    private String image;

    @Column(name = "rarity", length = 100)
    private String rarity;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "type", columnDefinition = "text[]")
    private String[] type;

    @Column(name = "has_holo", nullable = false)
    private boolean hasHolo = false;

    @Column(name = "has_normal", nullable = false)
    private boolean hasNormal = false;

    @Column(name = "has_reverse", nullable = false)
    private boolean hasReverse = false;

    @Column(name = "description", columnDefinition = "text")
    private String description;

    @Column(name = "variant", length = 100)
    private String variant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "family", referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_own_pokemon_family"))
    private CardFamilyEntity family;

    @Column(name = "local_id", length = 50)
    private String localId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id", referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_own_pokemon_set"))
    private CardSetEntity set;

    public OwnPokemonEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getRarity() { return rarity; }
    public void setRarity(String rarity) { this.rarity = rarity; }

    public String[] getType() { return type; }
    public void setType(String[] type) { this.type = type; }

    public boolean isHasHolo() { return hasHolo; }
    public void setHasHolo(boolean hasHolo) { this.hasHolo = hasHolo; }

    public boolean isHasNormal() { return hasNormal; }
    public void setHasNormal(boolean hasNormal) { this.hasNormal = hasNormal; }

    public boolean isHasReverse() { return hasReverse; }
    public void setHasReverse(boolean hasReverse) { this.hasReverse = hasReverse; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }

    public CardFamilyEntity getFamily() { return family; }
    public void setFamily(CardFamilyEntity family) { this.family = family; }

    public String getLocalId() { return localId; }
    public void setLocalId(String localId) { this.localId = localId; }

    public CardSetEntity getSet() { return set; }
    public void setSet(CardSetEntity set) { this.set = set; }
}