package pt.amaralsoftware.webbinder.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import pt.amaralsoftware.webbinder.model.dto.SetDto;
import pt.amaralsoftware.webbinder.model.entity.CardSetEntity;
import pt.amaralsoftware.webbinder.repository.CardSetRepository;

import java.util.List;

@ApplicationScoped
public class CardSetService {

    @Inject
    CardSetRepository cardSetRepository;

    public void insertSetList(List<SetDto> setDtoList) {
        setDtoList.forEach(this::createCardSet);
    }

    @Transactional
    public void createCardSet(SetDto setDto) {
        String id = setDto.getId();
        CardSetEntity cardSetEntity = cardSetRepository.find("id = ?1", id).firstResult();

        if(cardSetEntity == null) {
            cardSetEntity = new CardSetEntity();
            cardSetEntity.setId(id);
            cardSetEntity.setName(setDto.getName());
            cardSetEntity.setLogo(setDto.getLogo());
            cardSetEntity.setSymbol(setDto.getSymbol());
            cardSetEntity.setSize(setDto.getTotalCards());
            cardSetRepository.persist(cardSetEntity);
        }
    }

    public String getSetIdBySetSize(String setSize) {
        CardSetEntity cardSetEntity = cardSetRepository.find("size = ?1", setSize).firstResult();
        return cardSetEntity.getId();
    }

}