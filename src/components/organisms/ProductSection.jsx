'use client';

import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { FadeIn } from '@/components/atoms/FadeIn';
import { Icon } from '@/components/atoms/Icon';
import { Blob } from '@/components/atoms/Blob';
import { motion } from 'framer-motion';

export function ProductSection() {
  return (
    <Section
      id="products"
      bg={tokens.surfaceLow}
      style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative Background Blobs */}
      <div className="hide-on-mobile">
        <Blob top="-10%" right="-5%" size={400} color="rgba(160, 65, 0, 0.03)" />
        <Blob bottom="-10%" left="-5%" size={350} color="rgba(0, 98, 161, 0.02)" />
      </div>

      <Container>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <FadeIn>
            <span
              style={{
                color: tokens.primary,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 16,
                display: 'block',
              }}
            >
              The Product Suite
            </span>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 800,
                color: tokens.onSurface,
                marginBottom: 24,
                letterSpacing: '-0.02em',
              }}
            >
              Unified Intelligence for <span style={{ color: tokens.primary }}>AI Governance</span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(16px, 1.2vw, 19px)',
                color: tokens.secondary,
                maxWidth: 640,
                margin: '0 auto',
                lineHeight: 1.6,
                opacity: 0.8,
              }}
            >
              The industry&apos;s first integrated ecosystem for automated compliance, transparency, and ethical AI oversight.
            </p>
          </FadeIn>
        </div>

        {/* Product Cards Grid */}
        <div
          className="responsive-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
          }}
        >
          {/* Cataloging Made Easy */}
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={cardStyle}
            >
              <div style={comingSoonBadgeStyle}>Coming Soon</div>
              <div style={iconBoxStyle}>
                <Icon name="inventory_2" size={26} style={{ color: tokens.primary }} />
              </div>
              <h3 style={cardTitleStyle}>Cataloging Made Easy</h3>
              <p style={cardDescStyle}>
                Effortlessly organize and manage your AI models and data assets. Our intuitive cataloging system ensures every component is documented and searchable.
              </p>
            </motion.div>
          </FadeIn>

          {/* AI Compliance Suite */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                ...cardStyle,
                background: 'linear-gradient(135deg, #191c1e 0%, #2c3e50 100%)',
                color: '#fff',
                boxShadow: '0 20px 45px rgba(0,0,0,0.15)',
                border: 'none',
              }}
            >
              <div style={comingSoonBadgeStyle}>Coming Soon</div>
              <div style={{ ...iconBoxStyle, background: 'rgba(255, 255, 255, 0.08)' }}>
                <Icon name="auto_awesome" size={26} style={{ color: '#fff' }} />
              </div>
              <h3 style={{ ...cardTitleStyle, color: '#fff' }}>AI Compliance Suite</h3>
              <p style={{ ...cardDescStyle, color: 'rgba(255, 255, 255, 0.65)' }}>
                An all-in-one platform for automated bias detection, ethical auditing, and regulatory reporting. Stay ahead of global AI mandates.
              </p>
            </motion.div>
          </FadeIn>

          {/* Vendor Risk Assessment */}
          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={cardStyle}
            >
              <div style={comingSoonBadgeStyle}>Coming Soon</div>
              <div style={iconBoxStyle}>
                <Icon name="radar" size={26} style={{ color: tokens.primary }} />
              </div>
              <h3 style={cardTitleStyle}>Vendor Risk Assessment</h3>
              <p style={cardDescStyle}>
                Comprehensive evaluation and monitoring of third-party AI integrations. Ensure your vendor ecosystem meets your internal security and ethics standards.
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

const cardStyle = {
  background: tokens.surfaceLowest,
  borderRadius: 32,
  padding: '48px 36px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
  border: `1px solid ${tokens.surfaceContainer}`,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  cursor: 'default',
  minHeight: 320,
};

const comingSoonBadgeStyle = {
  position: 'absolute',
  top: 28,
  right: 32,
  background: tokens.primary,
  color: '#fff',
  padding: '5px 14px',
  borderRadius: 100,
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const iconBoxStyle = {
  width: 56,
  height: 56,
  borderRadius: 18,
  background: 'rgba(160, 65, 0, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 32,
};

const cardTitleStyle = {
  fontFamily: tokens.fonts.display,
  fontSize: 24,
  fontWeight: 800,
  color: tokens.onSurface,
  marginBottom: 16,
  letterSpacing: '-0.01em',
};

const cardDescStyle = {
  fontSize: 15,
  color: tokens.secondary,
  lineHeight: 1.7,
  marginBottom: 0,
  flexGrow: 1,
};
