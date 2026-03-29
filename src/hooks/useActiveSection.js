'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionRefs) {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: '-48% 0px -48% 0px' },
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sectionRefs]);
  return active;
}
