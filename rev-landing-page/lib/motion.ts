// Shared animation constants for premium, organic feel

/** Spring transition for slide-up elements (slight overshoot + settle) */
export const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

/** Spring with delay */
export const springD = (delay: number) => ({ type: "spring" as const, stiffness: 100, damping: 20, delay });

/** Tween with premium cubic-bezier for non-y animations (opacity, scale, color, x) */
export const ease = (duration: number, delay = 0) => ({
  duration,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  ...(delay > 0 ? { delay } : {}),
});

/** CSS transition string for inline styles */
export const cssEase = "cubic-bezier(0.16, 1, 0.3, 1)";
