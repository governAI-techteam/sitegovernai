'use client';

import { useRef, useEffect } from 'react';
import { tokens } from '@/theme/tokens';

export function Section({
  id,
  sectionRefs,
  bg,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (sectionRefs && id) sectionRefs.current[id] = ref.current;
  }, [id, sectionRefs]);
  return (
    <section
      ref={ref}
      id={id}
      className={`mobile-p-sm mobile-padding ${className}`.trim()}
      style={{
        background: bg || tokens.surface,
        scrollMarginTop: 68,
        ...style,
      }}
      {...rest}
    >
      {children}
    </section>
  );
}
