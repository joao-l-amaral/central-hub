package pt.amaralsoftware.webbinder.config;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import net.tcgdex.sdk.TCGdex;

@ApplicationScoped
public class TCGdexProducer {
    @Produces
    @ApplicationScoped
    public TCGdex tcgdex() {
        return new TCGdex("en");
    }
}
