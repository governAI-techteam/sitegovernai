"use client";

import { tokens } from "@/theme/tokens";
import { DEFAULT_STANDARDS } from "@/config/content";
import { Section } from "@/components/atoms/Section";
import { Container } from "@/components/atoms/Container";
import { SectionHead } from "@/components/atoms/SectionHead";
import { Badge } from "@/components/molecules/Badge";

export function StandardsSection({ sectionRefs }) {
  return (
    <Section id="standards" sectionRefs={sectionRefs} bg={tokens.surfaceLow} style={{ padding: "96px 24px" }}>
      <Container>
        <SectionHead align="center" title="Compliant with Global" accent="Benchmarks." />
        <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
          {DEFAULT_STANDARDS.map((s) => <Badge key={s.label} {...s} />)}
        </div>
      </Container>
    </Section>
  );
}
