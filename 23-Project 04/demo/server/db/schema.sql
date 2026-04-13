-- db/schema.sql
-- Run via: psql $DATABASE_URL -f db/schema.sql
-- Or the seed script runs this automatically.

-- pizzas
-- prices is JSONB because it holds a flexible {medium, large} object
CREATE TABLE IF NOT EXISTS pizzas (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT,
  prices       JSONB NOT NULL DEFAULT '{}',
  image_src    TEXT,
  image_alt    TEXT,
  image_caption TEXT
);

-- specials  (weekly deal entries)
CREATE TABLE IF NOT EXISTS specials (
  id               TEXT PRIMARY KEY,
  day_label        TEXT,
  title            TEXT NOT NULL,
  description_html TEXT,
  tagline          TEXT
);

-- contact_cards
-- Two card types exist ("visit" and "info"); nullable columns cover both shapes.
-- address_lines, paragraphs, actions are JSONB arrays/objects.
CREATE TABLE IF NOT EXISTS contact_cards (
  id            TEXT PRIMARY KEY,
  type          TEXT,
  title         TEXT,
  address_lines JSONB,
  phone_display TEXT,
  phone_href    TEXT,
  email_display TEXT,
  email_href    TEXT,
  paragraphs    JSONB,
  actions       JSONB
);

-- testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id     TEXT PRIMARY KEY,
  name   TEXT,
  quote  TEXT,
  rating INTEGER
);

-- cart (single shared cart; id is always '1' in this demo)
-- items is a JSONB array of cart line objects
CREATE TABLE IF NOT EXISTS cart (
  id    TEXT PRIMARY KEY DEFAULT '1',
  items JSONB NOT NULL DEFAULT '[]'
);

-- orders  (placed orders; items captured as a snapshot JSONB array)
CREATE TABLE IF NOT EXISTS orders (
  id         TEXT PRIMARY KEY,
  items      JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
