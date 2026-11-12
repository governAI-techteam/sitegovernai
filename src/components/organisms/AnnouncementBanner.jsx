'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    try {
      if (sessionStorage.getItem('governai_banner_dismissed') === 'true') {
        const timer = setTimeout(() => setVisible(false), 0);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    try {
      sessionStorage.setItem('governai_banner_dismissed', 'true');
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          role="region"
          aria-label="Announcement"
          style={{
            background: 'linear-gradient(90deg, #0b0d11 0%, #171b22 50%, #0b0d11 100%)',
            borderBottom: '1px solid rgba(241, 106, 36, 0.25)',
            position: 'relative',
            zIndex: 1001,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: isMobile ? '8px 12px' : '9px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              fontSize: isMobile ? '12px' : '13px',
              fontFamily: tokens.fonts.body,
              color: '#ffffff',
            }}
          >
            {/* Clickable Banner Content */}
            <Link
              href="/office-hours"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
                color: 'inherit',
                textDecoration: 'none',
                flex: 1,
                justifyContent: isMobile ? 'flex-start' : 'center',
              }}
            >
              {/* Pulsing Live Badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '2px 8px',
                  borderRadius: 100,
                  background: 'rgba(241, 106, 36, 0.18)',
                  border: '1px solid rgba(241, 106, 36, 0.45)',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#ff8c42',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#f16a24',
                    boxShadow: '0 0 6px #f16a24',
                  }}
                />
                Live Clinic
              </span>

              {/* Ticker Text */}
              <span style={{ fontWeight: 500, color: 'rgba(255, 255, 255, 0.92)' }}>
                {isMobile ? (
                  <>GovernAI Workflow Clinic: Revised Rates for UP Govt Officials</>
                ) : (
                  <>
                    <strong>GovernAI Workflow Clinic:</strong> Practical AI Guidance &amp; Task Resolution — Revised Rates for UP Govt Officials
                  </>
                )}
              </span>

              {/* Arrow */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#ff8c42',
                  fontWeight: 700,
                  fontSize: '12px',
                  gap: 3,
                }}
              >
                <span>View Passes</span>
                <span aria-hidden="true">→</span>
              </span>
            </Link>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                padding: '4px 6px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                lineHeight: 1,
                borderRadius: 4,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
