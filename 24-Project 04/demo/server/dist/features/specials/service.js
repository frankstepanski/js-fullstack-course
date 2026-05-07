import pool from "../../db/pool.js";
function toApiShape(row) {
    return {
        id: row.id,
        dayLabel: row.day_label,
        title: row.title,
        descriptionHtml: row.description_html,
        tagline: row.tagline,
    };
}
export async function getAllSpecials() {
    const { rows } = await pool.query("SELECT * FROM specials ORDER BY id");
    return rows.map(toApiShape);
}
