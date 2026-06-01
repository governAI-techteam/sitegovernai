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
      <div className="hide-on-mobile">
        <Blob top="-15%" right="5%" size={500} />
      </div>
      <div className="hide-on-mobile">
        <Blob bottom="10%" left="-5%" size={350} color="rgba(0,98,161,.07)" />
      </div>

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
          <div
            style={{
              flex: '1 1 55%',
              textAlign: 'left',
            }}
          >
            <FadeIn delay={0.3} yOffset={20}>
              <h1
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: 'clamp(24px, 3.5vw, 46px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  marginBottom: 'clamp(16px, 2.5vw, 28px)',
                  color: tokens.onSurface,
                }}
              >
                Governing{' '}
                <br />
                <span style={{ color: tokens.primary }}>Artificial Intelligence</span>{' '}
                <br />
                <span style={{ whiteSpace: 'nowrap' }}>
                  for a{' '}
                  <span style={{ color: tokens.primary, display: 'inline-block', minWidth: '20ch' }}>
                    <Typewriter
                      words={['Responsible Future.', 'Smart & Safe World.', 'Trusted Tomorrow.']}
                    />
                  </span>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} yOffset={20}>
              <p
                style={{
                  fontSize: 'clamp(15px, 1.3vw, 18px)',
                  color: tokens.secondary,
                  maxWidth: 540,
                  lineHeight: 1.7,
                  marginBottom: 'clamp(28px, 3.5vw, 44px)',
                }}
              >
                GovernAI provides the architectural framework to deploy, monitor,
                and scale AI systems with absolute compliance and zero bias. We
                specialize in robust capacity building, strategic policy
                formulation, and empowering organizations to govern AI technologies
                responsibly.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} yOffset={20}>
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2, background: '#d45a1a' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById('solutions');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    background: tokens.primary,
                    color: '#fff',
                    padding: '16px 36px',
                    borderRadius: 14,
                    fontSize: 16,
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: `0 10px 30px -10px ${tokens.primary}66`,
                    fontFamily: tokens.fonts.display,
                    transition: 'all 0.2s ease',
                  }}
                >
                  Explore Solutions
                </motion.button>
              </div>
            </FadeIn>
          </div>

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