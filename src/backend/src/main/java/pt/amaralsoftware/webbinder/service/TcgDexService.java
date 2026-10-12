package pt.amaralsoftware.webbinder.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import net.tcgdex.sdk.TCGdex;
import net.tcgdex.sdk.models.Card;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@ApplicationScoped
public class TcgDexService {
    private final Logger log = LoggerFactory.getLogger(TcgDexService.class);

    @Inject
    TCGdex tcgdex;

    public Optional<Card> searchCard(String setId, String cardNumber) {
        for (String candidate : localIdCandidates(cardNumber)) {
            String id = setId + "-" + candidate;
            try {
                Card card = tcgdex.fetchCard(id);
                if (card != null) {
                    return Optional.of(card);
                }
            } catch (Exception e) {
                log.debug("Card {} not found: {}", id, e.getMessage());
            }
        }
        log.warn("No card found for set {}, number {}", setId, cardNumber);
        return Optional.empty();
    }

    private List<String> localIdCandidates(String number) {
        Set<String> candidates = new LinkedHashSet<>();
        candidates.add(number);

        String stripped = number.replaceFirst("^0+(?=.)", "");
        candidates.add(stripped);

        if (stripped.matches("\\d+")) {
            candidates.add(String.format("%03d", Integer.parseInt(stripped)));
        }
        return new ArrayList<>(candidates);
    }
}