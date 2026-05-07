import pool from "../../db/pool.js";

type Testimonial = {
  id:     string;
  name:   string | null;
  quote:  string | null;
  rating: number | null;
};

export async function getAllTestimonials() {
  const { rows } = await pool.query<Testimonial>("SELECT * FROM testimonials ORDER BY id");
  return rows;
}