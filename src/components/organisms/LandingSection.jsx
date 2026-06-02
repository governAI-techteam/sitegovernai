'use client';

import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { Blob } from '@/components/atoms/Blob';
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

/* Stagger variants for hero text lines */
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
  return (
    <Section
      id="hero"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      className="mobile-pt-sm mobile-pb-sm mobile-padding hero-section-mobile"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(140px, 16vh, 200px) 24px clamp(80px, 8vw, 120px)',
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
            {/* Headline — Staggered Line Reveal */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(28px, 3.8vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                marginBottom: 'clamp(16px, 2.5vw, 28px)',
                color: tokens.onSurface,
              }}
            >
              <motion.span variants={lineVariants} style={{ display: 'block' }}>
                Governing
              </motion.span>
              <motion.span
                variants={lineVariants}
                style={{
                  display: 'block',
                  backgroundImage: 'linear-gradient(135deg, #ea6926, #ff8c42)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
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
            </motion.h1>

            {/* Subtitle — Clip reveal */}
            <motion.p
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                color: tokens.secondary,
                maxWidth: 520,
                lineHeight: 1.75,
                marginBottom: 24,
                fontFamily: tokens.fonts.body,
              }}
            >
              GovernAI provides the architectural framework to deploy, monitor,
              and scale AI systems with absolute compliance and zero bias. We
              specialize in robust capacity building, strategic policy
              formulation, and empowering organizations to govern AI technologies
              responsibly.
            </motion.p>

            {/* Trust Badges with shimmer hover */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 'clamp(24px, 3vw, 36px)',
                flexWrap: 'wrap',
              }}
            >
              {trustBadges.map((b) => (
                <motion.div
                  key={b.label}
                  whileHover={{ scale: 1.05, y: -2 }}
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
                    fontWeight: 500,
                    color: tokens.secondary,
                    fontFamily: tokens.fonts.body,
                    letterSpacing: '0.02em',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <span
                    className="badge-shimmer"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(234,105,38,0.08), transparent)',
                      transform: 'translateX(-100%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <span style={{
                    fontFamily: 'Material Symbols Outlined',
                    fontSize: 14,
                    color: tokens.primary,
                    fontVariationSettings: "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24",
                  }}>
                    {b.icon}
                  </span>
                  {b.label}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs — with animated gradient border on primary */}
            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
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

          {/* 3D Element */}
          <motion.div
            className="hide-on-mobile"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              flex: '1 1 50%',
              minHeight: 500,
              position: 'relative',
            }}
          >
            <GovernanceCore3D />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}