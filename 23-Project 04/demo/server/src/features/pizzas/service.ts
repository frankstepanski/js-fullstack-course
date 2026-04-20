import pool from "../../db/pool.js";

type PizzaRow = {
  id:            string;
  name:          string;
  description:   string | null;
  prices:        Record<string, number>;
  image_src:     string | null;
  image_alt:     string | null;
  image_caption: string | null;
};

type Pizza = {
  id:           string;
  name:         string;
  description:  string | null;
  prices:       Record<string, number>;
  imageSrc:     string | null;
  imageAlt:     string | null;
  imageCaption: string | null;
};

function toApiShape(row: PizzaRow): Pizza {
  return {
    id:           row.id,
    name:         row.name,
    description:  row.description,
    prices:       row.prices,
    imageSrc:     row.image_src,
    imageAlt:     row.image_alt,
    imageCaption: row.image_caption,
  };
}

export async function getAllPizzas() {
  const { rows } = await pool.query<PizzaRow>("SELECT * FROM pizzas ORDER BY id");
  return rows.map(toApiShape);
}