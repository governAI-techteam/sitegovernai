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
            <img src="/assets/img/logo.png" alt="GovernAI" style={{ width: "100px", height: "auto", marginBottom: "16px" }} />
            <p style={{ color: "#64748b", lineHeight: 1.65, marginBottom: 20, fontSize: 13 }}>
              The Sentinel Archive. Empowering organizations with robust, ethical, and compliant AI systems.
            </p>
          </div>
          
        </div>
        <div style={{ marginTop: 44, paddingTop: 18, borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", fontSize: 12 }}>© {new Date().getFullYear()} GovernAI Sentinel Archive. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
