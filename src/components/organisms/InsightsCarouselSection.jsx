'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/atoms/SafeImage';
import { insightsData } from '@/config/insightsData';
import { tokens } from '@/theme/tokens';

export default function InsightsCarouselSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = insightsData.length;
  const trackRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + total) % total);
  }, [total]);

  // Autoplay — restarts whenever `current` changes (manual nav resets the timer)
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setCurrent((p) => (p + 1) % total);
    }, 8000);
    return () => clearTimeout(timer);
  }, [current, paused, total]);

  const pauseAutoplay = () => setPaused(true);
  const resumeAutoplay = () => setPaused(false);

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
        background: 'linear-gradient(180deg, #fafbfc 0%, #f7f9fb 50%, #fff6ef 100%)',
        padding: 'clamp(72px, 8vw, 120px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 760,
          margin: '0 auto',
          padding: '0 24px',
          marginBottom: 'clamp(40px, 5vw, 72px)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          marginBottom: 18,
        }}>
          <span style={{ flex: 1, maxWidth: 44, height: 2, borderRadius: 1, background: tokens.primary, flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: tokens.primary, fontFamily: tokens.fonts.body }}>
            Insights & Impact
          </span>
          <span style={{ flex: 1, maxWidth: 44, height: 2, borderRadius: 1, background: tokens.primary, flexShrink: 0 }} />
        </div>
        <h2 style={{
          fontFamily: tokens.fonts.display,
          fontSize: 'clamp(28px, 4vw, 50px)',
          fontWeight: 800,
          color: tokens.onSurface,
          lineHeight: 1.06,
          letterSpacing: '-0.04em',
          margin: '0 0 16px',
        }}>
          Recognized for Our Pioneering Work in{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f16a24 0%, #f16a24 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>AI Governance</span>
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 1.2vw, 18px)',
          color: tokens.secondary,
          lineHeight: 1.65,
          maxWidth: 540,
          margin: '0 auto',
          fontFamily: tokens.fonts.body,
        }}>
          From government workshops to university partnerships, shaping the future of responsible AI across India and beyond.
        </p>
      </motion.div>

      {/* Carousel */}
      <div
        ref={trackRef}
        style={{ position: 'relative', overflow: 'hidden', zIndex: 1 }}
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
                  aspectRatio: '16 / 11',
                  overflow: 'hidden',
                  borderRadius: 29,
                  background: '#1a1a1a',
                  transition: 'all 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1)' : 'scale(0.9)',
                  filter: isActive ? 'none' : 'brightness(0.95)',
                  cursor: isActive ? 'default' : 'pointer',
                  boxShadow: isActive
                    ? '0 30px 70px rgba(16,24,40,0.28), 0 12px 28px rgba(241,106,36,0.12)'
                    : '0 12px 32px rgba(16,24,40,0.12)',
                }}
              >
                {/* Blurred backdrop fill (prevents letterbox bars, no subject ever cut) */}
                <SafeImage
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  loading={i < 3 ? 'eager' : 'lazy'}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: 'scale(1.15)',
                    filter: 'blur(28px) brightness(0.7)',
                  }}
                />

                {/* Foreground image — full subject always visible */}
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: item.focus || 'center top',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 7000ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />

                {/* Bottom Gradient Band (covers lower portion only) */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '55%',
                  background: 'linear-gradient(to top, rgba(8,8,10,0.95) 0%, rgba(8,8,10,0.85) 30%, rgba(8,8,10,0.5) 65%, rgba(8,8,10,0) 100%)',
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
                  gap: 'clamp(8px, 0.9vw, 12px)',
                  padding: 'clamp(22px, 3vw, 44px)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 600ms ease 150ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 150ms',
                }}>
                  {/* Location pill */}
                  {item.location && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      alignSelf: 'flex-start',
                      padding: '6px 13px 6px 9px',
                      borderRadius: 100,
                      background: 'rgba(255,255,255,0.14)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.22)',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span style={{
                        color: '#fff',
                        fontSize: 'clamp(11px, 0.85vw, 13px)',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        fontFamily: tokens.fonts.body,
                      }}>{item.location}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(19px, 1.9vw, 30px)',
                    fontWeight: 800,
                    fontFamily: tokens.fonts.display,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.14,
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 'clamp(12.5px, 1.05vw, 16px)',
                    lineHeight: 1.55,
                    fontFamily: tokens.fonts.body,
                    fontWeight: 400,
                    margin: 0,
                    maxWidth: '94%',
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
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        marginTop: 'clamp(28px, 3.5vw, 48px)',
      }}>
        {/* Prev */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={prev}
          aria-label="Previous slide"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid rgba(241,106,36,0.18)',
            background: '#fff',
            color: tokens.onSurface,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(16,24,40,0.1)',
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
                width: i === current ? 28 : 8,
                height: 8,
                borderRadius: 100,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: i === current
                  ? 'linear-gradient(90deg, #f16a24, #f16a24)'
                  : 'rgba(0,0,0,0.15)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={next}
          aria-label="Next slide"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid rgba(241,106,36,0.18)',
            background: '#fff',
            color: tokens.onSurface,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(16,24,40,0.1)',
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
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        marginTop: 14,
        fontSize: 13,
        color: tokens.secondary,
        fontFamily: tokens.fonts.body,
        fontWeight: 600,
        letterSpacing: '0.05em',
      }}>
        <span style={{ color: tokens.primary }}>{String(current + 1).padStart(2, '0')}</span>
        <span style={{ opacity: 0.4 }}> / {String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
