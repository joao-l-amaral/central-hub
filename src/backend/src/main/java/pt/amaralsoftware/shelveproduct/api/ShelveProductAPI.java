package pt.amaralsoftware.shelveproduct.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.apache.commons.collections4.CollectionUtils;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.shelveproduct.config.ShelveProductValidations;
import pt.amaralsoftware.shelveproduct.model.dto.ShelveProductDTO;
import pt.amaralsoftware.shelveproduct.model.ProductCount;
import pt.amaralsoftware.shelveproduct.service.ShelveProductService;
import pt.amaralsoftware.shared.util.JSONSerializer;

import java.io.IOException;
import java.util.List;

@Path("/shelve")
public class ShelveProductAPI {
    private final Logger log = LoggerFactory.getLogger(ShelveProductAPI.class);

    @Inject
    ShelveProductService shelveProductService;
    @Inject
    ShelveProductValidations shelveProductValidations;

    @GET
    @Path("/productStatistics")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<ProductCount>> getShelveProductStatistics() {
        List<ProductCount> productStatistics = this.shelveProductService.getProductStatistics();
        return RestResponse.ok(productStatistics);
    }

    @POST
    @Path("/product")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<ShelveProductDTO> createProduct(String payload) {
        try {
            ShelveProductDTO shelveProductDTO = JSONSerializer.fromJSON(payload, ShelveProductDTO.class);

            this.shelveProductService.saveProduct(shelveProductDTO);

            return RestResponse.ok(shelveProductDTO);
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return RestResponse.serverError();
    }

    @GET
    @Path("/products")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<ShelveProductDTO>> getProduct() {

        List<ShelveProductDTO> shelveProducts = this.shelveProductService.getShelveProducts();

        if(CollectionUtils.isEmpty(shelveProducts)) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(shelveProducts);
    }

    @GET
    @Path("/product/{shelveCode}")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<ShelveProductDTO> getProductByShelveCode(@PathParam("shelveCode") String shelveCode) {
        ShelveProductDTO shelveProductDTOById = this.shelveProductService.getShelveProductDTOById(shelveCode);

        if(shelveProductDTOById == null) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(shelveProductDTOById);
    }

    @PATCH
    @Path("/product/{shelveCode}")
    public RestResponse<ShelveProductDTO> updateProduct(@PathParam("shelveCode") String shelveCode, String payload) {
        try {
            ShelveProductDTO shelveProductDTO = JSONSerializer.fromJSON(payload, ShelveProductDTO.class);

            ShelveProductDTO updatedShelveProduct = this.shelveProductService.updateShelveProduct(shelveCode, shelveProductDTO);

            return RestResponse.ok(updatedShelveProduct);
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return RestResponse.serverError();
    }

    @DELETE
    @Path("/product/{shelveCode}")
    public RestResponse<String> deleteProduct(@PathParam("shelveCode") String shelveCode) {

        this.shelveProductService.removeShelveCode(shelveCode);

        return RestResponse.ok();
    }

    @GET
    @Path("/forceExpirationVerification")
    public RestResponse<String> forceDatabaseLoad() {
        shelveProductValidations.checkExpirationDate();
        return RestResponse.ok("Expiration date check triggered.");
    }

    @GET
    @Path("/forceGenerateReport")
    public RestResponse<String> generateReport() {
        shelveProductValidations.generateReport();
        return RestResponse.ok("Expiration date check triggered.");
    }
}