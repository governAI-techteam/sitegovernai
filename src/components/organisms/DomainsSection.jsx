"use client";

import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { FadeIn } from "@/components/atoms/FadeIn";
import { tokens } from "@/theme/tokens";

const DOMAINS = [
  {
    id: "capacity-building",
    icon: "school",
    title: "AI & Responsible AI Governance",
    subtitle: "Capacity Building",
    points: [
      "Executive sensitisation sessions",
      "Immersive 3–5 day workshops",
      "Hands-on GenAI tools training",
      "Academic courses (NSQF-aligned)",
      "Gen-AI/AI Policy & Compliance Sessions",
    ],
    credentials: null,
  },
  {
    id: "compliance-auditing",
    icon: "search",
    title: "AI Compliance & Auditing",
    subtitle: "Compliance & Assurance",
    points: [
      "Compliance gap analysis ",
      "Pre-assessment & readiness reviews",
      "Independent AI auditing ",
      "Conformity Assessments",
      "AI Procurement Advisory",
    ],
    credentials: {
      label: "Auditing Team Credentials",
      items: [
        "ISO 42001 Lead Implementer",
        "Certified AI Auditor",
        "Certified DPO",
        "Cloud Security Specialist",
      ],
    },
  },
  {
    id: "studio",
    icon: "build",
    title: "GovernAI Studio",
    subtitle: "Implementation & Deployment",
    points: [
      "Vetted AI Solution Builder Network",
      "Governance (Design To Deployment)",
      "End-to-end Responsible Implementation",
      "Safety & Risk Assessments For Solutions",
      "Continuous Compliance Monitoring Setup",
    ],
    credentials: null,
  },
];

const INJECTED_CSS = `
  .domains-section {
    position: relative;
    overflow: hidden;
    padding: 1.25rem 0 4rem;
  }

  .domains-glow {
    position: absolute;
    bottom: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 450px;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      #FF9D52 0%,
      #FFC8A0 35%,
      #FFF5ED 60%,
      transparent 75%
    );
    filter: blur(80px);
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
  }

  .domains-inner {
    position: relative;
    z-index: 1;
  }

  .ds-header {
    text-align: center;
    margin-bottom: 2.25rem;
  }

  .ds-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.6375rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.28rem 0.8rem;
    border-radius: 999px;
    background: var(--ds-eyebrow-bg);
    color: var(--ds-primary);
    margin-bottom: 0.85rem;
    border: 1px solid var(--ds-eyebrow-border);
  }

  .ds-eyebrow-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--ds-primary);
    opacity: 0.8;
    flex-shrink: 0;
  }

  .ds-title {
    font-size: clamp(26px, 3.5vw, 42px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 0.7rem;
    color: var(--ds-on-background);
  }

  .ds-lead {
    font-size: 0.9rem;
    line-height: 1.68;
    color: var(--ds-secondary);
    max-width: 32rem;
    margin: 0 auto;
  }

  .ds-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .ds-card {
    position: relative;
    background: var(--ds-surface);
    border-radius: 1rem;
    padding: 1.5rem 1.375rem 1.375rem;
    border: 1px solid var(--ds-border);
    box-shadow:
      0 1px 2px rgba(0,0,0,0.04),
      0 4px 16px rgba(0,0,0,0.05),
      0 10px 40px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    transition: transform 0.22s cubic-bezier(.22,.68,0,1.2),
                box-shadow 0.22s ease;
    will-change: transform;
    overflow: hidden;
  }

  .ds-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      140deg,
      var(--ds-card-shimmer) 0%,
      transparent 50%
    );
    border-radius: inherit;
    pointer-events: none;
    z-index: 0;
  }

  .ds-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--ds-top-line) 40%,
      var(--ds-top-line) 60%,
      transparent
    );
    pointer-events: none;
    z-index: 1;
  }

  .ds-card:hover {
    transform: translateY(-5px);
    box-shadow:
      0 2px 4px rgba(0,0,0,0.04),
      0 8px 24px rgba(0,0,0,0.08),
      0 20px 56px rgba(0,0,0,0.10);
  }

  .ds-card > * {
    position: relative;
    z-index: 1;
  }

  .ds-icon-wrap {
    width: 2.375rem;
    height: 2.375rem;
    border-radius: 0.75rem;
    background: var(--ds-icon-bg);
    border: 1px solid var(--ds-icon-border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ds-card-titles {
    display: flex;
    flex-direction: column;
    gap: 0.175rem;
  }

  .ds-card-title {
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.22;
    letter-spacing: -0.012em;
    color: var(--ds-on-surface);
    margin: 0;
    text-align: left;
  }

  .ds-card-subtitle {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ds-primary);
    margin: 0;
    letter-spacing: 0.01em;
    text-align: left;
  }

  .ds-divider {
    height: 1px;
    background: var(--ds-border);
    border: none;
    margin: 0;
  }

  .ds-points {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
  }

  .ds-point {
    display: grid;
    grid-template-columns: 5px 1fr;
    column-gap: 0.65rem;
    align-items: left;
    font-size: 0.8125rem;
    line-height: 1.55;
    color: var(--ds-secondary);
    text-align: left;
  }

  .ds-bullet {
    display: block;
    width: 5px;
    height: 5px;
    min-width: 5px;
    border-radius: 50%;
    background: var(--ds-primary);
    opacity: 0.65;
    margin-top: calc((1.55em - 5px) / 2);
    align-self: start;
  }

  .ds-credentials {
    margin-top: auto;
    padding-top: 0.875rem;
    border-top: 1px solid var(--ds-border);
  }

  .ds-credentials-label {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--ds-secondary);
    margin-bottom: 0.5rem;
    opacity: 0.75;
    text-align: left;
  }

  .ds-credentials-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    text-align: left;
  }

  .ds-credential-item {
    display: flex;
    align-items: center;
    gap: 0.425rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--ds-on-surface);
  }

  .ds-credential-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--ds-primary);
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .ds-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .ds-grid { grid-template-columns: 1fr; }
    .domains-section { padding: 3rem 0 4rem; }
  }
`;

