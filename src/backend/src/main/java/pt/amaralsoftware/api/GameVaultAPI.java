package pt.amaralsoftware.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.config.LoadGameDatabaseSchedule;
import pt.amaralsoftware.models.DTO.gamevault.GameVaultPlatformDTO;
import pt.amaralsoftware.models.RemoteDataSourceResult;
import pt.amaralsoftware.models.configuration.GameVaultConfiguration;
import pt.amaralsoftware.service.CatConfigService;
import pt.amaralsoftware.service.CatGamePlatformService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class DummyResponse {
    private String name;
    private Integer age;
    private String role;
    private String function;

    public DummyResponse(String name, Integer age, String role, String function) {
        this.name = name;
        this.age = age;
        this.role = role;
        this.function = function;
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

@Path("/games")
public class GameVaultAPI {
    private final Logger log = LoggerFactory.getLogger(GameVaultAPI.class);

    @Inject
    LoadGameDatabaseSchedule loadGameDatabaseSchedule;
    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatConfigService catConfigService;

    @GET
    @Path("/forceLoadGameVaultDatabase")
    public RestResponse<String> forceDatabaseLoad() {
        loadGameDatabaseSchedule.init();
        return RestResponse.ok("Data base sync forcefully loaded.");
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

    @GET
    @Path("/listOfPlatforms")
    public RestResponse<GameVaultPlatformDTO> getPlatforms() {
        log.debug("Get the list of platforms");

        GameVaultPlatformDTO platforms = catGamePlatformService.getPlatformNames();

        if(platforms == null) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(platforms);
    }

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
    public RestResponse<RemoteDataSourceResult<DummyResponse>> test() {
        List<DummyResponse> dummyResponses = new ArrayList<>(
            Arrays.asList(
                new DummyResponse("Chris", 22, "Author", "Manager"),
                new DummyResponse("Dennis", 45, "Reviewer", "Lead"),
                new DummyResponse("Alice", 38, "Developer", "Senior"),
                new DummyResponse("Bob", 35, "QA", "Team Lead"),
                new DummyResponse("Eve", 28, "Designer", "Specialist"),
                new DummyResponse("Frank", 52, "Architect", "Director"),
                new DummyResponse("Grace", 31, "Developer", "Senior"),
                new DummyResponse("Henry", 29, "DevOps", "Engineer"),
                new DummyResponse("Ivy", 26, "Intern", "Junior"),
                new DummyResponse("Jack", 41, "Manager", "Director")
            )
        );

        RemoteDataSourceResult<DummyResponse> dummyResponseRemoteDataSourceResult = new RemoteDataSourceResult<>();
        dummyResponseRemoteDataSourceResult.setItems(dummyResponses);
        dummyResponseRemoteDataSourceResult.setPage(0);
        dummyResponseRemoteDataSourceResult.setPageSize(10);
        dummyResponseRemoteDataSourceResult.setTotalCount(Long.valueOf(dummyResponses.size()));


        return RestResponse.ok(dummyResponseRemoteDataSourceResult);
    }
}