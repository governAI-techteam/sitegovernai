
'use client';

import { useState, useEffect } from 'react';
import { tokens } from '@/theme/tokens';

const ORANGE    = tokens.primary      || '#FF9D52';
const TEXT_MAIN = tokens.onBackground || '#0F172A';
const TEXT_MUTED = '#64748B';
const BG        = tokens.background   || '#F8FAFC';
const BORDER    = 'rgba(0,0,0,0.07)';



const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/governaiofficial' },
  { label: 'X',        href: 'https://x.com/governaiofc' },
  { label: 'Email',    href: 'mailto:contact@governai.info' },
];

const DEVELOPERS = [
  'Aditya Udiya',
  'Anubhav Sharma',
];

function NavLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <li style={{ listStyle: 'none' }}>
      <a
        href="#"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          color: hov ? ORANGE : TEXT_MUTED,
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          lineHeight: 1.5,
          transition: 'color 0.2s ease',
          display: 'inline-block',
        }}
      >
        {label}
      </a>
    </li>
  );
}

function SocialLink({ label, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        color: hov ? ORANGE : TEXT_MUTED,
        textDecoration: 'none',
        fontSize: '13px',
        transition: 'color 0.2s ease',
      }}
    >
      {label}
    </a>
  );
}

export function Footer() {
  const [fabVisible, setFabVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setFabVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <style>{css}</style>

      <footer style={styles.footer} className="footer-fade-in">
        <div style={styles.inner}>

          <div style={styles.colGrid} className="footer-col-grid">
            <div style={styles.brandCol}>
              <div style={styles.logoMark}>
                <span style={{ color: TEXT_MAIN }}>Govern</span>
                <span style={{ color: ORANGE }}>AI</span>
              </div>

              <p style={styles.description}>
                Empowering you to Govern AI Responsibly through advanced architectural frameworks and ethical compliance.
              </p>

              <div style={styles.contactBlock}>
                <a href="mailto:contact@governai.info" style={styles.contactLine}>
                  <span style={styles.contactIcon}>✉</span>
                  contact@governai.info
                </a>
                <p style={{ ...styles.contactLine, cursor: 'default' }}>
                  New Delhi, India
                </p>
              </div>
            </div>



          </div>

          <div style={styles.divider} />

          <div style={styles.bottomBar} className="footer-bottom-bar">
            <div style={styles.bottomLeft}>
              <p style={styles.copyright}>
                © {new Date().getFullYear()} GovernAI OPC Pvt. Ltd. · New Delhi, India.
                All rights reserved.
              </p>
              <p style={styles.devCredit}>
                Developed by{' '}
                {DEVELOPERS.map((name, i) => (
                  <span key={name}>
                    <span style={styles.devName}>{name}</span>
                    {i < DEVELOPERS.length - 2 && <span style={{ color: TEXT_MUTED }}>, </span>}
                    {i === DEVELOPERS.length - 2 && <span style={{ color: TEXT_MUTED }}> & </span>}
                  </span>
                ))}
              </p>
            </div>
            <div style={styles.socialRow}>
              {SOCIAL_LINKS.map((s, i) => (
                <span
                  key={s.label}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {i > 0 && (
                    <span style={{ color: BORDER, fontSize: '12px' }}>|</span>
                  )}
                  <SocialLink label={s.label} href={s.href} />
                </span>
              ))}
            </div>
          </div>

        </div>
      </footer>

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fab-btn"
        style={{
          ...styles.fab,
          opacity: fabVisible ? 1 : 0,
          pointerEvents: fabVisible ? 'auto' : 'none',
          transform: fabVisible ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        ↑
      </button>
    </>
  );
}

const styles = {
  footer: {
    width: '100%',
    backgroundColor: BG,
    borderTop: `1px solid ${BORDER}`,
  },

  inner: {
    maxWidth: '1800px',
    margin: '0 auto',
    paddingLeft: 'clamp(20px, 5vw, 80px)',
    paddingRight: 'clamp(20px, 5vw, 80px)',
    paddingTop: 'clamp(52px, 7vw, 80px)',
    paddingBottom: 'clamp(28px, 4vw, 44px)',
    boxSizing: 'border-box',
  },

  colGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr repeat(4, 1fr)',
    gap: 'clamp(24px, 3vw, 52px)',
    alignItems: 'start',
    width: '100%',
  },

  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    paddingRight: '16px',
  },

  logoMark: {
    fontSize: 'clamp(20px, 2vw, 24px)',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1,
    userSelect: 'none',
  },

  description: {
    fontSize: '14px',
    color: TEXT_MUTED,
    lineHeight: 1.68,
    maxWidth: '280px',
    margin: 0,
    letterSpacing: '-0.005em',
  },

  contactBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '2px',
  },

  contactLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '13px',
    color: TEXT_MUTED,
    textDecoration: 'none',
    margin: 0,
    letterSpacing: '-0.005em',
    transition: 'color 0.2s ease',
  },

  contactIcon: {
    fontSize: '12px',
    lineHeight: 1,
    flexShrink: 0,
  },

  navCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },

  colTitle: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: TEXT_MAIN,
    margin: '0 0 18px 0',
  },

  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: 0,
    margin: 0,
  },

  divider: {
    height: '1px',
    background: BORDER,
    margin: 'clamp(36px, 5vw, 56px) 0 0',
    width: '100%',
  },

  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    paddingTop: 'clamp(16px, 2.5vw, 22px)',
  },

  bottomLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  copyright: {
    fontSize: '12px',
    color: TEXT_MUTED,
    opacity: 0.6,
    margin: 0,
    letterSpacing: '0.01em',
  },

  devCredit: {
    fontSize: '11px',
    color: TEXT_MUTED,
    opacity: 0.5,
    margin: 0,
    letterSpacing: '0.01em',
  },

  devName: {
    color: ORANGE,
    opacity: 1,
    fontWeight: 500,
  },

  socialRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  fab: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    background: TEXT_MAIN,
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    lineHeight: 1,
    zIndex: 999,
    transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.25s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
};

const css = `
  @keyframes footerFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .footer-fade-in {
    animation: footerFadeIn 0.6s ease both;
  }

  .fab-btn:hover {
    transform: scale(1.1) !important;
    box-shadow: 0 8px 28px rgba(0,0,0,0.22) !important;
  }

  @media (max-width: 1100px) {
    .footer-col-grid {
      grid-template-columns: 1fr 1fr 1fr !important;
    }
  }

  @media (max-width: 720px) {
    .footer-col-grid {
      grid-template-columns: 1fr 1fr !important;
    }
    .footer-bottom-bar {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
  }

  @media (max-width: 480px) {
    .footer-col-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

