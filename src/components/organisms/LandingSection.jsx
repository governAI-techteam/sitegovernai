"use client";

import { tokens } from "@/theme/tokens";
import { Section } from "@/components/atoms/Section";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/atoms/Button";
import { Blob } from "@/components/atoms/Blob";
import ImageCard from "@/components/molecules/ImageCard";
import { Icon } from "@/components/atoms/Icon";

import { FounderProfile } from "./FounderProfile";

export function LandingSection({ sectionRefs }) {

  return (
    <Section id="hero" sectionRefs={sectionRefs} bg={tokens.surface} className="mobile-pt-sm mobile-pb-sm mobile-padding" style={{ position: "relative", overflow: "hidden", padding: "80px 24px 120px", textAlign: "center" }}>
      <div className="hide-on-mobile">
        <Blob top="-10%" right="-5%" size={500} />
      </div>
      <div className="hide-on-mobile">
        <Blob bottom="-10%" left="-5%" size={400} color="rgba(0,98,161,.07)" />
      </div>
      <img src="/assets/img/logo.png" alt="GovernAI" style={{ width: "100%", maxWidth: "500px", height: "auto", opacity: 1, zIndex: 0, margin: "0 auto 40px auto", display: "block" }} />
      
      
      <Container style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.primaryFixed, color: "#351000", borderRadius: 9999, padding: "4px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 30 }}>
          <Icon name="verified_user" size={13} /> The Future of AI Trust
        </div>
        <h1 style={{ fontFamily: tokens.fonts.display, fontSize: "clamp(38px,6vw,70px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1.1, marginBottom: 26, color: tokens.onSurface }}>
          Master the <span style={{ color: tokens.primary }}>Sentinels</span> of Modern Intelligence.
        </h1>
        <p style={{ fontSize: "clamp(16px,2vw,19px)", color: tokens.secondary, maxWidth: 580, margin: "0 auto 44px", lineHeight: 1.7 }}>
          GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias.
        </p>
       
      </Container>
      <ImageCard />
      <hr style={{ border: 'none', borderTop: `1px solid rgba(0,0,0,0.05)`, margin: '80px 0 0 0' }} />
      <FounderProfile />
    </Section>
  );
}
