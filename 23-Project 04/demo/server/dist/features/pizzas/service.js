import pool from "../../db/pool.js";
function toApiShape(row) {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        prices: row.prices,
        imageSrc: row.image_src,
        imageAlt: row.image_alt,
        imageCaption: row.image_caption,
    };
}
export async function getAllPizzas() {
    const { rows } = await pool.query("SELECT * FROM pizzas ORDER BY id");
    return rows.map(toApiShape);
}
