"use client";

import { tokens } from "@/theme/tokens";
import { DEFAULT_INDUSTRIES } from "@/config/content";
import { Section } from "@/components/atoms/Section";
import { Container } from "@/components/atoms/Container";
import { SectionHead } from "@/components/atoms/SectionHead";
import { IndustryCard } from "@/components/molecules/IndustryCard";

export function IndustriesSection({ sectionRefs }) {
  return (
    <Section id="industries" sectionRefs={sectionRefs} bg={tokens.surface} style={{ padding: "96px 24px" }}>
      <Container>
        <SectionHead title="Vertical" accent="Excellence.">Tailored governance for the world's most sensitive sectors.</SectionHead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {DEFAULT_INDUSTRIES.map((ind) => <IndustryCard key={ind.name} {...ind} />)}
        </div>
      </Container>
    </Section>
  );
}
