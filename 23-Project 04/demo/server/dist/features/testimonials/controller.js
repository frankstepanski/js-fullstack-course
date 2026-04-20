import * as service from "./service.js";
export async function getAll(req, res) {
    try {
        const testimonials = await service.getAllTestimonials();
        res.json(testimonials);
    }
    catch (err) {
        console.error("getAll testimonials error:", err.message);
        res.status(500).json({ error: "Failed to fetch testimonials" });
    }
}
