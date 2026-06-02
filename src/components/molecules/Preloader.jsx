'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/theme/tokens';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* Logo */}
          <motion.img
            src="/assets/img/logo.png"
            alt="GovernAI"
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            style={{ height: 48 }}
          />

          {/* Spinner ring */}
          <div style={{ position: 'relative', width: 40, height: 40 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '2.5px solid rgba(234, 105, 38, 0.12)',
                borderTopColor: tokens.primary,
                position: 'absolute',
                inset: 0,
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '2px solid rgba(234, 105, 38, 0.08)',
                borderBottomColor: '#ff8c42',
                position: 'absolute',
                top: 6,
                left: 6,
              }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: tokens.textMuted,
              fontFamily: tokens.fonts.body,
            }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
