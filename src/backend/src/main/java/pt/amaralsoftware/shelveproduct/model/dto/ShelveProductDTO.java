package pt.amaralsoftware.shelveproduct.model.dto;

public class ShelveProductDTO {
    private String name;
    private String barCode;
    private String shelveCode;
    private String expiryDate;
    private String date;
    private Integer calories;
    private Integer weight;

    public ShelveProductDTO() {
    }

    public ShelveProductDTO(
            String name,
            String barCode,
            String shelveCode,
            String expiryDate,
            String date,
            Integer calories,
            Integer weight
    ) {
        this.name = name;
        this.barCode = barCode;
        this.shelveCode = shelveCode;
        this.expiryDate = expiryDate;
        this.date = date;
        this.calories = calories;
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getShelveCode() {
        return shelveCode;
    }

    public void setShelveCode(String shelveCode) {
        this.shelveCode = shelveCode;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }
}