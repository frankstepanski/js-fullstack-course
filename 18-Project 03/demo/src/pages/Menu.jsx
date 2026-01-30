import { useEffect, useMemo, useState } from "react";
import PageShell from "./PageShell.jsx";
import StatusMessage from "../components/ui/StatusMessage.jsx";
import MenuList from "../components/menu/MenuList.jsx";
import { api } from "../api/client.js";
import { useCart } from "../context/CartContext.jsx";

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [status, setStatus] = useState({ type: "loading", msg: "Loading menu…" });
  const { dispatch } = useCart();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.getPizzas();
        if (cancelled) return;
        setPizzas(Array.isArray(data) ? data : []);
        setStatus({ type: "ready", msg: "" });
      } catch {
        if (cancelled) return;
        setStatus({ type: "error", msg: "Could not load menu. Is json-server running?" });
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  function makeCartItem(pizza, size) {
    return {
      key: `${pizza.id}-${size}`,
      pizzaId: pizza.id,
      name: pizza.name,
      size,
      price: pizza.prices?.[size],
    };
  }

  function handleAdd(pizza, size) {
    dispatch({ type: "CART/ADD", payload: { item: makeCartItem(pizza, size) } });
  }

  const content = useMemo(() => {
    if (status.type === "loading") return <StatusMessage>{status.msg}</StatusMessage>;
    if (status.type === "error") return <StatusMessage $tone="error">{status.msg}</StatusMessage>;
    return <MenuList pizzas={pizzas} onAdd={handleAdd} />;
  }, [status, pizzas]);

  return (
    <PageShell title="Menu" intro="Pick a pizza, choose a size, and add it to your cart.">
      {content}
    </PageShell>
  );
}