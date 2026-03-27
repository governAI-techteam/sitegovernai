"use client";

import { useState } from "react";
import { tokens } from "@/theme/tokens";
import { DEFAULT_FOOTER_COLS } from "@/config/content";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";

function FooterLink({ label }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ color: hov ? "#f97316" : "#64748b", textDecoration: "none", fontSize: 13, transition: "color .2s" }}>
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="mobile-pt-sm mobile-pb-sm mobile-padding" style={{ background: "#f8fafc", paddingTop: 70, paddingBottom: 34 }}>
      <Container>
        <div className="mobile-col-gap-lg" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))", gap: 40 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", marginBottom: 13, fontFamily: tokens.fonts.display }}>GovernAI</div>
            <p style={{ color: "#64748b", lineHeight: 1.65, marginBottom: 20, fontSize: 13 }}>
              The Sentinel Archive. Empowering organizations with robust, ethical, and compliant AI systems.
            </p>
            <div style={{ display: "flex", gap: 9 }}>
              {["share", "language"].map((ic) => (
                <a key={ic} href="#" style={{ width: 33, height: 33, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", textDecoration: "none" }}>
                  <Icon name={ic} size={14} />
                </a>
              ))}
            </div>
          </div>
          {DEFAULT_FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h6 style={{ fontWeight: 700, color: "#0f172a", marginBottom: 18, textTransform: "uppercase", letterSpacing: ".1em", fontSize: 11, fontFamily: tokens.fonts.display }}>{col.heading}</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map((link) => <FooterLink key={link} label={link} />)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 44, paddingTop: 18, borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: 12 }}>© {new Date().getFullYear()} GovernAI Sentinel Archive. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
