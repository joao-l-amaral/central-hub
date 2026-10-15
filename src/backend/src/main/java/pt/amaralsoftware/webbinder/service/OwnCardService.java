package pt.amaralsoftware.webbinder.service;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import pt.amaralsoftware.webbinder.model.dto.CardDto;
import pt.amaralsoftware.webbinder.model.dto.OwnCardDto;
import pt.amaralsoftware.webbinder.model.entity.CardSetEntity;
import pt.amaralsoftware.webbinder.model.entity.OwnCardEntity;
import pt.amaralsoftware.webbinder.repository.CardSetRepository;
import pt.amaralsoftware.webbinder.repository.OwnCardRepository;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class OwnCardService {

    @Inject
    OwnCardRepository ownCardRepository;
    @Inject
    CardSetRepository cardSetRepository;
    
    public OwnCardDto getCardById(String id) {
        OwnCardEntity ownCardEntity = ownCardRepository.find("id = ?1", id).firstResult();

        if(ownCardEntity != null) {
            OwnCardDto ownCard = new OwnCardDto();
            ownCard.setId(ownCardEntity.getId());
            ownCard.setLocalId(ownCardEntity.getLocalId());
            ownCard.setName(ownCardEntity.getName());
            ownCard.setImage(ownCardEntity.getImage() + "/high.png");
            ownCard.setRarity(ownCardEntity.getRarity());
            ownCard.setDescription(ownCardEntity.getDescription());
            ownCard.setIllustrator(ownCardEntity.getIllustrator());
            ownCard.setTypes(ownCardEntity.getType());
            ownCard.setHasHolo(ownCardEntity.isHasHolo());
            ownCard.setHasNormal(ownCardEntity.isHasNormal());
            ownCard.setHasReverse(ownCardEntity.isHasReverse());
            ownCard.setVariant(ownCardEntity.getVariant());
            ownCard.setSetId(ownCardEntity.getSet().getId());
            ownCard.setIndex(ownCardEntity.getIndex());

            return ownCard;
        }

        return null;
    }

    @Transactional
    public OwnCardEntity saveCard(CardDto cardDto) {

        CardSetEntity cardSetEntity = cardSetRepository.find("id = ?1", cardDto.getSet().getId()).firstResult();

        OwnCardEntity ownPokemonEntity = new OwnCardEntity();
        ownPokemonEntity.setId(cardDto.getId());
        ownPokemonEntity.setLocalId(cardDto.getLocalId());
        ownPokemonEntity.setName(cardDto.getName());
        ownPokemonEntity.setImage(cardDto.getImage());
        ownPokemonEntity.setRarity(cardDto.getRarity());
        ownPokemonEntity.setDescription(cardDto.getDescription());
        ownPokemonEntity.setIllustrator(cardDto.getIllustrator());
        ownPokemonEntity.setType(new String[]{cardDto.getTypes()[0]});
        ownPokemonEntity.setHasHolo(cardDto.getVariants().getHolo());
        ownPokemonEntity.setHasNormal(cardDto.getVariants().getNormal());
        ownPokemonEntity.setHasReverse(cardDto.getVariants().getReverse());
        ownPokemonEntity.setSet(cardSetEntity);
        ownPokemonEntity.setIndex(cardDto.getIndex());
        ownCardRepository.persist(ownPokemonEntity);
        return ownPokemonEntity;
    }

    public List<OwnCardDto> getOwnedCards() {
        List<OwnCardEntity> ownCardsList = ownCardRepository.findAll(Sort.by("index", Sort.Direction.Ascending)).list();

        List<OwnCardDto> ownCards = new ArrayList<>();

        for (OwnCardEntity ownCardEntity : ownCardsList) {
            OwnCardDto ownCard = new OwnCardDto();
            ownCard.setId(ownCardEntity.getId());
            ownCard.setLocalId(ownCardEntity.getLocalId());
            ownCard.setName(ownCardEntity.getName());
            ownCard.setImage(ownCardEntity.getImage() + "/high.png");
            ownCard.setRarity(ownCardEntity.getRarity());
            ownCard.setDescription(ownCardEntity.getDescription());
            ownCard.setIllustrator(ownCardEntity.getIllustrator());
            ownCard.setTypes(ownCardEntity.getType());
            ownCard.setHasHolo(ownCardEntity.isHasHolo());
            ownCard.setHasNormal(ownCardEntity.isHasNormal());
            ownCard.setHasReverse(ownCardEntity.isHasReverse());
            ownCard.setVariant(ownCardEntity.getVariant());
            ownCard.setSetId(ownCardEntity.getSet().getId());
            ownCard.setIndex(ownCardEntity.getIndex());

            ownCards.add(ownCard);
        }

        return ownCards;
    }
}