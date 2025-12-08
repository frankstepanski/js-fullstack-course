// Simple state object: single source of truth
const state = {
  sliceCount: 0
};

// Grab DOM elements
const sliceCountEl = document.querySelector("#slice-count");
const statusMessageEl = document.querySelector("#status-message");
const decreaseBtn = document.querySelector("#decrease-btn");
const increaseBtn = document.querySelector("#increase-btn");
const resetBtn = document.querySelector("#reset-btn");

// Attach event listeners
increaseBtn.addEventListener("click", handleIncrease);
decreaseBtn.addEventListener("click", handleDecrease);
resetBtn.addEventListener("click", handleReset);

/**
 * Increase the slice count by 1
 */
function handleIncrease() {
  state.sliceCount = state.sliceCount + 1;
  render();
}

/**
 * Decrease the slice count by 1 (but not below 0)
 */
function handleDecrease() {
  if (state.sliceCount > 0) {
    state.sliceCount = state.sliceCount - 1;
    render();
  }
}

/**
 * Reset the count back to 0
 */
function handleReset() {
  state.sliceCount = 0;
  render();
}

/**
 * Decide what message to show based on sliceCount
 */
function getStatusMessage(count) {
  if (count === 0) {
    return "No slices yet. Start your order!";
  } else if (count >= 1 && count <= 3) {
    return "Nice little snack. 😋";
  } else if (count >= 4 && count <= 7) {
    return "Pizza party incoming! 🎉";
  } else {
    return "Are you feeding a whole team? 😅";
  }
}

/**
 * Render function:
 * - updates DOM based on current state
 * - keeps UI in sync with state
 */
function render() {
  // Update number
  sliceCountEl.textContent = state.sliceCount;

  // Update message
  statusMessageEl.textContent = getStatusMessage(state.sliceCount);

  // Disable decrease button when at 0
  decreaseBtn.disabled = state.sliceCount === 0;
}

// Initial render on page load
render();
