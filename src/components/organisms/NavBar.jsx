'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from '@/components/atoms/SafeImage';
import { NAV_ITEMS } from '@/config/content';
import { useScroll } from '@/context/ScrollContext';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';

export function NavBar({ activeSection }) {
  const { scrollTo } = useScroll();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const goContact = useCallback(() => {
    router.push('/contact');
    setMobileOpen(false);
  }, [router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = useCallback((id) => {
    scrollTo(id);
    setMobileOpen(false);
  }, [scrollTo]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: scrolled ? '8px 24px' : '16px 24px',
          transition: 'padding 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}>
          <nav aria-label="Primary navigation" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            /* KEY: transparent at top, glassmorphism when scrolled */
            background: scrolled
              ? 'rgba(255, 255, 255, 0.82)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderRadius: scrolled ? 16 : 20,
            padding: scrolled ? '10px 24px' : '14px 28px',
            border: scrolled
              ? '1px solid rgba(0,0,0,0.06)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)'
              : 'none',
            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}>
            {/* Logo — reserved slot, animates in on scroll */}
            <div style={{ width: 130, height: 40, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.88, filter: 'blur(6px)' }}
                animate={(scrolled || isMobile)
                  ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                  : { opacity: 0, y: -16, scale: 0.88, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <SafeImage
                  src="/assets/img/logo.png"
                  alt="GovernAI — AI Governance, Compliance & Responsible AI"
                  width={130}
                  height={30}
                  loading="eager"
                  style={{ height: 30, width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </motion.div>
            </div>

            {/* Desktop Nav */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
            className="mobile-hide"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <motion.button
                    key={item.sectionId}
                    onClick={() => handleNav(item.sectionId)}
                    style={{
                      position: 'relative',
                      padding: '8px 22px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontFamily: tokens.fonts.body,
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? tokens.primary : tokens.secondary,
                      letterSpacing: '0.01em',
                      borderRadius: 12,
                      transition: 'color 0.25s ease',
                    }}
                    whileHover={{ color: tokens.primary }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: scrolled ? tokens.peach50 : 'rgba(234, 105, 38, 0.08)',
                          borderRadius: 12,
                          border: scrolled ? `1px solid ${tokens.peach200}` : '1px solid rgba(234, 105, 38, 0.12)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* CTA + Hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Desktop CTA */}
              <motion.button
                className="mobile-hide"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={goContact}
                style={{
                  padding: '10px 28px',
                  border: 'none',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #191c1e 0%, #2d3133 100%)',
                  color: '#fff',
                  fontFamily: tokens.fonts.display,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>Contact Us</span>
              </motion.button>

              {/* Hamburger */}
              <motion.button
                className="hide-on-desktop"
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  width: 44,
                  height: 44,
                  border: `1px solid ${mobileOpen ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                  background: 'rgba(255,255,255,0.72)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 13,
                  position: 'relative',
                  padding: 0,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
                  transition: 'border-color 0.3s ease',
                }}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <div style={{ width: 19, height: 12, position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    width: '100%',
                    height: 2,
                    background: tokens.onSurface,
                    borderRadius: 2,
                    left: 0,
                    top: mobileOpen ? 5 : 0,
                    transform: mobileOpen ? 'rotate(45deg)' : 'none',
                    transformOrigin: 'center',
                    transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.05s',
                  }} />
                  <span style={{
                    position: 'absolute',
                    width: '100%',
                    height: 2,
                    background: tokens.onSurface,
                    borderRadius: 2,
                    left: 0,
                    top: 5,
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? 'translateX(-6px)' : 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }} />
                  <span style={{
                    position: 'absolute',
                    width: '100%',
                    height: 2,
                    background: tokens.onSurface,
                    borderRadius: 2,
                    left: 0,
                    top: mobileOpen ? 5 : 10,
                    transform: mobileOpen ? 'rotate(-45deg)' : 'none',
                    transformOrigin: 'center',
                    transition: 'top 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.05s',
                  }} />
                </div>
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(4px)',
                zIndex: 999,
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: 360,
                background: 'rgba(255, 255, 255, 0.97)',
                backdropFilter: 'blur(24px)',
                zIndex: 1001,
                padding: '100px 32px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                boxShadow: '-16px 0 48px rgba(0,0,0,0.12)',
              }}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  width: 42,
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${tokens.peach200}`,
                  background: tokens.peach50,
                  borderRadius: 12,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tokens.onSurface} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </motion.button>

              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <motion.button
                    key={item.sectionId}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    onClick={() => handleNav(item.sectionId)}
                    style={{
                      padding: '18px 20px',
                      border: 'none',
                      background: isActive ? tokens.peach50 : 'transparent',
                      textAlign: 'left',
                      fontFamily: tokens.fonts.display,
                      fontSize: 18,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? tokens.primary : tokens.onSurface,
                      cursor: 'pointer',
                      borderRadius: 14,
                      transition: 'all 0.2s ease',
                      borderLeft: isActive ? `3px solid ${tokens.primary}` : '3px solid transparent',
                    }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <div style={{ flex: 1 }} />

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={goContact}
                style={{
                  padding: '16px 28px',
                  border: 'none',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #191c1e 0%, #2d3133 100%)',
                  color: '#fff',
                  fontFamily: tokens.fonts.display,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
                  textAlign: 'center',
                }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
