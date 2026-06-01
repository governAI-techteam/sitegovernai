'use client';

import { useState } from 'react';
import { tokens } from '@/theme/tokens';

export function Button({
  children,
  variant = 'primary',
  onClick,
  style = {},
  ...rest
}) {
  const [hov, setHov] = useState(false);
  const base = {
    border: 'none',
    borderRadius: 12,
    padding: '12px 28px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    fontFamily: tokens.fonts.display,
    transition: 'transform .2s, box-shadow .2s, background .2s',
    transform: hov ? 'scale(1.03)' : 'scale(1)',
  };
  const variants = {
    primary: {
      background: hov 
        ? 'linear-gradient(135deg, #8a3800 0%, #e66000 100%)' 
        : tokens.primaryGrad,
      color: tokens.onPrimary,
      boxShadow: hov
        ? '0 8px 28px rgba(160,65,0,.4)'
        : '0 4px 14px rgba(160,65,0,.25)',
    },
    ghost: {
      background: hov ? tokens.surfaceLow : tokens.surfaceLowest,
      color: tokens.onSurface,
      border: `1px solid ${tokens.outlineVariant}`,
    },
    outline: {
      background: hov ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.1)',
      color: '#fff',
      border: '1px solid rgba(255,255,255,.3)',
      backdropFilter: 'blur(8px)',
    },
    white: {
      background: hov ? tokens.surfaceLow : '#fff',
      color: tokens.primary,
      border: 'none',
      boxShadow: '0 4px 20px rgba(0,0,0,.15)',
    },
  };
  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
