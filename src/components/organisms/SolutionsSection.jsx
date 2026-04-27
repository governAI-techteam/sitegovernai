'use client';

import { tokens } from '@/theme/tokens';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';
import { Icon } from '@/components/atoms/Icon';
import { motion } from 'framer-motion';

const TRISM_STEPS = [
  { label: 'Trust', icon: 'verified_user', desc: 'Ensuring model reliability & fairness', color: '#a04100' },
  { label: 'Risk', icon: 'warning', desc: 'Identifying & mitigating potential failures', color: '#c05200' },
  { label: 'Security', icon: 'security', desc: 'Protecting against adversarial attacks', color: '#d46a1a' },
  { label: 'Management', icon: 'settings', desc: 'Continuous lifecycle oversight', color: '#ff6b00' },
];

function TRiSMInfographic() {
  return (
    <div style={{
      background: 'rgba(160, 65, 0, 0.04)',
      padding: 24,
      borderRadius: 20,
      border: '1px solid rgba(160, 65, 0, 0.08)',
    }}>
      <h5 style={{
        fontFamily: tokens.fonts.display,
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 16,
        color: tokens.primary,
        letterSpacing: '-0.01em',
      }}>
        AI TRiSM Framework
      </h5>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 10,
      }}>
        {TRISM_STEPS.map((step) => (
          <motion.div
            key={step.label}
            whileHover={{ scale: 1.04, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              padding: '14px 12px',
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              cursor: 'default',
              borderLeft: `3px solid ${step.color}`,
            }}
          >
            <Icon name={step.icon} size={18} style={{ color: step.color }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: tokens.onSurface }}>{step.label}</div>
            <div style={{ fontSize: 11, color: tokens.secondary, lineHeight: 1.4 }}>{step.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ModelCardInfographic() {
  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.03)',
      padding: 24,
      borderRadius: 20,
      border: '1px solid rgba(15, 23, 42, 0.06)',
      marginTop: 16,
    }}>
      <h5 style={{
        fontFamily: tokens.fonts.display,
        fontSize: 15,
        fontWeight: 700,
        marginBottom: 16,
        color: tokens.onSurface,
        letterSpacing: '-0.01em',
      }}>
        Standardized Model Card
      </h5>
      <div style={{
        background: '#fff',
        borderRadius: 14,
        padding: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: tokens.onSurface }}>Model ID</span>
          <span style={{ fontSize: 12, color: tokens.primary, fontWeight: 600 }}>GovernAI-v2.4</span>
        </div>
        <div style={{ fontSize: 12, color: tokens.secondary, lineHeight: 1.5 }}>
          <strong style={{ color: tokens.onSurface }}>Intended Use:</strong> Automated bias detection in financial models
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Fairness', 'Transparency', 'Ethics', 'Compliance'].map(tag => (
            <span key={tag} style={{
              fontSize: 10,
              background: tokens.surfaceLow,
              padding: '3px 10px',
              borderRadius: 100,
              fontWeight: 600,
              color: tokens.secondary,
            }}>{tag}</span>
          ))}
        </div>
        <div style={{ height: 6, width: '100%', background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: '85%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ height: '100%', background: tokens.primary, borderRadius: 3 }}
          />
        </div>
        <div style={{ fontSize: 10, textAlign: 'right', color: tokens.secondary, fontWeight: 500 }}>Accuracy: 99.8%</div>
      </div>
    </div>
  );
}

function VisualPanel() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      borderRadius: 28,
      overflow: 'hidden',
      background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: '48px 36px',
      boxShadow: '0 30px 80px rgba(0,0,0,0.18), 0 0 60px -20px rgba(160,65,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      minHeight: 420,
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,65,0,0.25), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,0,0.15), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255, 255, 255, 0.08)', borderRadius: 100,
          padding: '6px 14px', marginBottom: 16,
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Governance Dashboard
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
      }}>
        {[
          { value: '99.8%', label: 'Bias Accuracy', icon: 'psychology' },
          { value: '142', label: 'Models Tracked', icon: 'inventory_2' },
          { value: 'A+', label: 'Compliance', icon: 'verified' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '16px 14px',
            border: '1px solid rgba(255,255,255,0.15)',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}>
            <Icon name={stat.icon} size={20} style={{ color: '#fff', opacity: 0.8, marginBottom: 6, display: 'block' }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: tokens.fonts.display }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mini risk bars */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { label: 'Fairness Index', pct: 92, color: '#ff6b00' },
          { label: 'Transparency Score', pct: 88, color: '#d46a1a' },
          { label: 'Risk Exposure', pct: 15, color: '#c05200' },
        ].map(bar => (
          <div key={bar.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{bar.label}</span>
              <span style={{ fontSize: 11, color: bar.color, fontWeight: 700 }}>{bar.pct}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: `${bar.pct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                style={{ height: '100%', background: bar.color, borderRadius: 2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SolutionsSection({ sectionRefs }) {
  return (
    <Section
      id="solutions"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      className="mobile-p-sm mobile-padding"
      style={{ padding: '96px 24px' }}
    >
      <Container>
        <div
          className="mobile-col-gap-lg responsive-flex"
          style={{
            display: 'flex',
            gap: 60,
            alignItems: 'center',
          }}
        >
          {/* Left: Professional Visual Panel */}
          <div style={{ flex: '1 1 360px' }}>
            <VisualPanel />
          </div>

          {/* Right: Infographics */}
          <div style={{ flex: '1 1 360px' }}>
            <SectionHead
              title="Clarity in Every Layer of your"
              accent="AI Stack."
            />
            <TRiSMInfographic />
            <ModelCardInfographic />
          </div>
        </div>
      </Container>
    </Section>
  );
}
