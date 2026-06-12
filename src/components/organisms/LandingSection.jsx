'use client';

import { useRouter } from 'next/navigation';
import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { Typewriter } from '@/components/atoms/Typewriter';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const IndiaConquestMap = dynamic(
  () => import('@/components/atoms/IndiaConquestMap'),
  { ssr: false }
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  },
});

export function LandingSection({ sectionRefs }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  return (
    <Section
      id="hero"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      aria-label="Hero — Governing AI for a Responsible Future"
      className="mobile-pt-sm mobile-pb-sm mobile-padding hero-section-mobile"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile
          ? 'calc(env(safe-area-inset-top, 0px) + 92px) 22px 48px'
          : 'clamp(60px, 8vh, 100px) 24px clamp(40px, 5vh, 70px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
      }}
    >
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
              gap: 'clamp(16px, 1.5vw, 28px)',
              paddingLeft: 'clamp(0px, 0.5vw, 12px)',
            }}
          >
            <div style={{ flex: '1 1 52%', textAlign: isMobile ? 'left' : 'left', marginTop: isMobile ? 0 : '1.5vw' }}>
            {/* Headline — Staggered Line Reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: isMobile ? 'clamp(29px, 8.5vw, 38px)' : 'clamp(24px, 3.2vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: isMobile ? '20px' : 'clamp(28px, 3vw, 40px)',
                color: tokens.onSurface,
              }}
            >
              {isMobile ? (
                /* MOBILE: Three-line layout */
                <>
                  <motion.span variants={lineVariants} style={{ display: 'block', marginBottom: 4 }}>
                    Governing
                  </motion.span>
                  <motion.span variants={lineVariants} style={{ display: 'block', marginBottom: 4 }}>
                    Artificial Intelligence
                  </motion.span>
                  <motion.span variants={lineVariants} style={{ display: 'block' }}>
                    for a{' '}
                    <span style={{
                      display: 'inline-block',
                      color: tokens.primary,
                    }}>
                      <Typewriter
                        words={['Responsible Future.', 'Smart & Safe World.', 'Trusted Tomorrow.']}
                      />
                    </span>
                  </motion.span>
                </>
              ) : (
                /* DESKTOP: Original two-line layout (unchanged) */
                <>
                  <motion.span variants={lineVariants} style={{ display: 'block', marginBottom: 8 }}>
                    Governing Artificial Intelligence
                  </motion.span>
                  <motion.span variants={lineVariants} style={{ display: 'block' }}>
                    for a{' '}
                    <span style={{
                      display: 'inline-block',
                      color: tokens.primary,
                    }}>
                      <Typewriter
                        words={['Responsible Future.', 'Smart & Safe World.', 'Trusted Tomorrow.']}
                      />
                    </span>
                  </motion.span>
                </>
              )}
            </motion.h1>

            {/* Subtitle — Clip reveal */}
            <motion.p
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                fontSize: isMobile ? '15.5px' : 'clamp(17px, 1.3vw, 19px)',
                color: tokens.secondary,
                maxWidth: isMobile ? '100%' : 440,
                lineHeight: isMobile ? 1.68 : 1.65,
                marginBottom: isMobile ? 30 : 18,
                fontFamily: tokens.fonts.body,
              }}
            >
              GovernAI provides the architectural framework to deploy, monitor,
              and scale AI systems with confidence. We
              specialize in robust capacity building, strategic policy
              formulation, and empowering organizations to develop AI technologies
              responsibly.
            </motion.p>

            {/* CTAs — with animated gradient border on primary */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'flex', gap: isMobile ? 12 : 14, flexWrap: 'wrap', position: 'relative', top: isMobile ? 0 : 16, justifyContent: isMobile ? 'flex-start' : 'flex-start', width: isMobile ? '100%' : undefined, flexDirection: isMobile ? 'column' : 'row' }}
            >
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
                  padding: isMobile ? '15px 28px' : '16px 36px',
                  borderRadius: 14,
                  fontSize: isMobile ? 15 : 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(234, 105, 38, 0.35), 0 2px 8px rgba(0,0,0,0.08)',
                  fontFamily: tokens.fonts.display,
                  letterSpacing: '0.02em',
                  position: 'relative',
                  overflow: 'hidden',
                  width: isMobile ? '100%' : undefined,
                }}
              >
                {/* Shimmer sweep effect */}
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  animation: 'shimmer-sweep 3s ease-in-out infinite',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>Explore Solutions</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push('/contact')}
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                  color: tokens.onSurface,
                  padding: isMobile ? '15px 28px' : '16px 36px',
                  borderRadius: 14,
                  fontSize: isMobile ? 15 : 15,
                  fontWeight: 600,
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  fontFamily: tokens.fonts.display,
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : undefined,
                }}
              >
                Contact Us
              </motion.button>
            </motion.div>

            {/* Trust strip — enterprise credibility (mobile) */}
            {isMobile && (
              <motion.div
                variants={fadeUp(0.35)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(0,0,0,0.07)',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: tokens.textMuted,
                    lineHeight: 1.5,
                    fontFamily: tokens.fonts.body,
                  }}
                >
                  Trusted by leading institutions,
                  <br />
                  enterprises &amp; government bodies
                </span>
              </motion.div>
            )}
          </div>

          {/* Hero Visual — India Conquest Map */}
          <motion.div
            className="hide-on-mobile"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              flex: '1 1 48%',
              position: 'relative',
            }}
          >
            <div style={{ position: 'relative', zIndex: 4, maxWidth: 'min(100%, 70vh)', margin: '0 0 0 auto' }}>
              <IndiaConquestMap />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}