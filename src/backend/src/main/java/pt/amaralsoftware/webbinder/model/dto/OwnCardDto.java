package pt.amaralsoftware.webbinder.model.dto;


public class OwnCardDto {
    private String id;
    private String localId;
    private String name;
    private String image;
    private String rarity;
    private String description;
    private String illustrator;
    private String[] types;
    private Boolean hasHolo;
    private Boolean hasNormal;
    private Boolean hasReverse;
    private String variant;
    private String setId;
    private Integer index;

    public OwnCardDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocalId() {
        return localId;
    }

    public void setLocalId(String localId) {
        this.localId = localId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRarity() {
        return rarity;
    }

    public void setRarity(String rarity) {
        this.rarity = rarity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIllustrator() {
        return illustrator;
    }

    public void setIllustrator(String illustrator) {
        this.illustrator = illustrator;
    }

    public String[] getTypes() {
        return types;
    }

    public void setTypes(String[] types) {
        this.types = types;
    }

    public Boolean getHasHolo() {
        return hasHolo;
    }

    public void setHasHolo(Boolean hasHolo) {
        this.hasHolo = hasHolo;
    }

    public Boolean getHasNormal() {
        return hasNormal;
    }

    public void setHasNormal(Boolean hasNormal) {
        this.hasNormal = hasNormal;
    }

    public Boolean getHasReverse() {
        return hasReverse;
    }

    public void setHasReverse(Boolean hasReverse) {
        this.hasReverse = hasReverse;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    public String getSetId() {
        return setId;
    }

    public void setSetId(String setId) {
        this.setId = setId;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}