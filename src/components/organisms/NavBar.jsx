'use client';

import { useState, useEffect } from 'react';
import { tokens } from '@/theme/tokens';
import { NAV_ITEMS } from '@/config/content';
import { useScroll } from '@/context/ScrollContext';
import { Container } from '@/components/atoms/Container';
import { Icon } from '@/components/atoms/Icon';
import Image from 'next/image';

function NavLink({ label, active, onClick, mobile }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: mobile ? '12px 0' : '4px 0 6px',
        width: mobile ? '100%' : 'auto',
        textAlign: mobile ? 'left' : 'center',
        fontFamily: tokens.fonts.display,
        fontWeight: 500,
        fontSize: mobile ? 16 : 14,
        letterSpacing: '0.01em',
        color: active
          ? tokens.primary
          : hov
            ? tokens.onSurface
            : tokens.secondary,
        borderBottom: mobile
          ? `1px solid ${tokens.outlineVariant}`
          : '2px solid transparent',
        transition: 'color .2s',
      }}
    >
      {label}
    </button>
  );
}

export function NavBar({ activeSection }) {
  const scrollTo = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollTo(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(247,249,251,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,.06)' : 'none',
        transition: 'background .3s, box-shadow .3s, backdrop-filter .3s',
      }}
    >
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: scrolled ? '12px 24px' : '18px 24px',
          transition: 'padding .3s',
        }}
      >
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Image
            src="/assets/img/logo.png"
            alt="GovernAI"
            width={140}
            height={37}
            priority
            style={{
              width: 'auto',
              height: scrolled ? 32 : 36,
              transition: 'height .3s',
              display: 'block',
            }}
          />
        </button>

        <div
          className="hide-on-mobile"
          style={{ display: 'flex', gap: 32, alignItems: 'center' }}
        >
          {NAV_ITEMS.map(({ label, sectionId }) => (
            <NavLink
              key={sectionId}
              label={label}
              active={activeSection === sectionId}
              onClick={() => scrollTo(sectionId)}
            />
          ))}
        </div>

        <div className="hide-on-mobile" style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              const el = document.getElementById('founder');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: '#191c1e',
              color: '#fff',
              padding: '8px 20px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: tokens.fonts.display,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background .2s',
            }}
          >
            Contact Us
          </button>
        </div>

        <button
          className="show-flex-on-mobile"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: tokens.onSurface,
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={28} />
        </button>
      </Container>

      {isMobileMenuOpen && (
        <div
          className="hide-on-desktop"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#fff',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: 99,
            padding: '16px 24px',
            borderTop: `1px solid ${tokens.outlineVariant}`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {NAV_ITEMS.map(({ label, sectionId }) => (
              <NavLink
                key={sectionId}
                label={label}
                active={activeSection === sectionId}
                onClick={() => handleNavClick(sectionId)}
                mobile
              />
            ))}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                marginTop: 16,
              }}
            >
              <button
                onClick={() => {
                  const el = document.getElementById('founder');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  background: '#191c1e',
                  color: '#fff',
                  padding: '12px',
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: tokens.fonts.display,
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
