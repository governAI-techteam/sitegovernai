'use client';

import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { Blob } from '@/components/atoms/Blob';
import { FadeIn } from '@/components/atoms/FadeIn';
import { Typewriter } from '@/components/atoms/Typewriter';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const GovernanceCore3D = dynamic(() => import('@/components/atoms/GovernanceCore3D'), {
  ssr: false,
});

const trustBadges = [
  { label: 'ISO 42001', icon: 'verified' },
  { label: 'EU AI Act', icon: 'shield' },
  { label: 'NIST Aligned', icon: 'security' },
];

export function LandingSection({ sectionRefs }) {
  return (
    <Section
      id="hero"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      className="mobile-pt-sm mobile-pb-sm mobile-padding hero-section-mobile"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 24px 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background Blobs */}
      <div className="hide-on-mobile">
        <Blob top="-15%" right="5%" size={500} />
      </div>
      <div className="hide-on-mobile">
        <Blob bottom="10%" left="-5%" size={350} color="rgba(0,98,161,.07)" />
      </div>

      {/* Subtle dot pattern */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div
          className="responsive-flex"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(40px, 5vw, 80px)',
            paddingLeft: 'clamp(0px, 2vw, 40px)',
          }}
        >
          <div style={{ flex: '1 1 55%', textAlign: 'left' }}>
            {/* Trust Badges */}
            <FadeIn delay={0.2} yOffset={15}>
              <div style={{
                display: 'flex',
                gap: 10,
                marginBottom: 28,
                flexWrap: 'wrap',
              }}>
                {trustBadges.map((b) => (
                  <div
                    key={b.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 14px',
                      borderRadius: 100,
                      background: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(0,0,0,0.06)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: tokens.secondary,
                      fontFamily: tokens.fonts.body,
                      letterSpacing: '0.02em',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Material Symbols Outlined',
                      fontSize: 14,
                      color: tokens.primary,
                      fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24",
                    }}>
                      {b.icon}
                    </span>
                    {b.label}
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn delay={0.3} yOffset={20}>
              <h1
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 'clamp(28px, 3.8vw, 52px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.08,
                  marginBottom: 'clamp(16px, 2.5vw, 28px)',
                  color: tokens.onSurface,
                }}
              >
                Governing{' '}
                <br />
                <span style={{
                  color: tokens.primary,
                  backgroundImage: 'linear-gradient(135deg, #ea6926, #ff8c42)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Artificial Intelligence
                </span>{' '}
                <br />
                <span style={{ whiteSpace: 'nowrap' }}>
                  for a{' '}
                  <span style={{
                    color: tokens.primary,
                    display: 'inline-block',
                    minWidth: '18ch',
                    backgroundImage: 'linear-gradient(135deg, #ea6926, #ff8c42)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    <Typewriter
                      words={['Responsible Future.', 'Smart & Safe World.', 'Trusted Tomorrow.']}
                    />
                  </span>
                </span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn delay={0.4} yOffset={20}>
              <p
                style={{
                  fontSize: 'clamp(15px, 1.3vw, 18px)',
                  color: tokens.secondary,
                  maxWidth: 520,
                  lineHeight: 1.75,
                  marginBottom: 'clamp(28px, 3.5vw, 44px)',
                  fontFamily: tokens.fonts.body,
                }}
              >
                GovernAI provides the architectural framework to deploy, monitor,
                and scale AI systems with absolute compliance and zero bias. We
                specialize in robust capacity building, strategic policy
                formulation, and empowering organizations to govern AI technologies
                responsibly.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.5} yOffset={20}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const el = document.getElementById('domains');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: tokens.primaryGrad,
                    color: '#fff',
                    padding: '16px 36px',
                    borderRadius: 14,
                    fontSize: 15,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 28px rgba(234, 105, 38, 0.35), 0 2px 8px rgba(0,0,0,0.08)',
                    fontFamily: tokens.fonts.display,
                    letterSpacing: '0.02em',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>Explore Solutions</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const el = document.getElementById('founder');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    color: tokens.onSurface,
                    padding: '16px 36px',
                    borderRadius: 14,
                    fontSize: 15,
                    fontWeight: 700,
                    border: '1.5px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    fontFamily: tokens.fonts.display,
                    letterSpacing: '0.02em',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us
                </motion.button>
              </div>
            </FadeIn>
          </div>

          {/* 3D Element */}
          <div
            className="hide-on-mobile"
            style={{
              flex: '1 1 50%',
              minHeight: 500,
              position: 'relative',
            }}
          >
            <FadeIn delay={0.6} yOffset={30}>
              <GovernanceCore3D />
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}