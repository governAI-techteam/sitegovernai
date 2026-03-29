'use client';

import { tokens } from '@/theme/tokens';
import { DEFAULT_COURSES } from '@/config/content';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';
import { CourseCard } from '@/components/molecules/CourseCard';
import { Icon } from '@/components/atoms/Icon';

export function ResourcesSection({ sectionRefs }) {
  return (
    <Section
      id="resources"
      sectionRefs={sectionRefs}
      bg={tokens.surface}
      style={{ padding: '96px 24px' }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 44,
            flexWrap: 'wrap',
            gap: 14,
          }}
        >
          <SectionHead
            title="Enable Your"
            accent="Workforce."
            style={{ marginBottom: 0 }}
          >
            AI Governance is a human challenge. We build the expertise.
          </SectionHead>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: tokens.primary,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontFamily: tokens.fonts.display,
            }}
          >
            View Academy <Icon name="arrow_forward" size={16} />
          </button>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: 24,
          }}
        >
          {DEFAULT_COURSES.map((c) => (
            <CourseCard key={c.title} {...c} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
