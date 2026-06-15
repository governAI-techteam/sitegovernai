'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '@/context/ScrollContext';
import { tokens } from '@/theme/tokens';
import { SafeImage } from '@/components/atoms/SafeImage';
import { SITE } from '@/config/seo';
import { useIsMobile } from '@/hooks/useIsMobile';

const footerLinks = [
  {
    heading: 'Services',
    links: [
      { label: 'Capacity Building & Training', href: '#domains' },
      { label: 'Advocacy & Consultation', href: '#domains' },
      { label: 'AI Risk Assessment', href: '#domains' },
      { label: 'Compliance Advisory', href: '#domains' },
      { label: 'Policy Frameworks', href: '#domains' },
      { label: 'AI Readiness Assessments', href: '#domains' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#team' },
      { label: 'Our Team', href: '#team' },
      { label: 'Insights', href: '#insights' },
      { label: 'Clients', href: '#platform' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/assets/pdf/legal/GovernAI-Privacy-Policy.pdf' },
      { label: 'Terms of Use', href: '/assets/pdf/legal/GovernAI-Terms-of-Use.pdf' },
    ],
  },
  {
    heading: 'Insights',
    links: [
      { label: 'Panel on Responsible AI', href: '/insights/panel-on-responsible-ai/' },
      { label: 'View All Insights', href: '/#insights' },
    ],
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/governaiofficial/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://x.com/governaiofc',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:contact@governai.info',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export function Footer() {
  const scrollCtx = useScroll();
  const router = useRouter();
  const pathname = usePathname();
  const [showFab, setShowFab] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (href) => {
    if (!href.startsWith('#')) {
      router.push(href);
      return;
    }
    const id = href.substring(1);
    // On the home page we have the scroll context; elsewhere route home with hash.
    if (pathname === '/' && scrollCtx?.scrollTo) {
      scrollCtx.scrollTo(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <footer aria-label="Site footer" style={{
        background: '#0f0f11',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated top gradient line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #f16a24 25%, #f16a24 50%, #f16a24 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'footerGradient 4s linear infinite',
        }} />

        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(234, 105, 38, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '48px 20px 28px' : '80px 24px 40px',
          position: 'relative',
        }}>
          {/* Main Grid */}
          <motion.div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
            gap: isMobile ? 32 : 48,
          }}
          className="responsive-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          >
            {/* Brand Column */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <SafeImage
                src="/assets/img/logo.png"
                alt="GovernAI"
                style={{
                  height: 36,
                  filter: 'brightness(0) invert(1)',
                  marginBottom: 20,
                }}
              />
              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: 280,
                marginBottom: 24,
                fontFamily: tokens.fonts.body,
              }}>
                GovernAI provides the support to deploy, monitor, and scale AI systems with confidence. We specialize in robust capacity building, strategic policy formulation, and empowering organizations to develop AI technologies responsibly.
              </p>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: 10 }}>
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(234, 105, 38, 0.15)';
                      e.currentTarget.style.borderColor = 'rgba(234, 105, 38, 0.3)';
                      e.currentTarget.style.color = '#f16a24';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link Columns */}
            <nav aria-label="Footer navigation" style={{ display: 'contents' }}>
            {footerLinks.map((col) => (
              <motion.div
                key={col.heading}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <h4 style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 20,
                  fontFamily: tokens.fonts.display,
                }}>
                  {col.heading}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.label} style={{ marginBottom: 12 }}>
                      <motion.a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        whileHover={{ x: 3 }}
                        style={{
                          color: 'rgba(255,255,255,0.55)',
                          textDecoration: 'none',
                          fontSize: 14,
                          fontFamily: tokens.fonts.body,
                          fontWeight: 400,
                          transition: 'color 0.2s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#f16a24'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            </nav>
          </motion.div>

          {/* Separator */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            margin: '48px 0 24px',
          }} />

          {/* Bottom Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : undefined,
          }}>
            <p style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.35)',
              fontFamily: tokens.fonts.body,
            }}>
              © {new Date().getFullYear()} GovernAI. All rights reserved.
            </p>

            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {[
                { label: 'Privacy Policy', pdf: '/content.pdf' },
                { label: 'Terms of Use', pdf: '/content.pdf' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.35)',
                    textDecoration: 'none',
                    fontFamily: tokens.fonts.body,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <p style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.25)',
              fontFamily: tokens.fonts.body,
            }}>
                Built by{' '}
              <a
                href="https://divyakush2006.github.io/divyakush-resume/"
                target="_blank"
                rel="me noopener"
                style={{
                  color: 'rgba(234, 105, 38, 0.6)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Divyakush Punjabi
              </a>
              {' • '}
              <a
                href="https://www.linkedin.com/in/adityaudiya337315/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(234, 105, 38, 0.6)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Aditya Udiya
              </a>
              {' • '}
              <a
                href="https://www.linkedin.com/in/infrabyanubhav/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(234, 105, 38, 0.6)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Anubhav Sharma
              </a>
            </p>
          </div>
        </div>

        <style>{`
          @keyframes footerGradient {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </footer>

      {/* Scroll-to-top FAB */}
      <AnimatePresence>
        {showFab && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.1, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              bottom: isMobile ? 16 : 28,
              right: isMobile ? 16 : 28,
              width: 48,
              height: 48,
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #191c1e 0%, #2d3133 100%)',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
            }}
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
