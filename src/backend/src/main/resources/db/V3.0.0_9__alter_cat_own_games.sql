ALTER TABLE cat_own_games
    ADD COLUMN total_achivements text,
    ADD COLUMN current_achivements text;

ALTER TABLE cat_own_games ADD COLUMN is_physical boolean DEFAULT false;
ALTER TABLE cat_own_games RENAME COLUMN digital_pc_store TO digital_store;
