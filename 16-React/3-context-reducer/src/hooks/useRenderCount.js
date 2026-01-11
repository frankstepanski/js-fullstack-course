import { useRef } from "react";

/**
 * useRenderCount
 *
 * Debugging / teaching hook.
 *
 * Logs how many times a component has rendered.
 * Uses useRef so the count persists across renders
 * without causing additional re-renders.
 *
 * This is NOT for production usage.
 */
export function useRenderCount(componentName) {
  const renderCount = useRef(1);

  console.log(
    `${componentName} render #${renderCount.current}`
  );

  renderCount.current++;
}
