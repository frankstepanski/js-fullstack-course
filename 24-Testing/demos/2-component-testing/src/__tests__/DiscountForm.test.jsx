// src/__tests__/DiscountForm.test.jsx
//
// Component tests for the DiscountForm.
//
// This component is more interactive — the user types a code
// and submits the form. We test:
//   - the default rendered state
//   - what happens with a valid code
//   - what happens with an invalid code
//   - the locked state after a code is applied

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DiscountForm } from "../components/DiscountForm.jsx";

describe("DiscountForm", () => {
  // ─── Default state ────────────────────────────

  it("renders the discount code input and Apply button", () => {
    render(<DiscountForm onApply={() => {}} />);

    // getByLabelText finds an input by its associated label text
    expect(screen.getByLabelText("Discount Code")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  it("shows no error or success message by default", () => {
    render(<DiscountForm onApply={() => {}} />);

    // queryByRole returns null when the element is not found
    // Use this — NOT getByRole — when asserting something is absent
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  // ─── Valid code entered ───────────────────────

  it("calls onApply with the correct discount for SAVE10", async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();

    render(<DiscountForm onApply={onApply} />);

    // Type the code into the input
    await user.type(screen.getByLabelText("Discount Code"), "SAVE10");
    // Click Apply
    await user.click(screen.getByRole("button", { name: "Apply" }));

    // onApply should have been called with 10 (10% discount)
    expect(onApply).toHaveBeenCalledWith(10);
  });

  it("calls onApply with the correct discount for SAVE20", async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();

    render(<DiscountForm onApply={onApply} />);

    await user.type(screen.getByLabelText("Discount Code"), "SAVE20");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onApply).toHaveBeenCalledWith(20);
  });

  it("shows a success message after a valid code is applied", async () => {
    const user = userEvent.setup();
    render(<DiscountForm onApply={() => {}} />);

    await user.type(screen.getByLabelText("Discount Code"), "SAVE10");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    // role="status" is on the success message
    expect(screen.getByRole("status")).toHaveTextContent("Discount applied!");
  });

  it("disables the input and button after a valid code is applied", async () => {
    const user = userEvent.setup();
    render(<DiscountForm onApply={() => {}} />);

    await user.type(screen.getByLabelText("Discount Code"), "SAVE10");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(screen.getByLabelText("Discount Code")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  });

  // ─── Invalid code entered ─────────────────────

  it("shows an error message for an invalid code", async () => {
    const user = userEvent.setup();
    render(<DiscountForm onApply={() => {}} />);

    await user.type(screen.getByLabelText("Discount Code"), "BADCODE");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    // role="alert" is on the error message
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not call onApply for an invalid code", async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();

    render(<DiscountForm onApply={onApply} />);

    await user.type(screen.getByLabelText("Discount Code"), "BADCODE");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onApply).not.toHaveBeenCalled();
  });

  it("accepts codes in lowercase (case insensitive)", async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();

    render(<DiscountForm onApply={onApply} />);

    // Type in lowercase — the component converts to uppercase internally
    await user.type(screen.getByLabelText("Discount Code"), "save10");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onApply).toHaveBeenCalledWith(10);
  });
});
