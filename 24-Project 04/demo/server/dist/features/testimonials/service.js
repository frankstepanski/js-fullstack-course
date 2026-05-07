import pool from "../../db/pool.js";
export async function getAllTestimonials() {
    const { rows } = await pool.query("SELECT * FROM testimonials ORDER BY id");
    return rows;
}
