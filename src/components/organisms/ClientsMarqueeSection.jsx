"use client";

import React from "react";
import { motion } from "framer-motion";
import { tokens } from "@/theme/tokens";

const LOGO_PATH = "/logos/";

const CLIENT_GROUPS = [
  {
    title: "Government & Public Sector",
    items: [
      { name: "National CPWD Academy", logo: "National CPWD Academy.png" },
      { name: "Indian Institute of Public Administration", logo: "IIPA.png" },
      { name: "State Institute of Public Admin - Himachal Pradesh", logo: "State Institute of Public Admin - Himachal Pradesh.png" },
      { name: "State Institute of Public Admin - Punjab", logo: "State Institute of Public Admin - Punjab.png" },
      { name: "State Institute of Rural Development - Himachal", logo: "State Institute of Rural Development - Himachal.png" },
      { name: "UP Skill Development Mission", logo: "UP Skill Development Mission.png" },
      { name: "C-DAC Mohali", logo: "C-DAC Mohali.png" },
    ],
  },
  {
    title: "Education, Healthcare & Technology",
    items: [
      { name: "Gujarat National Law University", logo: "Gujarat National Law University.png" },
      { name: "DY Patil University", logo: "DY Patil University.png", scale: 1.6 },
      { name: "National Law University, Delhi", logo: "National Law University, Delhi.png" },
      { name: "NALSAR University", logo: "NALSAR University.png" },
      { name: "NMIMS Hyderabad", logo: "NMIMS Hyderabad.png" },
      { name: "ICFAI Law School", logo: "ICFAI Law School.png" },
      { name: "UEM Kolkata", logo: "UEM Kolkata.png" },
      { name: "NUSRL Ranchi", logo: "NUSRL Ranchi.png" },
      { name: "AIIMS Patna", logo: "AIIMS Patna.png" },
    ],
  },
];

const STATS = [
  { value: "2000+", label: "Officials Trained" },
  { value: "20+", label: "Client Engagements" },
  { value: "5+", label: "States & UTs" },
];

const ORANGE = tokens.primary || "#FF9D52";

function LogoItem({ name, logo, scale }) {
  return (
    <div style={styles.logoItem} className="logo-item">
      <div style={styles.logoPlaceholder} className="logo-placeholder">
        <img
          src={`${LOGO_PATH}${logo}`}
          alt={name}
          style={{ ...styles.logoImage, ...(scale ? { transform: `scale(${scale})` } : {}) }}
        />
      </div>
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
          <LogoItem key={`${item.name}-${i}`} name={item.name} logo={item.logo} scale={item.scale} />
        ))}
      </div>
    </div>
  );
}

