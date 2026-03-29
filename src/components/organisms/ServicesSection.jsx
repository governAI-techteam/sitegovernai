'use client';

import { tokens } from '@/theme/tokens';
import { DEFAULT_SERVICES } from '@/config/content';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';
import { FeatureCard } from '@/components/molecules/FeatureCard';

export function ServicesSection({ sectionRefs }) {
  return (
    <Section
      id="services"
      sectionRefs={sectionRefs}
      bg={tokens.surfaceLow}
      style={{ padding: '96px 24px' }}
    >
      <Container>
        <SectionHead align="center" title="Engineered" accent="Solutions." />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
            gap: 22,
          }}
        >
          {DEFAULT_SERVICES.map((s) => (
            <FeatureCard key={s.title} {...s} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
