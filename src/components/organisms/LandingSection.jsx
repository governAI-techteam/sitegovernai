'use client';

import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { Blob } from '@/components/atoms/Blob';
import { FadeIn } from '@/components/atoms/FadeIn';
import { Typewriter } from '@/components/atoms/Typewriter';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WAVE_PATH =
  'M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 58-18 88-18 58 18 88 18v44h-528z';

const WAVE_LAYERS = [
  {
    id: 'wave-saffron',
    color: '#FF9933',
    opacity: 0.85,
    duration: '10s',
    delay: '0s',
    translateY: 0,
  },
  {
    id: 'wave-white',
    color: '#FFFFFF',
    opacity: 0.75,
    duration: '15s',
    delay: '-5s',
    translateY: 6,
  },
  {
    id: 'wave-green',
    color: '#138808',
    opacity: 1,
    duration: '20s',
    delay: '-8s',
    translateY: 12,
  },
];

function TricolorWaves() {
  return (
    <div style={waveContainerStyle}>
      <style>{waveKeyframes}</style>

      {WAVE_LAYERS.map((layer) => (
        <div key={layer.id} style={waveWrapperStyle(layer.translateY)}>
          <svg
            style={waveSvgStyle}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path id={layer.id} d={WAVE_PATH} />
            </defs>
            <g style={waveGroupStyle(layer.duration, layer.delay)}>
              <use
                href={`#${layer.id}`}
                x="50"
                y="3"
                fill={layer.color}
                fillOpacity={layer.opacity}
              />
              <use
                href={`#${layer.id}`}
                x="50"
                y="0"
                fill={layer.color}
                fillOpacity={layer.opacity * 0.65}
              />
            </g>
          </svg>
        </div>
      ))}

      <div style={waveLabelStyle}>
        
      </div>
    </div>
  );
}

const waveContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '60px',
  margin: 'clamp(20px, 5vw, 40px) auto clamp(10px, 3vw, 30px)',
  overflow: 'hidden',
  borderRadius: '12px',
  maxWidth: '2000px',
  background: 'rgba(0,0,0,0.01)',
};

const waveWrapperStyle = (translateY) => ({
  position: 'absolute',
  inset: 0,
  transform: `translateY(${translateY}px)`,
});

const waveSvgStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
};

const waveGroupStyle = (duration, delay) => ({
  animation: `move-wave ${duration} linear ${delay} infinite`,
});

const waveLabelStyle = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
};

const waveLabelTextStyle = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.92)',
  textShadow: '0 1px 6px rgba(0,0,0,0.28)',
  background: 'rgba(0,0,0,0.12)',
  padding: '4px 11px',
  borderRadius: '100px',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
};

const waveKeyframes = `
  @keyframes move-wave {
    0%   { transform: translateX(0);     }
    100% { transform: translateX(-50%);  }
  }
`;

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
        padding: '52px 24px 20px',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="hide-on-mobile">
          <Blob top="-10%" right="-5%" size={380} />
        </div>
        <div className="hide-on-mobile">
          <Blob bottom="-10%" left="-5%" size={300} color="rgba(0,98,161,.07)" />
        </div>

        <FadeIn delay={0.2} yOffset={20}>
          <Image
            src="/assets/img/logo.png"
            alt="GovernAI - AI Governance Platform"
            width={380}
            height={100}
            priority
            style={{
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              opacity: 1,
              zIndex: 0,
              margin: '0 auto clamp(20px, 4vw, 50px) auto',
              display: 'block',
            }}
          />
        </FadeIn>

        <FadeIn delay={0.4} yOffset={20}>
          <Container style={{ position: 'relative', zIndex: 1 }}>
            <h1
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(32px, 6vw, 72px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: 'clamp(5px, 3vw, 24px)',
                color: tokens.onSurface,
                minHeight: 'clamp(90px, 18vw, 160px)',
                padding: '0 20px',
              }}
            >
              Governing{' '}
              <span style={{ color: tokens.primary }}>Artificial Intelligence</span>{' '}
              <br />
              for a{' '}
              <span style={{ 
                display: 'inline-block', 
                minHeight: '1em', 
                marginTop: 'clamp(4px, 2vw, 30px)', 
                height: 'clamp(40px, 5vw, 50px)', 
                color: tokens.primary 
              }}>
                <Typewriter
                  words={['Responsible Future.', 'Smart & Safe World.', 'Trusted Tomorrow.'] || []}
                />
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 1.6vw, 19px)',
                color: tokens.secondary,
                maxWidth: 680,
                margin: '0 auto clamp(32px, 5vw, 48px)',
                lineHeight: 1.6,
                padding: '0 10px',
              }}
            >
              GovernAI provides the architectural framework to deploy, monitor,
              and scale AI systems with absolute compliance and zero bias. We
              specialize in robust capacity building, strategic policy
              formulation, and empowering organizations to govern AI technologies
              responsibly.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 16,
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 48,
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2, background: '#8a3800' }}
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
          </Container>
        </FadeIn>
      </div>
        
        <div style={{ width: '100%', marginTop: 'auto' }}>
          <TricolorWaves />
        </div>
    </Section>
  );
}