package pt.amaralsoftware.shelveproduct.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.math.BigInteger;

@Entity
public class ProductCount implements Serializable {
    @Id
    private String barCode;
    private String productName;
    private Long productCount;
    private BigInteger calories;

    public ProductCount() {
    }

    public ProductCount(String productName, Long productCount, String barCode, BigInteger calories) {
        this.productName = productName;
        this.productCount = productCount;
        this.barCode = barCode;
        this.calories = calories;
    }

    public String getProductName() {
        return productName;
    }

    public Long getProductCount() {
        return productCount;
    }

    public BigInteger getCalories() {
        return calories;
    }

    public String getBarCode() {
        return barCode;
    }
}
