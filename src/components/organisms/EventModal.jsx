'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SafeImage } from '@/components/atoms/SafeImage';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';

const UNGA_PHOTOS = [
  {
    src: '/assets/img/unga/unga_1.jpg',
    title: 'Official India Affiliate Session',
    caption: 'Diplomats, policymakers, technologists, and builders convened at the Royal Norwegian Embassy in New Delhi for the ITU & UNDP Digital@UNGA session.',
  },
  {
    src: '/assets/img/unga/unga_2.jpg',
    title: 'AI for Inclusion: Access to Opportunity',
    caption: 'High-level dialogue exploring transitions from baseline AI connectivity to true human and institutional agency.',
  },
  {
    src: '/assets/img/unga/unga_3.jpg',
    title: 'Multilateral Dialogue & Safety Standards',
    caption: 'Cross-border discussion on actionable AI governance, sovereign safety benchmarks, and verifiable compliance.',
  },
  {
    src: '/assets/img/unga/unga_4.jpg',
    title: 'Cross-Border Ecosystem Exchange (🇮🇳🇳🇴)',
    caption: 'Strengthening collaborative technological partnerships between India, Norway, and global multilateral institutions.',
  },
  {
    src: '/assets/img/unga/unga_5.jpg',
    title: 'Collaborative Leadership & Public Readiness',
    caption: 'GovernAI collaborating with Wasabi AI, the Royal Norwegian Embassy, Mosaika Impact, and Manus AI to advance institutional AI safety.',
  },
];

