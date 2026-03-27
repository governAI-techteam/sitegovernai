"use client";

import { tokens } from "@/theme/tokens";
import { DEFAULT_FEATURES } from "@/config/content";
import { Section } from "@/components/atoms/Section";
import { Container } from "@/components/atoms/Container";
import { SectionHead } from "@/components/atoms/SectionHead";
import { Icon } from "@/components/atoms/Icon";

export function SolutionsSection({ sectionRefs }) {
  return (
    <Section id="solutions" sectionRefs={sectionRefs} bg={tokens.surface} className="mobile-p-sm mobile-padding" style={{ padding: "96px 24px" }}>
      <Container>
        <div className="mobile-col-gap-lg" style={{ display: "flex", gap: 72, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 360px" }}>
            <div style={{ aspectRatio: "1/1", borderRadius: 26, overflow: "hidden", background: "linear-gradient(135deg,#1a1a2e,#0f3460)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 80px rgba(0,0,0,.15),0 0 40px -10px rgba(255,107,0,.2)" }}>
              <Icon name="security" size={110} style={{ color: "rgba(255,107,0,.55)" }} />
            </div>
            <div style={{ position: "absolute", bottom: -22, right: -22, background: "rgba(255,255,255,.75)", backdropFilter: "blur(20px)", padding: "22px 26px", borderRadius: 18, boxShadow: "0 8px 32px rgba(0,0,0,.12)", border: "1px solid rgba(255,255,255,.6)" }}>
              <div style={{ fontFamily: tokens.fonts.display, fontSize: 36, fontWeight: 800, color: tokens.primary, marginBottom: 3 }}>99.8%</div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>Bias Detection Accuracy</div>
            </div>
          </div>
          <div style={{ flex: "1 1 360px" }}>
            <SectionHead title="Clarity in Every Layer of your" accent="AI Stack." />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 30 }}>
              {DEFAULT_FEATURES.map((f) => (
                <li key={f.title} style={{ display: "flex", gap: 20 }}>
                  <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: "50%", background: f.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={f.icon} size={21} style={{ color: f.iconColor }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 17, fontWeight: 700, marginBottom: 7, color: tokens.onSurface, fontFamily: tokens.fonts.display }}>{f.title}</h4>
                    <p style={{ color: tokens.secondary, lineHeight: 1.65, fontSize: 14 }}>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
