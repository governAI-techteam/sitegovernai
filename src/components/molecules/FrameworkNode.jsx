"use client";

import { useState } from "react";
import { tokens } from "@/theme/tokens";
import { Icon } from "@/components/atoms/Icon";

export function FrameworkNode({ icon, label, accent = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "default" }}>
      <div style={{ width: accent ? 104 : 82, height: accent ? 104 : 82, borderRadius: "50%", background: accent ? tokens.primaryGrad : "#fff", border: accent ? "none" : `2px solid ${tokens.primaryFixed}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 13, boxShadow: accent ? "0 8px 32px rgba(255,107,0,.35)" : "0 4px 20px rgba(0,0,0,.08)", transform: hov ? "scale(1.1)" : "scale(1)", transition: "transform .3s ease" }}>
        <Icon name={icon} size={accent ? 40 : 32} style={{ color: accent ? "#fff" : tokens.primary }} />
      </div>
      <span style={{ fontWeight: 700, fontSize: 13, color: accent ? tokens.primary : tokens.onSurface, fontFamily: tokens.fonts.display }}>{label}</span>
    </div>
  );
}
