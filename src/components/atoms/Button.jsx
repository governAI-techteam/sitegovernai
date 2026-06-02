'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
    borderRadius: 14,
    padding: '14px 32px',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    fontFamily: tokens.fonts.display,
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.02em',
  };
  
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #ea6926 0%, #ff8c42 100%)',
      color: tokens.onPrimary,
      boxShadow: hov
        ? '0 12px 32px rgba(234, 105, 38, 0.4), 0 4px 12px rgba(0,0,0,0.1)'
        : '0 6px 20px rgba(234, 105, 38, 0.3), 0 2px 8px rgba(0,0,0,0.08)',
    },
    ghost: {
      background: hov ? tokens.surfaceLow : tokens.surfaceLowest,
      color: tokens.onSurface,
      border: `1.5px solid ${hov ? tokens.primary : tokens.outlineVariant}`,
      boxShadow: hov ? '0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
    },
    outline: {
      background: hov ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.12)',
      color: '#fff',
      border: '1.5px solid rgba(255,255,255,.4)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    },
    white: {
      background: hov ? '#ffffff' : '#fafafa',
      color: tokens.primary,
      border: 'none',
      boxShadow: hov 
        ? '0 8px 28px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.08)'
        : '0 4px 20px rgba(0,0,0,0.12)',
    },
  };

  return (
    <motion.button
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...rest}
    >
      {/* Shine Effect for Primary Button */}
      {variant === 'primary' && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
          animate={hov ? { left: '100%' } : { left: '-100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}