export default function ClientsMarqueeSection() {
  return (
    <section style={styles.section}>
      <style>{css}</style>

      <div style={styles.gridBg} aria-hidden="true" />

      {/* ── Header ── */}
      <div style={styles.container}>
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowBar} />
            <span style={styles.eyebrowText}>Trusted By</span>
            <span style={styles.eyebrowBar} />
          </div>
          <h2 style={styles.heading}>
            Institutional{" "}
            <span style={styles.headingAccent}>Clients &amp; Engagements</span>
          </h2>
          <p style={styles.subheading}>
            A growing network of government bodies, universities, and research
            institutions across India and beyond.
          </p>
        </motion.div>

        {/* ── Stats band ── */}
        <motion.div
          style={styles.statsBand}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ── Logo rows ── */}
      <div style={styles.fullWidthRows}>
        {CLIENT_GROUPS.map((group, i) => (
          <motion.div
            key={group.title}
            style={styles.rowGroup}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={styles.groupLabelWrap}>
              <span style={styles.groupIndexDot} aria-hidden="true" />
              <p style={styles.groupLabel}>{group.title}</p>
              <span style={styles.groupRule} aria-hidden="true" />
            </div>
            <div style={styles.marqueeOuter} className="marquee-outer">
              <div style={styles.fadeLeft} aria-hidden="true" />
              <div style={styles.fadeRight} aria-hidden="true" />
              <MarqueeRow
                items={group.items}
                duration={i === 0 ? 44 : 58}
                reverse={i % 2 !== 0}
              />
            </div>
          </motion.div>
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
    paddingTop: "clamp(72px, 8vw, 120px)",
    paddingBottom: "clamp(72px, 8vw, 120px)",
  },

  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(241,106,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(241,106,36,0.03) 1px, transparent 1px)",
    backgroundSize: "64px 64px",
    maskImage:
      "radial-gradient(ellipse 70% 50% at 50% 18%, #000 0%, transparent 75%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 70% 50% at 50% 18%, #000 0%, transparent 75%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  container: {
    position: "relative",
    zIndex: 1,
    maxWidth: "960px",
    margin: "0 auto",
    paddingLeft: "clamp(16px, 4vw, 48px)",
    paddingRight: "clamp(16px, 4vw, 48px)",
  },

  header: {
    textAlign: "center",
    marginBottom: "clamp(32px, 4vw, 48px)",
  },

  eyebrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    margin: "0 0 18px 0",
  },

  eyebrowBar: {
    flex: 1,
    maxWidth: 44,
    height: 2,
    borderRadius: 1,
    background: ORANGE,
    flexShrink: 0,
  },

  eyebrowText: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: ORANGE,
  },

  heading: {
    fontFamily: tokens.fonts.display,
    fontSize: "clamp(28px, 3.8vw, 46px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: tokens.onSurface,
    lineHeight: 1.08,
    margin: "0 0 14px 0",
  },

  headingAccent: {
    background: "linear-gradient(135deg, #f16a24 0%, #f16a24 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subheading: {
    fontSize: "clamp(14px, 1.2vw, 16px)",
    color: tokens.secondary,
    opacity: 0.85,
    maxWidth: "480px",
    margin: "0 auto",
    lineHeight: 1.65,
    fontWeight: 400,
  },

  /* Stats band */
  statsBand: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "clamp(20px, 4vw, 48px)",
    flexWrap: "wrap",
    maxWidth: "760px",
    margin: "0 auto",
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    flex: "1 1 auto",
    minWidth: "100px",
  },

  statValue: {
    fontFamily: tokens.fonts.display,
    fontSize: "clamp(28px, 3.4vw, 42px)",
    fontWeight: 800,
    color: "#f16a24",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },

  statLabel: {
    fontSize: "11px",
    color: tokens.secondary,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 600,
    textAlign: "center",
  },

  /* Logo rows */
  fullWidthRows: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(40px, 5vw, 64px)",
    marginTop: "clamp(48px, 6vw, 80px)",
  },

  rowGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  groupLabelWrap: {
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
    paddingLeft: "clamp(20px, 6vw, 80px)",
    paddingRight: "clamp(20px, 6vw, 80px)",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  groupIndexDot: {
    width: "10px",
    height: "10px",
    borderRadius: "3px",
    background: "linear-gradient(135deg, #f16a24 0%, #f16a24 100%)",
    flexShrink: 0,
    boxShadow: `0 2px 8px ${ORANGE}40`,
  },

  groupLabel: {
    fontSize: "clamp(19px, 2vw, 26px)",
    fontWeight: 800,
    letterSpacing: "-0.025em",
    color: tokens.onSurface,
    margin: 0,
    fontFamily: tokens.fonts.display,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },

  groupRule: {
    flex: 1,
    height: "1px",
    background:
      "linear-gradient(90deg, rgba(241,106,36,0.28), rgba(241,106,36,0.02))",
    minWidth: "20px",
    marginLeft: "20px",
  },

  marqueeOuter: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  },

  marqueeWrapper: {
    display: "flex",
    overflow: "visible",
    paddingTop: "16px",
    paddingBottom: "16px",
  },

  marqueeTrack: {
    display: "flex",
    width: "max-content",
    gap: "clamp(20px, 2.5vw, 32px)",
    willChange: "transform",
    alignItems: "center",
  },

  fadeLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "clamp(50px, 7vw, 90px)",
    height: "100%",
    background: `linear-gradient(to right, ${tokens.background} 0%, transparent 100%)`,
    zIndex: 3,
    pointerEvents: "none",
  },

  fadeRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "clamp(50px, 7vw, 90px)",
    height: "100%",
    background: `linear-gradient(to left, ${tokens.background} 0%, transparent 100%)`,
    zIndex: 3,
    pointerEvents: "none",
  },

  logoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "default",
  },

  logoPlaceholder: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 48px",
    borderRadius: 18,
    background: "linear-gradient(165deg, #ffffff 0%, #fffaf6 100%)",
    border: "1px solid rgba(241,106,36,0.1)",
    boxShadow:
      "0 4px 20px rgba(16,24,40,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
    width: 224,
    minHeight: 150,
    boxSizing: "border-box",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  logoImage: {
    width: 200,
    height: 100,
    objectFit: "contain",
    opacity: 0.78,
    filter: "grayscale(35%)",
    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
    display: "block",
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

  .logo-item:hover .logo-placeholder {
    background: linear-gradient(165deg, #fffaf6 0%, #fff4ea 100%) !important;
    box-shadow: 0 16px 44px rgba(241,106,36,0.16), inset 0 1px 0 rgba(255,255,255,0.9) !important;
    transform: translateY(-6px);
    border-color: rgba(241,106,36,0.25) !important;
  }

  .logo-item:hover img {
    opacity: 1 !important;
    filter: grayscale(0%) !important;
  }

  @media (max-width: 600px) {
    .logo-item .logo-placeholder { width: 180px !important; min-height: 130px !important; padding: 20px 32px !important; }
  }
`;
