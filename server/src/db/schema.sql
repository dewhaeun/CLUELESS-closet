-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS outfits;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

-- ─────────────────────────────────────────
-- USERS
-- ─────────────────────────────────────────
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- ITEMS
-- ─────────────────────────────────────────
CREATE TYPE item_category AS ENUM (
  'top',
  'bottom',
  'outer',
  'shoes',
  'accessory'
);

CREATE TABLE items (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url  VARCHAR(500)  NOT NULL,
  category   item_category NOT NULL,
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_items_user_id          ON items(user_id);
CREATE INDEX idx_items_user_id_category ON items(user_id, category);

-- ─────────────────────────────────────────
-- OUTFITS
-- ─────────────────────────────────────────
CREATE TABLE outfits (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER     NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  top_id     INTEGER     NOT NULL REFERENCES items(id)  ON DELETE CASCADE,
  bottom_id  INTEGER     NOT NULL REFERENCES items(id)  ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- 같은 유저가 동일한 조합을 중복 저장하지 못하게
  UNIQUE (user_id, top_id, bottom_id)
);

CREATE INDEX idx_outfits_user_id ON outfits(user_id);
