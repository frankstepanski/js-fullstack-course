import pool from "../../db/pool.js";

type SpecialRow = {
  id:               string;
  day_label:        string | null;
  title:            string;
  description_html: string | null;
  tagline:          string | null;
};

type Special = {
  id:              string;
  dayLabel:        string | null;
  title:           string;
  descriptionHtml: string | null;
  tagline:         string | null;
};

function toApiShape(row: SpecialRow): Special {
  return {
    id:              row.id,
    dayLabel:        row.day_label,
    title:           row.title,
    descriptionHtml: row.description_html,
    tagline:         row.tagline,
  };
}

export async function getAllSpecials() {
  const { rows } = await pool.query<SpecialRow>("SELECT * FROM specials ORDER BY id");
  return rows.map(toApiShape);
}