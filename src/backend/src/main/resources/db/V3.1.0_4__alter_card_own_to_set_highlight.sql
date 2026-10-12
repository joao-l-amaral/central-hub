ALTER TABLE "Card_Collection".cat_own_pokemon
    ADD COLUMN IF NOT EXISTS highlight BOOLEAN NOT NULL DEFAULT FALSE;