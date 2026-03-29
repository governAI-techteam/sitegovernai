'use client';

import { useState } from 'react';
import { tokens } from '@/theme/tokens';
import { Icon } from '@/components/atoms/Icon';

export function IndustryCard({ icon, name, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 30,
        borderRadius: 22,
        cursor: 'default',
        background: hov ? '#fff' : tokens.surfaceLow,
        border: `1px solid ${hov ? 'rgba(160,65,0,.1)' : 'transparent'}`,
        boxShadow: hov ? '0 12px 40px rgba(0,0,0,.08)' : 'none',
        transition: 'all .3s ease',
      }}
    >
      <Icon
        name={icon}
        size={38}
        style={{ color: tokens.primary, display: 'block', marginBottom: 22 }}
      />
      <h5
        style={{
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 8,
          color: tokens.onSurface,
          fontFamily: tokens.fonts.display,
        }}
      >
        {name}
      </h5>
      <p style={{ fontSize: 13, color: tokens.secondary, lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}
