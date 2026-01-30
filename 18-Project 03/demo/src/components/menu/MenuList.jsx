import styles from "./MenuList.module.css";
import MenuItem from "./MenuItem.jsx";

/**
 * List component:
 * - maps data → UI
 * - keeps pages cleaner (DRY)
 */
export default function MenuList({ pizzas, onAdd }) {
  return (
    <section className={styles.grid} aria-label="Pizza menu items">
      {pizzas.map((p) => (
        <MenuItem key={p.id} pizza={p} onAdd={onAdd} />
      ))}
    </section>
  );
}
