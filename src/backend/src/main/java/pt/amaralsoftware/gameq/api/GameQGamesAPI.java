package pt.amaralsoftware.gameq.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.apache.commons.collections4.CollectionUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.clients.XboxApiClient;
import pt.amaralsoftware.gameq.models.GameQPlatform;
import pt.amaralsoftware.gameq.models.dto.GameDTO;
import pt.amaralsoftware.gameq.models.dto.GameQConfigurationDTO;
import pt.amaralsoftware.gameq.models.xboxApi.XboxApiResponse;
import pt.amaralsoftware.core.modules.processor.models.Order;
import pt.amaralsoftware.gameq.modules.gameProcessor.GameProcessor;
import pt.amaralsoftware.gameq.service.CatDigitalStoresService;
import pt.amaralsoftware.gameq.service.CatGamePlatformService;
import pt.amaralsoftware.gameq.service.CatGameService;
import pt.amaralsoftware.shared.models.RemoteDataSourceResult;

import java.util.ArrayList;
import java.util.List;

@Path("/gameq")
public class GameQGamesAPI {
    private final Logger log = LoggerFactory.getLogger(GameQGamesAPI.class);

    @Inject
    CatGamePlatformService catGamePlatformService;
    @Inject
    CatDigitalStoresService catDigitalStoresService;
    @Inject
    CatGameService catGameService;
    @Inject
    GameProcessor gameProcessor;
    @Inject
    @RestClient
    XboxApiClient xboxApiClient;

    @ConfigProperty(name = "xbox.api.xuid")
    String xuid;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<GameQConfigurationDTO> getInitialSearchPlatformList() {
        log.info("Get initial search platform list");

        List<GameQPlatform> platforms = catGamePlatformService.getPlatforms();
        List<GameQPlatform> digitalStoresPlatforms = catDigitalStoresService.getDigitalStoresNames();

        List<GameQPlatform> mergedPlatforms = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(platforms)) {
            mergedPlatforms.addAll(platforms);
        }

        if (CollectionUtils.isNotEmpty(digitalStoresPlatforms)) {
            mergedPlatforms.addAll(digitalStoresPlatforms);
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
    @Path("/games")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<RemoteDataSourceResult<GameDTO>> getGameByPlatform(
            @QueryParam("platform") String platform,
            @QueryParam("page") @DefaultValue("0") Integer page,
            @QueryParam("pageSize") @DefaultValue("15") Integer pageSize,
            @QueryParam("sortOrder") String sortOrder
    ) {
        log.info("Get game by platform");

        if (page < 0 || pageSize <= 0 || pageSize > 100) {
            log.debug("Invalid request parameters for the games list");
            return RestResponse.status(RestResponse.Status.BAD_REQUEST);
        }

        Long totalGames = catGameService.getTotalGamesCount(platform);

        List<GameDTO> gamesDTO = catGameService.getGamesList(platform, page, pageSize, sortOrder);

        RemoteDataSourceResult<GameDTO> result = new RemoteDataSourceResult<>();
        result.setItems(gamesDTO);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setTotalCount(totalGames);

        return RestResponse.ok(result);
    }

    @GET
    @Path("/initialSearch")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<GameDTO>> getInitialSearch(@QueryParam("game") String searchGame) {
        log.info("Search data from the game: {}", searchGame);

        List<GameDTO> gamesListFromSearch = catGameService.getGamesListFromSearch(searchGame);
        return RestResponse.ok(gamesListFromSearch);
    }

    @GET
    @Path("/game/{game}")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<Order> getGameByName(@PathParam("game") String gameName) {
        Order restultOrder = this.gameProcessor.run(gameName);
        return RestResponse.ok(restultOrder);
    }

    @GET
    @Path("/xbox")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<XboxApiResponse> getStuff() {
        XboxApiResponse titlesByXuid = this.xboxApiClient.getTitleByXuid(xuid);
        return RestResponse.ok(titlesByXuid);
    }
}