CREATE TABLE IF NOT EXISTS pizzas (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  description  TEXT,
  prices       JSONB NOT NULL DEFAULT '{}',
  image_src    TEXT,
  image_alt    TEXT,
  image_caption TEXT
);

CREATE TABLE IF NOT EXISTS specials (
  id               TEXT PRIMARY KEY,
  day_label        TEXT,
  title            TEXT NOT NULL,
  description_html TEXT,
  tagline          TEXT
);

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

CREATE TABLE IF NOT EXISTS testimonials (
  id     TEXT PRIMARY KEY,
  name   TEXT,
  quote  TEXT,
  rating INTEGER
);

CREATE TABLE IF NOT EXISTS cart (
  id    TEXT PRIMARY KEY DEFAULT '1',
  items JSONB NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS orders (
  id         TEXT PRIMARY KEY,
  items      JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
