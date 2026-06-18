'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true when viewport width ≤ breakpoint (default 768px).
 * SSR-safe: returns false on server, hydrates correctly on client.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpoint]);

  return isMobile;
}
