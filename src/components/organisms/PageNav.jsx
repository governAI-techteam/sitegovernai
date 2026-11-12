'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/atoms/SafeImage';
import { tokens } from '@/theme/tokens';
import { AnnouncementBanner } from '@/components/organisms/AnnouncementBanner';

const LINKS = [
  { label: 'Footprints', href: '/#platform' },
  { label: 'Domains', href: '/#domains' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Team', href: '/#team' },
];

/*
  Lightweight top nav for standalone routes (e.g. /contact).
  Always uses the scrolled/solid glass style since these pages
  don't have a transparent hero behind the bar.
*/
export function PageNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <AnnouncementBanner />
      <div className="page-nav-wrap" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <nav
          className="page-nav-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)'
              : '0 1px 3px rgba(0,0,0,0.03)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <motion.img
              src="/assets/img/logo.webp"
              alt="GovernAI"
              whileHover={{ scale: 1.02 }}
              onError={(e) => { if (e.target.src.includes('.webp')) e.target.src = '/assets/img/logo.png'; }}
              style={{ height: 30, objectFit: 'contain', cursor: 'pointer' }}
            />
          </Link>

          <div className="page-nav-links">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  padding: '8px 16px',
                  fontFamily: tokens.fonts.body,
                  fontSize: 14,
                  fontWeight: 500,
                  color: tokens.secondary,
                  textDecoration: 'none',
                  borderRadius: 10,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = tokens.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = tokens.secondary)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.span
              className="page-nav-cta"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #191c1e 0%, #2d3133 100%)',
                color: '#fff',
                fontFamily: tokens.fonts.display,
                fontWeight: 700,
                letterSpacing: '0.02em',
                boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </motion.span>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
