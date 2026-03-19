export type HapticType = "light" | "medium" | "heavy" | "success" | "error";

export function triggerHaptic(type: HapticType = "light") {
  if (typeof window === "undefined" || !navigator.vibrate) return;

  try {
    switch (type) {
      case "light":
        navigator.vibrate(10);
        break;
      case "medium":
        navigator.vibrate(25);
        break;
      case "heavy":
        navigator.vibrate(40);
        break;
      case "success":
        navigator.vibrate([15, 60, 25]);
        break;
      case "error":
        navigator.vibrate([30, 40, 30, 40, 40]);
        break;
    }
  } catch (error) {
    // Gracefully fallback if vibrate API is restricted
  }
}
