"use client";

import { useState } from "react";
import { tokens } from "@/theme/tokens";
import { Icon } from "@/components/atoms/Icon";

export function FeatureCard({ icon, title, desc, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ padding: "38px 34px", background: tokens.surfaceLowest, borderRadius: 24, boxShadow: hov ? "0 20px 60px rgba(0,0,0,.10)" : "0 2px 8px rgba(0,0,0,.04)", transform: hov ? "translateY(-8px)" : "translateY(0)", transition: "all .3s ease", cursor: "default", ...style }}
    >
      <div style={{ width: 54, height: 54, borderRadius: 16, marginBottom: 26, background: hov ? tokens.primary : "rgba(160,65,0,.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}>
        <Icon name={icon} size={25} style={{ color: hov ? "#fff" : tokens.primary, transition: "color .3s" }} />
      </div>
      <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: tokens.onSurface, fontFamily: tokens.fonts.display }}>{title}</h4>
      <p style={{ fontSize: 14, color: tokens.secondary, lineHeight: 1.65 }}>{desc}</p>
    </div>
  );
}
