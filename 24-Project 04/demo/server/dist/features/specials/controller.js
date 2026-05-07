import * as service from "./service.js";
export async function getAll(req, res) {
    try {
        const specials = await service.getAllSpecials();
        res.json(specials);
    }
    catch (err) {
        console.error("getAll specials error:", err.message);
        res.status(500).json({ error: "Failed to fetch specials" });
    }
}
