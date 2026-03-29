'use client';

import { tokens } from '@/theme/tokens';
import { DEFAULT_ARTICLES } from '@/config/content';
import { Section } from '@/components/atoms/Section';
import { Container } from '@/components/atoms/Container';
import { SectionHead } from '@/components/atoms/SectionHead';
import { ArticleCard } from '@/components/molecules/ArticleCard';

export function InsightsSection({ sectionRefs }) {
  return (
    <Section
      id="insights"
      sectionRefs={sectionRefs}
      bg={tokens.surfaceLow}
      style={{ padding: '96px 24px' }}
    >
      <Container>
        <SectionHead align="center" title="Latest from the" accent="Archive." />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 24,
          }}
        >
          {DEFAULT_ARTICLES.map((a) => (
            <ArticleCard key={a.title} {...a} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
