"use client";

import { useState } from "react";
import { tokens } from "@/theme/tokens";

export function CourseCard({ tag, title, desc, cta }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: tokens.surfaceLowest, padding: 30, borderRadius: 22, border: `1px solid ${tokens.outlineVariant}`, boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: tokens.primary, marginBottom: 11, textTransform: "uppercase", letterSpacing: ".1em" }}>{tag}</div>
      <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 11, color: tokens.onSurface, fontFamily: tokens.fonts.display }}>{title}</h4>
      <p style={{ fontSize: 13, color: tokens.secondary, lineHeight: 1.65, marginBottom: 22 }}>{desc}</p>
      <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ width: "100%", padding: "11px 0", borderRadius: 11, background: hov ? tokens.primaryFixed : tokens.surfaceContainer, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "background .2s" }}
      >{cta}</button>
    </div>
  );
}
