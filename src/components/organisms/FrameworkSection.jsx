'use client';

import { tokens } from '@/theme/tokens';
import { DEFAULT_FRAMEWORK } from '@/config/content';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';
import { FrameworkNode } from '@/components/molecules/FrameworkNode';

export function FrameworkSection({ sectionRefs }) {
  return (
    <Section
      id="framework"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      style={{ padding: '120px 24px', overflow: 'hidden' }}
    >
      <Container style={{ position: 'relative' }}>
        {[800, 600].map((s) => (
          <div
            key={s}
            style={{
              position: 'absolute',
              width: s,
              height: s,
              borderRadius: '50%',
              border: `1px solid ${tokens.primary}`,
              opacity: 0.035,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              pointerEvents: 'none',
            }}
          />
        ))}
        <SectionHead align="center" title="The Sentinel" accent="Framework." />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {DEFAULT_FRAMEWORK.map((step, i) => (
            <div key={step.label} style={{ display: 'contents' }}>
              <FrameworkNode {...step} />
              {i < DEFAULT_FRAMEWORK.length - 1 && (
                <div
                  style={{
                    flex: '1 1 28px',
                    maxWidth: 60,
                    height: 1,
                    background: tokens.outlineVariant,
                    opacity: 0.45,
                    margin: '0 4px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
