'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { tokens } from '@/theme/tokens';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [screenRect, setScreenRect] = useState(null);

  useEffect(() => {
    const updateScreenRect = () => {
      const vv = window.visualViewport;
      const rawH = vv ? vv.height : window.innerHeight;
      const rawW = vv ? vv.width : window.innerWidth;

      // Convert OS DIP screen/window ceiling into CSS pixels so browser zoom-out
      // (where innerWidth & innerHeight scale up by 1/zoom while outerWidth/availHeight
      // remain in OS DIPs) is not falsely clamped to a fraction of the window.
      const outerW = window.outerWidth || window.screen?.availWidth || rawW;
      const cssPerDip = outerW > 200 && rawW > outerW * 1.05 ? rawW / outerW : 1;

      const availH = window.screen?.availHeight || rawH;
      const outerH = window.outerHeight > 200 ? window.outerHeight : availH;
      const screenCeilingCss = Math.min(availH, outerH) * cssPerDip;

      // Also guard against full-page viewport emulation (e.g. 1440x4000) where
      // Chromium overrides screen.availHeight and outerHeight to the full page height.
      const isAbnormallyTall =
        rawW >= 768 ? rawH > rawW * 0.85 && rawH > 1100 : rawH > rawW * 2.25;
      const aspectCeiling =
        rawW >= 768 ? Math.round(rawW * 0.625) : Math.round(rawW * 2.16);

      let ceiling = screenCeilingCss;
      if (isAbnormallyTall) {
        ceiling = Math.min(ceiling, aspectCeiling);
      }

      const height = rawH > ceiling * 1.05 ? ceiling : rawH;
      const top = vv ? vv.offsetTop : 0;
      const left = vv ? vv.offsetLeft : 0;
      setScreenRect({ top, left, width: rawW, height });
    };

    const prevScrollRestoration =
      'scrollRestoration' in window.history ? window.history.scrollRestoration : null;
    if (prevScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    updateScreenRect();

    // Ensure scroll is locked during loading, then restore cleanly without overriding globals.css overflow-x
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    window.addEventListener('resize', updateScreenRect, { passive: true });
    window.visualViewport?.addEventListener('resize', updateScreenRect, { passive: true });
    window.visualViewport?.addEventListener('scroll', updateScreenRect, { passive: true });

    const timer = setTimeout(() => {
      setLoading(false);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      if (prevScrollRestoration) {
        window.history.scrollRestoration = prevScrollRestoration;
      }
    }, 1800);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScreenRect);
      window.visualViewport?.removeEventListener('resize', updateScreenRect);
      window.visualViewport?.removeEventListener('scroll', updateScreenRect);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      if (prevScrollRestoration) {
        window.history.scrollRestoration = prevScrollRestoration;
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100dvh',
            minHeight: '100vh',
            background: tokens.surface,
            zIndex: 9999,
          }}
        >
          <style>{`
            .preloader-screen-box {
              max-height: min(100dvh, 75vw);
            }
            @media (max-width: 767px) {
              .preloader-screen-box {
                max-height: min(100dvh, 220vw);
              }
            }
          `}</style>
          <div
            className="preloader-screen-box"
            style={{
              position: 'absolute',
              top: screenRect ? `${screenRect.top}px` : 0,
              left: screenRect ? `${screenRect.left}px` : 0,
              width: screenRect ? `${screenRect.width}px` : '100vw',
              height: screenRect ? `${screenRect.height}px` : '100dvh',
              ...(screenRect ? { maxHeight: `${screenRect.height}px` } : {}),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              boxSizing: 'border-box',
            }}
          >
            <motion.img
              src="/assets/img/logo.webp"
              alt="GovernAI Loading"
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              onError={(e) => { if (e.target.src.includes('.webp')) e.target.src = '/assets/img/logo.png'; }}
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            />
            {/* Subtle loading pulse bar below logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                marginTop: '40px',
                width: '40px',
                height: '2px',
                background: tokens.primary,
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255,255,255,0.8)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
