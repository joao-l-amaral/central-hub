package pt.amaralsoftware.gameq.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.apache.commons.collections4.CollectionUtils;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.gameq.models.GameQPlatform;
import pt.amaralsoftware.gameq.models.dto.GameQConfigurationDTO;
import pt.amaralsoftware.gameq.models.dto.GameQGameDTO;
import pt.amaralsoftware.gameq.service.CatDigitalPcStoresService;
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
    CatDigitalPcStoresService catDigitalPcStoresService;
    @Inject
    CatGameService catGameService;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<GameQConfigurationDTO> getInitialSearchPlatformList() {
        log.info("Get initial search platform list");

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
    @Path("/games")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<RemoteDataSourceResult<GameQGameDTO>> getGameByPlatform(
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

        List<GameQGameDTO> gamesDTO = catGameService.getGamesList(platform, page, pageSize, sortOrder);

        RemoteDataSourceResult<GameQGameDTO> result = new RemoteDataSourceResult<>();
        result.setItems(gamesDTO);
        result.setPage(page);
        result.setPageSize(pageSize);
        result.setTotalCount(totalGames);

        return RestResponse.ok(result);
    }

    @GET
    @Path("/initialSearch")
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<List<GameQGameDTO>> getInitialSearch(@QueryParam("game") String searchGame) {
        log.info("Search data from the game: {}", searchGame);

        List<GameQGameDTO> gamesListFromSearch = catGameService.getGamesListFromSearch(searchGame);
        return RestResponse.ok(gamesListFromSearch);
    }

}