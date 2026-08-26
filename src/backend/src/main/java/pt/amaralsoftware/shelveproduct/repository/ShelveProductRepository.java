package pt.amaralsoftware.shelveproduct.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import pt.amaralsoftware.shelveproduct.model.ProductCount;
import pt.amaralsoftware.shelveproduct.model.entity.CatShelveProductEntity;

import java.util.List;

@ApplicationScoped
public class ShelveProductRepository implements PanacheRepository<CatShelveProductEntity> {

    @Inject
    EntityManager em;

    public List<ProductCount> findGroupedProductSummaries() {

        String query = """
                SELECT MIN(product_name) AS product_name, COUNT(bar_code) AS product_count, bar_code, SUM(calories) as calories
                FROM cat_shelve_products
                GROUP BY bar_code;
                """;

        return em.createNativeQuery(query, ProductCount.class).getResultList();
    }

}