import { useState, useEffect } from "react";

export function useStaggerVisible(count: number, interval = 120, initialDelay = 100) {
  const [visible, setVisible] = useState<boolean[]>(Array(count).fill(false));

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          setVisible(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, initialDelay + i * interval)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [count, interval, initialDelay]);

  return visible;
}
