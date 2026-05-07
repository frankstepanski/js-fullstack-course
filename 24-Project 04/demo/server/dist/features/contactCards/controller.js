import * as service from "./service.js";
export async function getAll(req, res) {
    try {
        const cards = await service.getAllContactCards();
        res.json(cards);
    }
    catch (err) {
        console.error("getAll contactCards error:", err.message);
        res.status(500).json({ error: "Failed to fetch contact cards" });
    }
}
