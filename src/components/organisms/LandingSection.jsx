'use client';

import { useRouter } from 'next/navigation';
import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { Typewriter } from '@/components/atoms/Typewriter';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

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
  return (
    <Section
      id="hero"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      className="mobile-pt-sm mobile-pb-sm mobile-padding hero-section-mobile"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(60px, 8vh, 100px) 24px clamp(40px, 5vh, 70px)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
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
            <div style={{ flex: '1 1 52%', textAlign: 'left', marginTop: '1.5vw' }}>
            {/* Headline — Staggered Line Reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(24px, 3.2vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.06em',
                lineHeight: 1.06,
                marginBottom: 'clamp(28px, 3vw, 40px)',
                color: tokens.onSurface,
              }}
            >
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
            </motion.h1>

            {/* Subtitle — Clip reveal */}
            <motion.p
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
fontSize: 'clamp(17px, 1.3vw, 19px)',
                    color: tokens.secondary,
                    maxWidth: 440,
                    lineHeight: 1.65,
                    marginBottom: 18,
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
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', position: 'relative', top: 16 }}
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
                  padding: '16px 36px',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(234, 105, 38, 0.35), 0 2px 8px rgba(0,0,0,0.08)',
                  fontFamily: tokens.fonts.display,
                  letterSpacing: '0.02em',
                  position: 'relative',
                  overflow: 'hidden',
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
                  padding: '16px 36px',
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 600,
                  border: '1.5px solid rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  fontFamily: tokens.fonts.display,
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease',
                }}
              >
                Contact Us
              </motion.button>
            </motion.div>
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