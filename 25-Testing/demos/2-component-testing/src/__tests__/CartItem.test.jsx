// src/__tests__/CartItem.test.jsx
//
// Component tests for the CartItem component.
//
// We test what the USER sees and does — not internal React state.
// The key questions are:
//   - Does the right content appear on screen?
//   - Does clicking the Remove button do what it should?
//
// Tools used:
//   render()      — mounts the component into the test DOM
//   screen        — lets us query what is on the page
//   userEvent     — simulates realistic user interactions
//   expect()      — asserts what we expect to see

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartItem } from "../components/CartItem.jsx";

// A reusable test item — defined once and reused across tests
const testItem = {
  id: 1,
  name: "Mechanical Keyboard",
  price: 79.99,
  quantity: 2,
};

describe("CartItem", () => {
  // ─── Rendering ───────────────────────────────

  it("displays the item name", () => {
    render(<CartItem item={testItem} onRemove={() => {}} />);
    // getByText finds an element containing this text
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
  });

  it("displays the unit price", () => {
    render(<CartItem item={testItem} onRemove={() => {}} />);
    expect(screen.getByText("$79.99 each")).toBeInTheDocument();
  });

  it("displays the quantity", () => {
    render(<CartItem item={testItem} onRemove={() => {}} />);
    expect(screen.getByText("Qty: 2")).toBeInTheDocument();
  });

  it("displays the correct line total (price × quantity)", () => {
    render(<CartItem item={testItem} onRemove={() => {}} />);
    // 79.99 × 2 = 159.98
    expect(screen.getByText("$159.98")).toBeInTheDocument();
  });

  it("renders a Remove button", () => {
    render(<CartItem item={testItem} onRemove={() => {}} />);
    // getByRole("button") finds a button element
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });

  // ─── Interaction ─────────────────────────────

  it("calls onRemove with the item id when Remove is clicked", async () => {
    // vi.fn() creates a spy function — we can check if it was called
    const onRemove = vi.fn();
    const user = userEvent.setup();

    render(<CartItem item={testItem} onRemove={onRemove} />);

    // Click the Remove button
    await user.click(screen.getByRole("button", { name: /remove/i }));

    // onRemove should have been called once, with the item's id
    expect(onRemove).toHaveBeenCalledOnce();
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  // ─── Different props ─────────────────────────

  it("displays different content when given different props", () => {
    const anotherItem = { id: 2, name: "Wireless Mouse", price: 39.99, quantity: 1 };
    render(<CartItem item={anotherItem} onRemove={() => {}} />);

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("$39.99 each")).toBeInTheDocument();
    expect(screen.getByText("Qty: 1")).toBeInTheDocument();
  });
});
