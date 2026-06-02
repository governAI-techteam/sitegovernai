'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { tokens } from '@/theme/tokens';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const duration = 1600; // ms
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = 'auto';
        }, 300);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#fafbfc',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Logo */}
          <motion.img
            src="/assets/img/logo.png"
            alt="GovernAI Loading"
            initial={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%', maxWidth: '220px', height: 'auto' }}
          />

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{
              marginTop: '36px',
              width: '120px',
              height: '2px',
              background: 'rgba(0,0,0,0.06)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${tokens.primary}, #ff8c42)`,
                borderRadius: '4px',
                transition: 'width 0.1s linear',
              }}
            />
          </motion.div>

          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            style={{
              marginTop: '16px',
              fontFamily: tokens.fonts.mono,
              fontSize: '12px',
              fontWeight: 500,
              color: tokens.textMuted,
              letterSpacing: '0.08em',
              tabularNums: 'tabular-nums',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(progress).padStart(3, '0')}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
