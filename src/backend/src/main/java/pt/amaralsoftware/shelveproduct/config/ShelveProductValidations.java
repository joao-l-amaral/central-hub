package pt.amaralsoftware.shelveproduct.config;

import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.shelveproduct.model.dto.ShelveProductDTO;
import pt.amaralsoftware.shelveproduct.service.ShelveProductService;
import pt.amaralsoftware.shared.util.NtfyUtils;

import java.util.List;

@ApplicationScoped
public class ShelveProductValidations {

    private static final Logger log = LoggerFactory.getLogger(ShelveProductValidations.class);

    @Inject
    ShelveProductService shelveProductService;
    @Inject
    NtfyUtils ntfyUtils;

    @Scheduled(cron = "0 0 12 ? * 1")
    public void checkExpirationDate() {
        log.info("Verifying expired products and near expiration date.");

        StringBuilder sb = new StringBuilder();

        List<ShelveProductDTO> shelveProductsByCodeNearExpirationOrExpired = this.shelveProductService.getShelveProductsByCodeNearExpiration();

        if(CollectionUtils.isNotEmpty(shelveProductsByCodeNearExpirationOrExpired)) {
            sb.append("ATTENTION\n The following products may be expired or nearing expiration.\n");

            for(ShelveProductDTO product: shelveProductsByCodeNearExpirationOrExpired) {
                String shelveProduct = String.format("%s - %s", product.getName());
                sb.append(shelveProduct).append("\n");
            }

            this.ntfyUtils.send(sb.toString());
        }

        log.info("All the products seems to be ok.");
    }

    @Scheduled(cron = "0 0 12 L * ?")
    public void generateReport() {
        log.info("Generating report and sending file.");

        StringBuilder sb = new StringBuilder();

        sb.append("Name,ProductId,Code,ExpiryDate,InsertDate\n");

        List<ShelveProductDTO> shelveProducts = this.shelveProductService.getShelveProducts();

        for (ShelveProductDTO shelveProductDTO : shelveProducts) {
            String product = String.format(
                    "%s,%s,%s,%s,%s",
                    shelveProductDTO.getName(),
                    shelveProductDTO.getShelveCode(),
                    shelveProductDTO.getExpiryDate(),
                    shelveProductDTO.getDate()
            );
            sb.append(product).append("\n");
        }

        this.ntfyUtils.send(sb.toString());
    }
}
