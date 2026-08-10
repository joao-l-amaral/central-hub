package pt.amaralsoftware.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.apache.commons.collections4.CollectionUtils;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.config.LoadGameDatabaseSchedule;
import pt.amaralsoftware.models.RemoteDataSourceResult;
import pt.amaralsoftware.models.DTO.gameq.GameQConfigurationDTO;
import pt.amaralsoftware.models.gameq.GameQPlatform;
import pt.amaralsoftware.models.gameq.GameVaultConfiguration;
import pt.amaralsoftware.service.CatConfigService;
import pt.amaralsoftware.service.CatDigitalPcStoresService;
import pt.amaralsoftware.service.CatGamePlatformService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class DummyResponse {
    private String id;
    private String name;
    private Integer age;
    private String role;
    private String function;

    public DummyResponse(String id, String name, Integer age, String role, String function) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.role = role;
        this.function = function;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }
}

@Path("/gameq")
public class GameVaultAPI {
    private final Logger log = LoggerFactory.getLogger(GameVaultAPI.class);

    @Inject
    LoadGameDatabaseSchedule loadGameDatabaseSchedule;
    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatConfigService catConfigService;
    @Inject
    CatDigitalPcStoresService catDigitalPcStoresService;

    @GET
    @Path("/forceLoadGameVaultDatabase")
    public RestResponse<String> forceDatabaseLoad() {
        loadGameDatabaseSchedule.init();
        return RestResponse.ok("Data base sync forcefully loaded.");
    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<GameQConfigurationDTO> getRoot() {
        List<GameQPlatform> platforms = catGamePlatformService.getPlatformNames();
        List<GameQPlatform> pcDigitalStoresPlatforms = catDigitalPcStoresService.getPCDigitalStoresNames();

        List<GameQPlatform> mergedPlatforms = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(platforms)) {
            mergedPlatforms.addAll(platforms);
        }

        if (CollectionUtils.isNotEmpty(pcDigitalStoresPlatforms)) {
            mergedPlatforms.addAll(pcDigitalStoresPlatforms);
        }

        mergedPlatforms.sort(java.util.Comparator.comparing(
                p -> p.getPlatformName() == null ? "" : p.getPlatformName(),
                String.CASE_INSENSITIVE_ORDER
        ));

        GameQConfigurationDTO gameQConfigurationDTO = new GameQConfigurationDTO();
        gameQConfigurationDTO.setPlatforms(mergedPlatforms);

        return RestResponse.ok(gameQConfigurationDTO);
    }

    @GET
    @Path("/configuration")
    public RestResponse<GameVaultConfiguration> getConfiguration() {
        log.debug("Get video game vault configuration");

        try {
            GameVaultConfiguration gameVaultConfiguration = catConfigService.getVideoGameConfig();
            return RestResponse.ok(gameVaultConfiguration);
        } catch (IOException e) {
            log.error("Error getting video game config. {}", e.getMessage());
        }
        return RestResponse.noContent();
    }

    /* @GET
    @Path("/listOfPlatforms")
    @Deprecated
    public RestResponse<GameVaultPlatformDTO> getPlatforms() {
        log.debug("Get the list of platforms");

        GameVaultPlatformDTO platforms = catGamePlatformService.getPlatformNamesOld();

        if(platforms == null) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(platforms);
    } */

    @PATCH
    @Path("/updatePlatforms")
    public RestResponse<String> updatePlatforms(String payload) {

        try {
            catGamePlatformService.updatePlatforms(payload);
        } catch (IOException e) {
            log.error("Error updating platforms. {}", e.getMessage());
        }

        return RestResponse.ok();
    }

    @PUT
    @Path("/updatePlatformConfiguration")
    public RestResponse<String> updatePlatformConfiguration(String payload) {
        catConfigService.updateGameVaultConfiguration(payload);

        return RestResponse.ok();
    }

    @GET
    @Path("/test")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<RemoteDataSourceResult<DummyResponse>> test(
        @QueryParam("search") String search,
        @QueryParam("page") Integer page,
        @QueryParam("pageSize") Integer pageSize
    ) {
        List<DummyResponse> dummyResponses = new ArrayList<>(
            Arrays.asList(
                new DummyResponse("11", "Chris", 22, "Author", "Manager"),
                new DummyResponse("12", "Dennis", 45, "Reviewer", "Lead"),
                new DummyResponse("13", "Alice", 38, "Developer", "Senior"),
                new DummyResponse("14", "Bob", 35, "QA", "Team Lead"),
                new DummyResponse("15", "Eve", 28, "Designer", "Specialist"),
                new DummyResponse("16", "Frank", 52, "Architect", "Director"),
                new DummyResponse("17", "Grace", 31, "Developer", "Senior"),
                new DummyResponse("18", "Henry", 29, "DevOps", "Engineer"),
                new DummyResponse("19", "Ivy", 26, "Intern", "Junior"),
                new DummyResponse("20", "Jack", 41, "Manager", "Director"),
                new DummyResponse("21", "Chris1", 22, "Author", "Manager"),
                new DummyResponse("22", "Dennis2", 45, "Reviewer", "Lead"),
                new DummyResponse("23", "Alice3", 38, "Developer", "Senior"),
                new DummyResponse("24", "Bob4", 35, "QA", "Team Lead"),
                new DummyResponse("25", "Eve5", 28, "Designer", "Specialist"),
                new DummyResponse("26", "Frank6", 52, "Architect", "Director"),
                new DummyResponse("27", "Grace7", 31, "Developer", "Senior"),
                new DummyResponse("28", "Henry8", 29, "DevOps", "Engineer"),
                new DummyResponse("29", "Ivy9", 26, "Intern", "Junior"),
                new DummyResponse("30", "Jack10", 41, "Manager", "Director")
            )
        );

        // apply search filter: include only items whose name starts with the search text
        if (search != null && !search.trim().isEmpty()) {
            final String lowerSearch = search.trim().toLowerCase();
            dummyResponses = dummyResponses.stream()
                .filter(d -> d.getName() != null && d.getName().toLowerCase().startsWith(lowerSearch))
                .collect(Collectors.toList());
        }

        int resolvedPage = page != null ? page : 1;
        int resolvedPageSize = pageSize != null ? pageSize : dummyResponses.size();

        int fromIndex = Math.min((resolvedPage - 1) * resolvedPageSize, dummyResponses.size());
        int toIndex = Math.min(resolvedPage * resolvedPageSize, dummyResponses.size());

        List<DummyResponse> dummyResponsesList = dummyResponses.subList(fromIndex, toIndex);

        RemoteDataSourceResult<DummyResponse> dummyResponseRemoteDataSourceResult = new RemoteDataSourceResult<>();
        dummyResponseRemoteDataSourceResult.setItems(dummyResponsesList);
        dummyResponseRemoteDataSourceResult.setPage(resolvedPage);
        dummyResponseRemoteDataSourceResult.setPageSize(resolvedPageSize);
        dummyResponseRemoteDataSourceResult.setTotalCount((long) dummyResponses.size());

        return RestResponse.ok(dummyResponseRemoteDataSourceResult);
    }

    @POST
    @Path("/test")
    public RestResponse deleteTest() {
        return RestResponse.ok();
    }
}