export function EventModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const backdropRef = useRef(null);

  // Open modal on every site visit / page reload after preloader finishes
  useEffect(() => {
    // Listen for custom trigger to reopen on demand
    const handleReopen = () => setIsOpen(true);
    window.addEventListener('open-unga-modal', handleReopen);

    // Delay opening until the preloader completes (~2.2s)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-unga-modal', handleReopen);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % UNGA_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + UNGA_PHOTOS.length) % UNGA_PHOTOS.length);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Keyboard 'Escape' dismiss per light-dismiss guidance
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose, nextSlide, prevSlide]);

  // Autoplay slide showcase
  useEffect(() => {
    if (!isOpen || isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isOpen, isPaused, nextSlide]);

  const handleScrollToMoments = () => {
    handleClose();
    const el = document.getElementById('insights');
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <div
          ref={backdropRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="unga-modal-title"
          aria-describedby="unga-modal-desc"
          onClick={(e) => {
            // Light-dismiss: click outside the modal card closes the dialog
            if (e.target === backdropRef.current) {
              handleClose();
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '14px' : '24px',
            background: 'rgba(10, 14, 22, 0.76)',
            backdropFilter: 'blur(14px) saturate(140%)',
            WebkitBackdropFilter: 'blur(14px) saturate(140%)',
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 760,
              maxHeight: isMobile ? '94vh' : '88vh',
              overflowY: 'auto',
              background: '#ffffff',
              borderRadius: isMobile ? 22 : 28,
              boxShadow: '0 32px 80px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(241, 106, 36, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Accent Strip */}
            <div
              style={{
                height: 5,
                width: '100%',
                background: 'linear-gradient(90deg, #f16a24 0%, #ff8c42 50%, #f16a24 100%)',
                borderTopLeftRadius: isMobile ? 22 : 28,
                borderTopRightRadius: isMobile ? 22 : 28,
                flexShrink: 0,
              }}
            />

            {/* Close Button (✕) */}
            <button
              onClick={handleClose}
              aria-label="Close event spotlight modal"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(255, 255, 255, 0.94)',
                color: '#4a5568',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f7fafc';
                e.currentTarget.style.color = '#1a202c';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.94)';
                e.currentTarget.style.color = '#4a5568';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Body */}
            <div style={{ padding: isMobile ? '20px 18px 24px' : '28px 34px 32px' }}>
              {/* Eyebrow Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 13px',
                  borderRadius: 100,
                  background: 'rgba(241, 106, 36, 0.08)',
                  border: '1px solid rgba(241, 106, 36, 0.24)',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#f16a24',
                    boxShadow: '0 0 6px rgba(241, 106, 36, 0.6)',
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: tokens.primary,
                    fontFamily: tokens.fonts.body,
                  }}
                >
                  Official Affiliate Session · ITU &amp; UNDP Digital@UNGA 🇮🇳🇳🇴
                </span>
              </div>

              {/* Title & Subheading */}
              <h2
                id="unga-modal-title"
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: isMobile ? '20px' : '26px',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: tokens.onSurface,
                  margin: '0 0 6px 0',
                  lineHeight: 1.2,
                }}
              >
                ITU &amp; UNDP Digital@UNGA India Affiliate Session
              </h2>
              <div
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: isMobile ? '13.5px' : '15px',
                  fontWeight: 700,
                  color: tokens.primary,
                  marginBottom: 10,
                  letterSpacing: '-0.01em',
                }}
              >
                AI for Inclusion: From Access to Opportunity
              </div>
              <p
                id="unga-modal-desc"
                style={{
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: 1.6,
                  color: tokens.secondary,
                  margin: '0 0 18px 0',
                  fontFamily: tokens.fonts.body,
                }}
              >
                GovernAI collaborated as a <strong>Supporting Partner</strong> alongside <strong>Wasabi AI</strong>, the <strong>Royal Norwegian Embassy in New Delhi</strong>, <strong>Mosaika Impact</strong>, and <strong>Manus AI</strong>. Hosted at the Royal Norwegian Embassy, the high-level convening brought together diplomats, policymakers, technologists, and builders to explore how we move from basic AI access to true human and institutional agency.
              </p>

              {/* Partner Logos Banner Card — Full Width, Big & Visible */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1.5px solid rgba(241, 106, 36, 0.2)',
                  padding: isMobile ? '12px 10px 10px' : '16px 20px 14px',
                  marginBottom: 20,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ width: 20, height: 1.5, background: 'rgba(241, 106, 36, 0.35)' }} />
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: tokens.primary,
                      fontFamily: tokens.fonts.body,
                    }}
                  >
                    Convened &amp; Supported By
                  </span>
                  <span style={{ width: 20, height: 1.5, background: 'rgba(241, 106, 36, 0.35)' }} />
                </div>

                {/* Banner image — fills the container width without restrictive maxHeight clamping */}
                <div
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <SafeImage
                    src="/assets/img/unga/unga_partners.png"
                    alt="Convened and Supported by: Wasabi AI, Royal Norwegian Embassy in New Delhi, Mosaika Impact, Manus AI, GovernAI"
                    disableWebp
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: isMobile ? 85 : 125,
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              {/* Photo Showcase Carousel */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: '#0d1117',
                  marginBottom: 20,
                  boxShadow: '0 12px 32px -6px rgba(0,0,0,0.22)',
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Photo Viewer */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? 220 : 320,
                    overflow: 'hidden',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                      }}
                    >
                      <SafeImage
                        src={UNGA_PHOTOS[currentSlide].src}
                        alt={UNGA_PHOTOS[currentSlide].title}
                        disableWebp
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 35%',
                          display: 'block',
                        }}
                      />
                      {/* Gradient overlay for text legibility */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(10,12,18,0.92) 0%, rgba(10,12,18,0.4) 45%, transparent 75%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Counter Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 700,
                      fontFamily: tokens.fonts.body,
                      letterSpacing: '0.04em',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      zIndex: 2,
                    }}
                  >
                    {currentSlide + 1} / {UNGA_PHOTOS.length}
                  </div>

                  {/* Prev Button */}
                  <button
                    onClick={prevSlide}
                    aria-label="Previous event photo"
                    style={{
                      position: 'absolute',
                      left: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.88)',
                      border: 'none',
                      color: '#1a202c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 3,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      transition: 'transform 0.18s ease, background 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.background = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    aria-label="Next event photo"
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.88)',
                      border: 'none',
                      color: '#1a202c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 3,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      transition: 'transform 0.18s ease, background 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.background = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  {/* Slide Title & Caption Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: isMobile ? '12px 14px' : '16px 20px',
                      zIndex: 2,
                      color: '#ffffff',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: tokens.fonts.display,
                        fontSize: isMobile ? '13px' : '15px',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        marginBottom: 3,
                      }}
                    >
                      {UNGA_PHOTOS[currentSlide].title}
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? '11px' : '12.5px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.45,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      {UNGA_PHOTOS[currentSlide].caption}
                    </div>
                  </div>
                </div>

                {/* Dot Indicators */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '8px 0',
                    background: '#121620',
                  }}
                >
                  {UNGA_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: idx === currentSlide ? 20 : 6,
                        height: 6,
                        borderRadius: 100,
                        border: 'none',
                        background: idx === currentSlide ? '#f16a24' : 'rgba(255, 255, 255, 0.3)',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.25s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <button
                  onClick={handleClose}
                  style={{
                    padding: '11px 20px',
                    borderRadius: 12,
                    border: '1px solid rgba(0,0,0,0.12)',
                    background: '#ffffff',
                    color: tokens.secondary,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: tokens.fonts.body,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f7fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  Close
                </button>
                <button
                  onClick={handleScrollToMoments}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '11px 24px',
                    borderRadius: 12,
                    border: 'none',
                    background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                    color: '#ffffff',
                    fontSize: 13.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: tokens.fonts.display,
                    boxShadow: '0 6px 18px rgba(241, 106, 36, 0.32)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(241, 106, 36, 0.42)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(241, 106, 36, 0.32)';
                  }}
                >
                  <span>Explore in Moments</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Floating Reopen Pill when modal is closed */}
    {!isOpen && (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={() => setIsOpen(true)}
        aria-label="View latest event: ITU & UNDP Digital@UNGA India Affiliate Session"
        style={{
          position: 'fixed',
          bottom: isMobile ? 18 : 28,
          left: isMobile ? 16 : 28,
          zIndex: 990,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          padding: isMobile ? '8px 14px' : '9px 18px',
          borderRadius: 100,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(241, 106, 36, 0.3)',
          boxShadow: '0 8px 26px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(241, 106, 36, 0.12)',
          cursor: 'pointer',
          color: '#1a202c',
          fontFamily: tokens.fonts.display,
          fontSize: isMobile ? 11.5 : 12.5,
          fontWeight: 700,
          letterSpacing: '0.01em',
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#f16a24',
            boxShadow: '0 0 8px #f16a24',
          }}
        />
        <span>Latest Event: ITU &amp; UNDP Digital@UNGA</span>
        <span style={{ color: '#f16a24', fontSize: 13, marginLeft: 2 }}>&rarr;</span>
      </motion.button>
    )}
  </>
  );
}
