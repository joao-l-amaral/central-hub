ALTER TABLE "Card_Collection".cat_own_pokemon
    ADD COLUMN IF NOT EXISTS illustrator VARCHAR(255),
    ADD COLUMN IF NOT EXISTS index INTEGER;

ALTER TABLE "Card_Collection".cat_set
    ADD COLUMN IF NOT EXISTS "size" INTEGER;