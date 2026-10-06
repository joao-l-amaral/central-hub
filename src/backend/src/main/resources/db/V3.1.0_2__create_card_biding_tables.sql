CREATE TABLE IF NOT EXISTS "Card_Collection".cat_card_family (
    id   VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Card_Collection".cat_set (
    id     VARCHAR(100) PRIMARY KEY,
    logo   TEXT,
    name   VARCHAR(255) NOT NULL,
    symbol TEXT
);

CREATE TABLE IF NOT EXISTS "Card_Collection".cat_own_pokemon (
    id          VARCHAR(100) PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    image       TEXT,
    rarity      VARCHAR(100),
    type        TEXT[],
    has_holo    BOOLEAN NOT NULL DEFAULT FALSE,
    has_normal  BOOLEAN NOT NULL DEFAULT FALSE,
    has_reverse BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    variant     VARCHAR(100),
    family      VARCHAR(100),
    local_id    VARCHAR(50),
    set_id      VARCHAR(100),

    CONSTRAINT fk_own_pokemon_family
    FOREIGN KEY (family)
    REFERENCES "Card_Collection".cat_card_family (id)
    ON UPDATE CASCADE ON DELETE SET NULL,

    CONSTRAINT fk_own_pokemon_set
    FOREIGN KEY (set_id)
    REFERENCES "Card_Collection".cat_set (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_own_pokemon_family ON "Card_Collection".cat_own_pokemon (family);
CREATE INDEX IF NOT EXISTS idx_own_pokemon_set    ON "Card_Collection".cat_own_pokemon (set_id);
CREATE INDEX IF NOT EXISTS idx_own_pokemon_type   ON "Card_Collection".cat_own_pokemon USING GIN (type);