ALTER TABLE cat_own_games RENAME COLUMN game_name TO game_id;

ALTER TABLE cat_own_games
ADD CONSTRAINT fk_cat_own_games_game
FOREIGN KEY (game_id) REFERENCES cat_game(id);