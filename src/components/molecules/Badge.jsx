'use client';

import { useState } from 'react';
import { tokens } from '@/theme/tokens';
import { Icon } from '@/components/atoms/Icon';

export function Badge({ label, icon, badge }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 28px',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,.06)',
        border: `1px solid ${tokens.outlineVariant}`,
        filter: hov ? 'grayscale(0)' : 'grayscale(.9)',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all .3s',
        cursor: 'default',
      }}
    >
      {badge ? (
        <div
          style={{
            width: 25,
            height: 25,
            borderRadius: '50%',
            background: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 9,
            fontWeight: 700,
          }}
        >
          {badge}
        </div>
      ) : (
        <Icon name={icon} size={17} style={{ color: tokens.primary }} />
      )}
      <span style={{ fontWeight: 700, fontSize: 14 }}>{label}</span>
    </div>
  );
}
