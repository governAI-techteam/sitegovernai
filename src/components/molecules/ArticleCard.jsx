"use client";

import { useState } from "react";
import { tokens } from "@/theme/tokens";
import { Icon } from "@/components/atoms/Icon";

export function ArticleCard({ date, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <article onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>
      <div style={{ height: 172, background: "linear-gradient(135deg,#1a1a2e,#0f3460)", display: "flex", alignItems: "center", justifyContent: "center", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform .5s ease", overflow: "hidden" }}>
        <Icon name="article" size={60} style={{ color: "rgba(255,107,0,.4)" }} />
      </div>
      <div style={{ padding: 26 }}>
        <time style={{ fontSize: 11, fontWeight: 700, color: tokens.secondary, textTransform: "uppercase", letterSpacing: ".1em" }}>{date}</time>
        <h4 style={{ fontSize: 17, fontWeight: 700, margin: "9px 0 11px", color: hov ? tokens.primary : tokens.onSurface, lineHeight: 1.35, transition: "color .2s", fontFamily: tokens.fonts.display }}>{title}</h4>
        <p style={{ fontSize: 13, color: tokens.secondary, lineHeight: 1.6, marginBottom: 18 }}>{desc}</p>
        <a href="#" style={{ color: tokens.primary, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
          Read Insight <Icon name="north_east" size={14} />
        </a>
      </div>
    </article>
  );
}
