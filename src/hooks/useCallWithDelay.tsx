import { useState, useRef, useCallback } from "react";
import { TRANSITION_DELAY } from "@/styles/commonStyles";

export const useCallWithDelay = (delay = TRANSITION_DELAY) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runWithDelay = useCallback(
    (callback: () => void) => {
      setIsTransitioning(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Save ref to avoid double call of the same callback
      timeoutRef.current = setTimeout(() => {
        callback();

        setIsTransitioning(false);
        timeoutRef.current = null;
      }, delay);
    },
    [delay],
  );

  return { isTransitioning, runWithDelay };
};
