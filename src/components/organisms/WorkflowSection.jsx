'use client';

import { tokens } from '@/theme/tokens';
import { DEFAULT_WORKFLOW } from '@/config/content';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';

export function WorkflowSection({ sectionRefs }) {
  return (
    <Section
      id="workflow"
      sectionRefs={sectionRefs}
      bg={tokens.surfaceContainer}
      style={{ padding: '96px 24px' }}
    >
      <Container style={{ maxWidth: 740 }}>
        <SectionHead align="center" title="Deployment" accent="Journey." />
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 23,
              top: 0,
              bottom: 0,
              width: 3,
              background: 'rgba(160,65,0,.14)',
              borderRadius: 9999,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
            {DEFAULT_WORKFLOW.map((s) => (
              <div
                key={s.num}
                style={{ position: 'relative', paddingLeft: 74 }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 0,
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: s.active ? tokens.primary : tokens.primaryFixed,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: s.active
                      ? '0 4px 16px rgba(160,65,0,.4)'
                      : 'none',
                    outline: `4px solid ${tokens.surfaceContainer}`,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 12,
                      color: s.active ? '#fff' : tokens.primary,
                    }}
                  >
                    {s.num}
                  </span>
                </div>
                <h4
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 9,
                    color: tokens.onSurface,
                    fontFamily: tokens.fonts.display,
                  }}
                >
                  {s.title}
                </h4>
                <p
                  style={{
                    color: tokens.secondary,
                    lineHeight: 1.65,
                    fontSize: 14,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
