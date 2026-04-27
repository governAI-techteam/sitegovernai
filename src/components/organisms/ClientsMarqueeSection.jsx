"use client";

import React from "react";
import Image from "next/image";
import { tokens } from "@/theme/tokens";

const CLIENT_GROUPS = [
  {
    title: "Government & Public Sector",
    items: [
      { name: "National CPWD Academy", logo: null },
      { name: "Indian Institute of Public Administration", logo: null },
      { name: "State Institute of Public Admin - Himachal Pradesh", logo: null },
      { name: "State Institute of Public Admin - Punjab", logo: null },
      { name: "State Institute of Rural Development - Himachal", logo: null },
      { name: "UP Skill Development Mission", logo: null },
      { name: "NIEPA (Ministry of Education)", logo: null },
    ],
  },
  {
    title: "Education, Healthcare & Technology",
    items: [
      { name: "Gujarat National Law University", logo: null },
      { name: "DY Patil University", logo: null },
      { name: "National Law University, Delhi", logo: null },
      { name: "NALSAR University", logo: null },
      { name: "NMIMS Hyderabad", logo: null },
      { name: "ICFAI Law School", logo: null },
      { name: "UEM Kolkata", logo: null },
      { name: "NUSRL Ranchi", logo: null },
      { name: "AIIMS Patna", logo: null },
      { name: "C-DAC Mohali", logo: null },
    ],
  },
];

const ORANGE = tokens.primary || "#FF9D52";

function LogoItem({ name, logo }) {
  return (
    <div style={styles.logoItem} className="logo-item">
      {logo ? (
        <Image src={logo} alt={name} width={120} height={30} style={styles.logoImage} />
      ) : (
        <span style={styles.logoText}>{name}</span>
      )}
    </div>
  );
}

function MarqueeRow({ items, duration = 50, reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div style={styles.marqueeWrapper}>
      <div
        style={{
          ...styles.marqueeTrack,
          animation: `marquee${reverse ? "Reverse" : ""} ${duration}s linear infinite`,
        }}
        className="marquee-track"
      >
        {doubled.map((item, i) => (
          <LogoItem key={`${item.name}-${i}`} name={item.name} logo={item.logo} />
        ))}
      </div>
    </div>
  );
}

