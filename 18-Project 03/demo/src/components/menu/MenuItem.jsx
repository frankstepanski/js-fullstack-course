import Button from "../ui/Button.jsx";
import { Card, Img, Body, Title, Meta } from "./MenuItem.styles.js";

/**
 * Presentational component:
 * - Receives data via props
 * - No fetching here (keeps components reusable)
 */
export default function MenuItem({ pizza, onAdd }) {
  return (
    <Card>
      <Img src={pizza.image} alt={pizza.name} loading="lazy" />
      <Body>
        <Title>{pizza.name}</Title>
        <Meta>{pizza.description}</Meta>
        <Meta>
          <strong>Medium:</strong> ${pizza.prices.medium.toFixed(2)} •{" "}
          <strong>Large:</strong> ${pizza.prices.large.toFixed(2)}
        </Meta>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Button onClick={() => onAdd(pizza, "medium")}>Add Medium</Button>
          <Button variant="ghost" onClick={() => onAdd(pizza, "large")}>Add Large</Button>
        </div>
      </Body>
    </Card>
  );
}
