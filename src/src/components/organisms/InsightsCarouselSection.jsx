'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SafeImage } from '@/components/atoms/SafeImage';
import { insightsData, slugify } from '@/config/insightsData';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';

/* Returns a windowed slice of dot indices so a long carousel
   shows a compact, centered set of dots instead of overflowing. */
function getDotWindow(current, total, maxVisible) {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i);
  }
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(0, current - half);
  const end = Math.min(total - 1, start + maxVisible - 1);
  start = Math.max(0, end - maxVisible + 1);
  const arr = [];
  for (let i = start; i <= end; i += 1) arr.push(i);
  return arr;
}

export default function InsightsCarouselSection() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = insightsData.length;
  const trackRef = useRef(null);
  const isMobile = useIsMobile();

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

  /* ── Layout values — mobile vs desktop ── */
  const slideWidth = isMobile ? '85%' : '56%';
  const slideOffset = isMobile ? '7.5%' : '22%';
  const slideGap = isMobile ? '12px' : 'clamp(12px, 1.5vw, 24px)';
  const slideAspect = isMobile ? '4 / 3' : '16 / 11';
  const slideRadius = isMobile ? 18 : 29;

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #fafbfc 0%, #f7f9fb 50%, #fff6ef 100%)',
        padding: isMobile ? '48px 0' : 'clamp(72px, 8vw, 120px) 0',
        overflow: 'hidden',
        position: 'relative',
      }}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="insights-heading"
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
          padding: isMobile ? '0 20px' : '0 24px',
          marginBottom: isMobile ? '28px' : 'clamp(40px, 5vw, 72px)',
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
        <h2 id="insights-heading" style={{
          fontFamily: tokens.fonts.display,
          fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 50px)',
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
          fontSize: isMobile ? '14px' : 'clamp(15px, 1.2vw, 18px)',
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
            gap: slideGap,
            transition: 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
            transform: `translateX(calc(${slideOffset} - ${current} * (${slideWidth} + ${slideGap})))`,
            alignItems: 'center',
          }}
        >
          {insightsData.map((item, i) => {
            const isActive = i === current;
            return (
              <article
                key={item.id}
                onClick={() => {
                  if (isActive) {
                    router.push(`/insights/${slugify(item.title)}/`);
                  } else {
                    goTo(i);
                  }
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${total}: ${item.title}`}
                style={{
                  flex: `0 0 ${slideWidth}`,
                  position: 'relative',
                  aspectRatio: slideAspect,
                  overflow: 'hidden',
                  borderRadius: slideRadius,
                  background: '#1a1a1a',
                  transition: 'all 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1)' : 'scale(0.9)',
                  filter: isActive ? 'none' : 'brightness(0.95)',
                  cursor: isActive ? 'default' : 'pointer',
                  boxShadow: isActive
                    ? isMobile
                      ? '0 20px 50px rgba(16,24,40,0.24), 0 8px 20px rgba(241,106,36,0.1)'
                      : '0 30px 70px rgba(16,24,40,0.28), 0 12px 28px rgba(241,106,36,0.12)'
                    : '0 12px 32px rgba(16,24,40,0.12)',
                }}
              >
                {/* Blurred backdrop fill */}
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

                {/* Foreground image */}
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

                {/* Bottom Gradient Band */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: isMobile ? '65%' : '55%',
                  background: 'linear-gradient(to top, rgba(8,8,10,0.95) 0%, rgba(8,8,10,0.85) 30%, rgba(8,8,10,0.5) 65%, rgba(8,8,10,0) 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '6px' : 'clamp(8px, 0.9vw, 12px)',
                  padding: isMobile ? '16px' : 'clamp(22px, 3vw, 44px)',
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
                      padding: isMobile ? '4px 10px 4px 7px' : '6px 13px 6px 9px',
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
                        fontSize: isMobile ? '11px' : 'clamp(11px, 0.85vw, 13px)',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        fontFamily: tokens.fonts.body,
                      }}>{item.location}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 style={{
                    color: '#fff',
                    fontSize: isMobile ? '16px' : 'clamp(19px, 1.9vw, 30px)',
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
                    fontSize: isMobile ? '12px' : 'clamp(12.5px, 1.05vw, 16px)',
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
        justifyContent: 'space-between',
        gap: 0,
        width: isMobile ? '85%' : '56%',
        margin: isMobile ? '40px auto 0' : 'clamp(28px, 3.5vw, 48px) auto 0',
      }}>
        {/* Prev */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={prev}
          aria-label="Previous slide"
          style={{
            width: isMobile ? 44 : 48,
            height: isMobile ? 44 : 48,
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

        {/* Dots — windowed for long carousels */}
        <div
          style={{
            display: 'flex',
            flex: isMobile ? '0 0 auto' : '1 1 auto',
            gap: isMobile ? 11 : 0,
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'space-between',
            height: 12,
            padding: isMobile ? 0 : '0 18px',
          }}
        >
          {(() => {
            const maxVisible = isMobile ? 9 : total;
            const window = getDotWindow(current, total, maxVisible);
            const first = window[0];
            const last = window[window.length - 1];
            return window.map((idx) => {
              const isActive = idx === current;
              const edgeStart = idx === first && first !== 0;
              const edgeEnd = idx === last && last !== total - 1;
              const nearStart = idx === window[1] && first !== 0;
              const nearEnd = idx === window[window.length - 2] && last !== total - 1;

              let dotScale = 1;
              if (edgeStart || edgeEnd) dotScale = 0.45;
              else if (nearStart || nearEnd) dotScale = 0.7;

              return (
                <motion.button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    width: isActive ? (isMobile ? 28 : 30) : 8,
                    height: 8,
                    flexShrink: 0,
                    borderRadius: 100,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transformOrigin: 'center',
                    transform: isActive ? 'scale(1)' : `scale(${dotScale})`,
                    background: isActive ? tokens.primary : 'rgba(0,0,0,0.18)',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  whileHover={{ scale: isActive ? 1 : dotScale * 1.25 }}
                />
              );
            });
          })()}
        </div>

        {/* Next */}
        <motion.button
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          onClick={next}
          aria-label="Next slide"
          style={{
            width: isMobile ? 44 : 48,
            height: isMobile ? 44 : 48,
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
        marginTop: isMobile ? 18 : 14,
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
