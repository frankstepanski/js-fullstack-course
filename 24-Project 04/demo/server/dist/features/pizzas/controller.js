import * as service from "./service.js";
export async function getAll(req, res) {
    try {
        const pizzas = await service.getAllPizzas();
        res.json(pizzas);
    }
    catch (err) {
        console.error("getAll pizzas error:", err.message);
        res.status(500).json({ error: "Failed to fetch pizzas" });
    }
}