function DomainCard({ domain }) {
  return (
    <div className="ds-card">
      <div className="ds-card-titles">
        <h3 className="ds-card-title">{domain.title}</h3>
        {domain.subtitle && (
          <p className="ds-card-subtitle">{domain.subtitle}</p>
        )}
      </div>

      <hr className="ds-divider" />

      <ul className="ds-points">
        {domain.points.map((point, i) => (
          <li key={i} className="ds-point">
            <span className="ds-bullet" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {domain.credentials && (
        <div className="ds-credentials">
          <p className="ds-credentials-label">{domain.credentials.label}</p>
          <ul className="ds-credentials-list">
            {domain.credentials.items.map((cred, i) => (
              <li key={i} className="ds-credential-item">
                <span className="ds-credential-dot" aria-hidden="true" />
                {cred}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function DomainsSection() {
  const primary   = tokens.primary      ?? "#6366f1";
  const surface   = tokens.surface      ?? "#ffffff";
  const onBg      = tokens.onBackground ?? "#0f0f11";
  const onSurface = tokens.onSurface    ?? "#0f0f11";
  const secondary = tokens.secondary    ?? "#6b7280";
  const border    = tokens.borderSubtle ?? "rgba(0,0,0,0.07)";

  const cssVars = {
    "--ds-primary":        primary,
    "--ds-surface":        surface,
    "--ds-on-background":  onBg,
    "--ds-on-surface":     onSurface,
    "--ds-secondary":      secondary,
    "--ds-border":         border,
    "--ds-eyebrow-bg":     `color-mix(in srgb, ${primary} 7%, transparent)`,
    "--ds-eyebrow-border": `color-mix(in srgb, ${primary} 18%, transparent)`,
    "--ds-icon-bg":        `color-mix(in srgb, ${primary} 10%, transparent)`,
    "--ds-icon-border":    `color-mix(in srgb, ${primary} 16%, transparent)`,
    "--ds-card-shimmer":   `color-mix(in srgb, ${primary} 3.5%, transparent)`,
    "--ds-top-line":       `color-mix(in srgb, ${primary} 22%, transparent)`,
  };

  return (
    <>
      <style>{INJECTED_CSS}</style>

      <section
        className="domains-section"
        style={cssVars}
        aria-labelledby="ds-title"
      >
        <div className="domains-glow" aria-hidden="true" />

        <div className="domains-inner">
          <Container>
            <FadeIn>
              <div className="ds-header">
                <span className="ds-eyebrow">
                  <span className="ds-eyebrow-dot" />
                  What We Do
                </span>
                <h2 id="ds-title" className="ds-title">
                  Our Three Domains
                </h2>
                <p className="ds-lead">
                  From building AI literacy to auditing compliance and delivering
                  governed implementations - GovernAI operates across the full
                  spectrum of responsible AI adoption.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="ds-grid">
                {DOMAINS.map((domain) => (
                  <DomainCard key={domain.id} domain={domain} />
                ))}
              </div>
            </FadeIn>
          </Container>
        </div>
      </section>
    </>
  );
}