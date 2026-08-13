CREATE TABLE cat_own_games (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   game_name text NOT NULL,
   is_complete boolean,
   digital_pc_store text,
   date_of_finish timestamp with time zone,
   FOREIGN KEY (game_name) REFERENCES cat_game(name),
   FOREIGN KEY (digital_pc_store) REFERENCES cat_digital_pc_stores(name)
);