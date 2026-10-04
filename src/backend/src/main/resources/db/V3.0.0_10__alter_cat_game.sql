ALTER TABLE cat_game DROP CONSTRAINT cat_game_pkey CASCADE;

ALTER TABLE cat_game
    ADD COLUMN id text PRIMARY KEY,
    ADD COLUMN display_image text;