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
    const refs = sectionRefs;
    // eslint-disable-next-line react-hooks/immutability
    if (refs && id) refs.current[id] = ref.current;
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
