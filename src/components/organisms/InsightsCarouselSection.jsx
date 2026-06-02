'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { insightsData } from '@/config/insightsData';
import { tokens } from '@/theme/tokens';

export default function InsightsCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = insightsData.length;
  const autoplayRef = useRef(null);
  const trackRef = useRef(null);

  const goTo = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [next]);

  const pauseAutoplay = () => clearInterval(autoplayRef.current);
  const resumeAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 5000);
  };

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplay();
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    resumeAutoplay();
  };

  return (
    <div
      style={{
        background: tokens.surface,
        padding: 'clamp(72px, 8vw, 120px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          textAlign: 'center',
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 24px',
          marginBottom: 'clamp(40px, 5vw, 72px)',
        }}
      >
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: tokens.primary,
          marginBottom: 16,
          fontFamily: tokens.fonts.body,
        }}>
          Insights & Impact
        </p>
        <h2 style={{
          fontFamily: tokens.fonts.display,
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: tokens.onSurface,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          margin: '0 0 16px',
        }}>
          Recognized for Our Pioneering Work in{' '}
          <span style={{ color: tokens.primary }}>AI Governance</span>
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 1.2vw, 18px)',
          color: tokens.secondary,
          lineHeight: 1.65,
          maxWidth: 520,
          margin: '0 auto',
          fontFamily: tokens.fonts.body,
        }}>
          From government workshops to university partnerships — shaping the future of responsible AI across India and beyond.
        </p>
      </motion.div>

      {/* Carousel */}
      <div
        ref={trackRef}
        style={{ position: 'relative', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            gap: 'clamp(12px, 1.5vw, 24px)',
            transition: 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
            transform: `translateX(calc(22% - ${current} * (56% + clamp(12px, 1.5vw, 24px))))`,
            alignItems: 'center',
          }}
        >
          {insightsData.map((item, i) => {
            const isActive = i === current;
            return (
              <article
                key={item.id}
                onClick={() => !isActive && goTo(i)}
                style={{
                  flex: '0 0 56%',
                  position: 'relative',
                  aspectRatio: '2 / 1',
                  overflow: 'hidden',
                  borderRadius: 29,
                  background: '#1a1a1a',
                  transition: 'all 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: isActive ? 1 : 0.45,
                  transform: isActive ? 'scale(1)' : 'scale(0.92)',
                  filter: isActive ? 'none' : 'saturate(0.85)',
                  cursor: isActive ? 'default' : 'pointer',
                  boxShadow: isActive ? tokens.shadow.xl : tokens.shadow.md,
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 7000ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />

                {/* Bottom Gradient Band (covers lower portion only) */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '42%',
                  background: 'linear-gradient(to top, rgba(10,10,12,0.94) 0%, rgba(10,10,12,0.82) 38%, rgba(10,10,12,0.45) 72%, rgba(10,10,12,0) 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Content anchored to bottom band */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(6px, 0.8vw, 10px)',
                  padding: 'clamp(18px, 2.6vw, 36px)',
                }}>
                  {/* Location pill */}
                  {item.location && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      alignSelf: 'flex-start',
                      padding: '5px 11px 5px 8px',
                      borderRadius: 100,
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.18)',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff8c42" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span style={{
                        color: '#fff',
                        fontSize: 'clamp(11px, 0.85vw, 13px)',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        fontFamily: tokens.fonts.body,
                      }}>{item.location}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(17px, 1.6vw, 26px)',
                    fontWeight: 700,
                    fontFamily: tokens.fonts.display,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.18,
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: 'clamp(12px, 1vw, 15px)',
                    lineHeight: 1.5,
                    fontFamily: tokens.fonts.body,
                    fontWeight: 400,
                    margin: 0,
                    maxWidth: '92%',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        marginTop: 'clamp(24px, 3vw, 40px)',
      }}>
        {/* Prev */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={prev}
          aria-label="Previous slide"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: tokens.onSurface,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: tokens.transition.fast,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
          </svg>
        </motion.button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {insightsData.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 100,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: i === current ? tokens.primary : 'rgba(0,0,0,0.15)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={next}
          aria-label="Next slide"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            color: tokens.onSurface,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: tokens.transition.fast,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Slide counter */}
      <div style={{
        textAlign: 'center',
        marginTop: 12,
        fontSize: 13,
        color: tokens.textMuted,
        fontFamily: tokens.fonts.body,
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}>
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
}
