package pt.amaralsoftware.webbinder.model.dto;

public class VariantDto {
    private Boolean holo;
    private Boolean normal;
    private Boolean reverse;

    public VariantDto() {
    }

    public VariantDto(Boolean holo, Boolean normal, Boolean reverse) {
        this.holo = holo;
        this.normal = normal;
        this.reverse = reverse;
    }

    public Boolean getHolo() {
        return holo;
    }

    public void setHolo(Boolean holo) {
        this.holo = holo;
    }

    public Boolean getNormal() {
        return normal;
    }

    public void setNormal(Boolean normal) {
        this.normal = normal;
    }

    public Boolean getReverse() {
        return reverse;
    }

    public void setReverse(Boolean reverse) {
        this.reverse = reverse;
    }
}