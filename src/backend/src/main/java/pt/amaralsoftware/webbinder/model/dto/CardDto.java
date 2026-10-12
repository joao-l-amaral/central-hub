package pt.amaralsoftware.webbinder.model.dto;

import java.io.Serializable;

public class CardDto implements Serializable {
    private String id;
    private String localId;
    private String name;
    private String image;
    private String rarity;
    private String description;
    private String illustrator;
    private VariantDto variants;
    private String[] types;
    private SetDto set;
    private Integer index;

    public CardDto() {
    }

    public CardDto(String id, String localId, String name, String image, String rarity, String description, String illustrator, VariantDto variants, String[] types, SetDto set, Integer index) {
        this.id = id;
        this.localId = localId;
        this.name = name;
        this.image = image;
        this.rarity = rarity;
        this.description = description;
        this.illustrator = illustrator;
        this.variants = variants;
        this.types = types;
        this.set = set;
        this.index = index;
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

    public VariantDto getVariants() {
        return variants;
    }

    public void setVariants(VariantDto variants) {
        this.variants = variants;
    }

    public String[] getTypes() {
        return types;
    }

    public void setTypes(String[] types) {
        this.types = types;
    }

    public SetDto getSet() {
        return set;
    }

    public void setSet(SetDto set) {
        this.set = set;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}