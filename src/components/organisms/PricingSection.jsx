"use client";

import { tokens } from "@/theme/tokens";
import { Section } from "@/components/atoms/Section";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

export function PricingSection({ sectionRefs }) {
  return (
    <Section id="pricing" sectionRefs={sectionRefs} bg={tokens.surface} style={{ padding: "120px 24px" }}>
      <Container style={{ maxWidth: 940 }}>
        <div style={{ position: "relative", borderRadius: 48, overflow: "hidden", background: tokens.primaryGrad, padding: "78px 44px", textAlign: "center", boxShadow: "0 0 60px -10px rgba(255,107,0,.25)" }}>
          <div style={{ position: "absolute", top: 0, right: 0, padding: 44, opacity: .07, pointerEvents: "none" }}>
            <Icon name="shield" size={175} style={{ color: "#fff" }} />
          </div>
          <h2 style={{ fontFamily: tokens.fonts.display, fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.045em", lineHeight: 1.15, marginBottom: 18, position: "relative", zIndex: 1 }}>
            Ready to Deploy with<br />Absolute Confidence?
          </h2>
          <p style={{ color: "rgba(255,255,255,.8)", fontSize: 17, maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.65, position: "relative", zIndex: 1 }}>
            Join 200+ global enterprises using GovernAI to build the next generation of trusted intelligence.
          </p>
          <div style={{ display: "flex", gap: 13, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <Button variant="white" style={{ padding: "13px 34px", fontSize: 15 }}>Schedule Consultation</Button>
            <Button variant="outline" style={{ padding: "13px 34px", fontSize: 15 }}>Contact Sales</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
