'use client';

import { tokens } from '@/theme/tokens';
import { DEFAULT_PROBLEMS } from '@/config/content';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';
import { Icon } from '@/components/atoms/Icon';

function ProblemRow({ icon, iconColor, iconBg, title, desc }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: 14,
        borderRadius: 12,
        background: tokens.surfaceLowest,
        boxShadow: '0 1px 4px rgba(0,0,0,.06)',
      }}
    >
      <span
        style={{
          color: iconColor,
          background: iconBg,
          borderRadius: 8,
          padding: 8,
          display: 'flex',
        }}
      >
        <Icon name={icon} size={19} />
      </span>
      <div>
        <div
          style={{ fontWeight: 700, marginBottom: 3, color: tokens.onSurface }}
        >
          {title}
        </div>
        <div style={{ fontSize: 13, color: tokens.secondary }}>{desc}</div>
      </div>
    </div>
  );
}

export function PlatformSection({ sectionRefs }) {
  return (
    <Section
      id="platform"
      sectionRefs={sectionRefs}
      bg={tokens.surfaceLow}
      className="mobile-p-sm mobile-padding"
      style={{ padding: '96px 24px' }}
    >
      <Container>
        <div
          className="mobile-col-gap-lg"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            <SectionHead
              eyebrow="The Complexity Gap"
              title="From Chaos to"
              accent="Cohesion."
            >
              Most enterprises struggle with &quot;Black Box&quot; AI deployments. Without
              the LAYER engine, your risk profile grows exponentially with every
              model trained.
            </SectionHead>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {DEFAULT_PROBLEMS.map((p) => (
                <ProblemRow key={p.title} {...p} />
              ))}
            </div>
          </div>
          {/* Visual grid */}
          <div
            className="mobile-col-gap-sm responsive-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                paddingTop: 48,
              }}
            >
              <div
                style={{
                  height: 150,
                  borderRadius: 18,
                  background: tokens.surfaceContainer,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="blur_on" size={44} style={{ opacity: 0.18 }} />
              </div>
              <div
                style={{
                  height: 248,
                  borderRadius: 18,
                  background: tokens.primaryGrad,
                  padding: 22,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: '#fff',
                  boxShadow: '0 18px 55px rgba(160,65,0,.28)',
                }}
              >
                <Icon name="grid_view" size={30} style={{ marginBottom: 14 }} />
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 19,
                    lineHeight: 1.2,
                    fontFamily: tokens.fonts.display,
                  }}
                >
                  Structured Hierarchy
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  height: 248,
                  borderRadius: 18,
                  background: tokens.surfaceContainer,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="device_hub" size={60} style={{ opacity: 0.1 }} />
              </div>
              <div
                style={{
                  height: 150,
                  borderRadius: 18,
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,.07)',
                }}
              >
                <Icon name="hub" size={38} style={{ color: tokens.primary }} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