export default function ClientsMarqueeSection() {
  return (
    <section style={styles.section}>
      <style>{css}</style>

      <div style={styles.glowTop} aria-hidden="true" />

      <div style={styles.container}>
        <div style={styles.header}>
          <h5 style={styles.eyebrow}>Trusted By</h5>
          <h2 style={styles.heading}>
            Institutional{" "}
            <span style={styles.headingAccent}>Clients &amp; Engagements</span>
          </h2>
          <p style={styles.subheading}>
            A growing network of government bodies, universities, and research institutions
            across India and beyond.
          </p>
          <div style={styles.accentBar} />
          <div style={styles.container}>
            <div style={styles.statsRow}>
              {[
                { value: "2000+", label: "Officials Trained" },
                { value: "20+", label: "Client Engagements" },
                { value: "5+", label: "States & UTs" },
              ].map((stat) => (
                <div key={stat.label} style={styles.statItem}>
                  <span style={styles.statValue}>{stat.value}</span>
                  <span style={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.fullWidthRows}>
        {CLIENT_GROUPS.map((group, i) => (
          <div key={group.title} style={styles.rowGroup}>
            <div style={styles.groupLabelWrap}>
              <p style={styles.groupLabel}>{group.title}</p>
            </div>
            <div style={styles.marqueeOuter} className="marquee-outer">
              <div style={styles.fadeLeft} aria-hidden="true" />
              <div style={styles.fadeRight} aria-hidden="true" />
              <div style={styles.orangeLeft} aria-hidden="true" />
              <div style={styles.orangeRight} aria-hidden="true" />
              <MarqueeRow
                items={group.items}
                duration={i === 0 ? 44 : 58}
                reverse={i % 2 !== 0}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    backgroundColor: tokens.background,
    overflow: "hidden",
    paddingTop: "clamp(40px, 5.5vw, 72px)",
    paddingBottom: "clamp(40px, 5.5vw, 72px)",
  },

  glowTop: {
    position: "absolute",
    top: "-120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "420px",
    borderRadius: "50%",
    background: `radial-gradient(ellipse at center, ${ORANGE}10 0%, transparent 68%)`,
    filter: "blur(72px)",
    pointerEvents: "none",
    zIndex: 0,
  },

  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "900px",
    margin: "0 auto",
    paddingLeft: "clamp(16px, 4vw, 48px)",
    paddingRight: "clamp(16px, 4vw, 48px)",
  },

  header: {
    textAlign: "center",
    marginBottom: "clamp(28px, 4vw, 52px)",
  },

  eyebrow: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: ORANGE,
    opacity: 0.8,
    margin: "0 0 10px 0",
  },

  heading: {
    fontSize: "clamp(22px, 3.2vw, 34px)",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    color: tokens.secondary,
    lineHeight: 1.15,
    margin: "0 0 12px 0",
  },

  headingAccent: {
    color: ORANGE,
  },

  accentBar: {
    width: "40px",
    height: "3px",
    borderRadius: "999px",
    background: `linear-gradient(to right, ${ORANGE}, ${ORANGE}44)`,
    margin: "14px auto 16px",
  },

  subheading: {
    fontSize: "clamp(12px, 1.2vw, 13px)",
    color: tokens.secondary,
    opacity: 0.5,
    maxWidth: "420px",
    margin: "0 auto",
    lineHeight: 1.65,
  },

  fullWidthRows: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(22px, 3vw, 36px)",
    marginBottom: "clamp(28px, 4vw, 48px)",
  },

  rowGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  groupLabelWrap: {
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
    paddingLeft: "clamp(16px, 4vw, 48px)",
    paddingRight: "clamp(16px, 4vw, 48px)",
  },

  groupLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tokens.secondary,
    opacity: 0.3,
    margin: 0,
  },

  marqueeOuter: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maskImage:
      "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
  },

  marqueeWrapper: {
    display: "flex",
    overflow: "visible",
    paddingTop: "7px",
    paddingBottom: "7px",
  },

  marqueeTrack: {
    display: "flex",
    width: "max-content",
    gap: "clamp(12px, 2vw, 20px)",
    willChange: "transform",
    alignItems: "center",
  },

  fadeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "clamp(50px, 7vw, 80px)",
    height: "100%",
    background: `linear-gradient(to right, ${tokens.background} 0%, transparent 100%)`,
    zIndex: 3,
    pointerEvents: "none",
  },

  fadeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "clamp(50px, 7vw, 80px)",
    height: "100%",
    background: `linear-gradient(to left, ${tokens.background} 0%, transparent 100%)`,
    zIndex: 3,
    pointerEvents: "none",
  },

  orangeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "clamp(60px, 9vw, 130px)",
    height: "100%",
    background: `linear-gradient(to right, ${ORANGE}28 0%, transparent 100%)`,
    zIndex: 2,
    pointerEvents: "none",
    mixBlendMode: "overlay",
  },

  orangeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "clamp(60px, 9vw, 130px)",
    height: "100%",
    background: `linear-gradient(to left, ${ORANGE}28 0%, transparent 100%)`,
    zIndex: 2,
    pointerEvents: "none",
    mixBlendMode: "overlay",
  },

  logoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    padding: "0 20px",
    borderRadius: "999px",
    backgroundColor: tokens.surface,
    opacity: 0.65,
    flexShrink: 0,
    transition: "opacity 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease",
    cursor: "default",
    border: `1px solid ${tokens.secondary}14`,
    boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
  },

  logoImage: {
    height: "30px",
    width: "auto",
    objectFit: "contain",
  },

  logoText: {
    fontSize: "clamp(11px, 1vw, 13px)",
    fontWeight: 550,
    color: tokens.secondary,
    whiteSpace: "nowrap",
    letterSpacing: "-0.01em",
    opacity: 0.88,
  },

  statsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "clamp(24px, 5vw, 60px)",
    paddingTop: "clamp(20px, 3vw, 30px)",
    borderTop: `1px solid ${tokens.secondary}14`,
    flexWrap: "wrap",
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },

  statValue: {
    fontSize: "clamp(20px, 2.8vw, 30px)",
    fontWeight: 600,
    color: ORANGE,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },

  statLabel: {
    fontSize: "11px",
    color: tokens.secondary,
    opacity: 0.4,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
};

const css = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @keyframes marqueeReverse {
    from { transform: translateX(-50%); }
    to   { transform: translateX(0); }
  }

  .marquee-outer:hover .marquee-track {
    animation-play-state: paused !important;
  }

  .logo-item:hover {
    opacity: 1 !important;
    transform: scale(1.05) !important;
    box-shadow: 0 6px 28px rgba(0,0,0,0.12) !important;
  }

  @media (max-width: 768px) {
    .logo-item {
      height: 36px !important;
      padding: 0 14px !important;
    }
    .logo-item span {
      font-size: 12px !important;
    }
  }

  @media (max-width: 480px) {
    .logo-item {
      height: 32px !important;
      padding: 0 11px !important;
    }
    .logo-item span {
      font-size: 11px !important;
    }
  }
`;