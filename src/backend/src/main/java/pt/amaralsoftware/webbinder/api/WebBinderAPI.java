package pt.amaralsoftware.webbinder.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import net.tcgdex.sdk.TCGdex;
import net.tcgdex.sdk.models.Card;
import net.tcgdex.sdk.models.SetResume;
import org.apache.commons.collections4.CollectionUtils;
import org.jboss.resteasy.reactive.RestResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pt.amaralsoftware.shared.util.JSONSerializer;
import pt.amaralsoftware.webbinder.model.dto.CardDto;
import pt.amaralsoftware.webbinder.model.dto.OwnCardDto;
import pt.amaralsoftware.webbinder.model.dto.SetDto;
import pt.amaralsoftware.webbinder.model.dto.VariantDto;
import pt.amaralsoftware.webbinder.model.entity.OwnCardEntity;
import pt.amaralsoftware.webbinder.service.CardSetService;
import pt.amaralsoftware.webbinder.service.OwnCardService;
import pt.amaralsoftware.webbinder.service.TcgDexService;

import java.util.Arrays;
import java.util.List;

@Path("/binder")
public class WebBinderAPI {
    private final Logger log = LoggerFactory.getLogger(WebBinderAPI.class);

    @Inject
    CardSetService cardSetService;
    @Inject
    OwnCardService ownCardService;
    @Inject
    TcgDexService tcgDexService;
    @Inject
    TCGdex tcgdex;

    @GET
    @Path("/search/{cardSetNumber}/{setSize}")
    public RestResponse<CardDto> searchCard(
            @PathParam("cardSetNumber") String cardSetNumber,
            @PathParam("setSize") String setSize
    ) {
        String setIdBySetSize = cardSetService.getSetIdBySetSize(setSize);

        Card card = tcgDexService.searchCard(setIdBySetSize, cardSetNumber)
                .orElse(null);

        if(card == null) {
            return RestResponse.notFound();
        }

        Integer pokedexNumber = card.getDexId() != null ? card.getDexId().getFirst() : null;

        CardDto dto = new CardDto(
                card.getId(),
                card.getLocalId(),
                card.getName(),
                card.getImage(),
                card.getRarity(),
                card.getDescription(),
                card.getIllustrator(),
                new VariantDto(
                        card.getVariants().getNormal() != null ? card.getVariants().getNormal() : false,
                        card.getVariants().getReverse() != null ? card.getVariants().getReverse() : false,
                        card.getVariants().getHolo() != null ? card.getVariants().getHolo() : false
                ),
                card.getTypes() == null ? null : card.getTypes().toArray(new String[0]),
                new SetDto(
                        card.getSet().getId(),
                        card.getSet().getName(),
                        card.getSet().getLogo(),
                        card.getSet().getSymbol(),
                        card.getSet().getCardCount().getTotal()
                ),
                pokedexNumber
        );

        return RestResponse.ok(dto);
    }

    @GET
    @Path("/sets")
    public RestResponse fetchSets() {
        SetResume[] setResumes = tcgdex.fetchSets();

        List<SetDto> sets = Arrays.stream(setResumes)
                .map(setResume -> new SetDto(
                        setResume.getId(),
                        setResume.getName(),
                        setResume.getLogo(),
                        setResume.getSymbol(),
                        setResume.getCardCount().getOfficial()))
                .toList();

        if(CollectionUtils.isEmpty(sets)) {
            return RestResponse.noContent();
        }

        cardSetService.insertSetList(sets);

        return RestResponse.ok();
    }

    @POST
    @Produces("application/json")
    @Path("/add")
    public RestResponse<OwnCardEntity> saveCard(String payload) {

        try {
            CardDto cardDto = JSONSerializer.fromJSON(payload, CardDto.class);
            SetDto set = cardDto.getSet();

            cardSetService.createCardSet(set);

            OwnCardEntity ownPokemonEntity = ownCardService.saveCard(cardDto);

            return RestResponse.ok(ownPokemonEntity);

        } catch (Exception e) {
            log.error("Error parsing JSON payload: {}", e.getMessage());
        }

        return RestResponse.serverError();
    }

    @GET
    @Path("/own")
    public String getOwnedCard() {
        return "Hello from WebBinderAPI!";
    }

    @GET
    @Path("/own/search/{cardSetNumber}/{setSize}")
    public RestResponse<OwnCardDto> searchOwnedCard(
            @PathParam("cardSetNumber") String cardSetNumber,
            @PathParam("setSize") String setSize
    ) {
        String id = cardSetNumber.concat("-").concat(setSize);
        OwnCardDto cardById = ownCardService.getCardById(id);

        if(cardById == null) {
            RestResponse.noContent();
        }

        return RestResponse.ok(cardById);
    }


    @GET
    @Path("/own/all")
    public RestResponse<List<OwnCardDto>> getAllOwnedCard() {
        List<OwnCardDto> ownedCards = ownCardService.getOwnedCards();

        if(CollectionUtils.isEmpty(ownedCards)) {
            return RestResponse.noContent();
        }

        return RestResponse.ok(ownedCards);
    }


}
