'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/atoms/SafeImage';
import { MarkdownContent } from '@/components/atoms/MarkdownContent';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';
import { slugify } from '@/config/insightsData';

function formatDate(isoDate) {
  if (!isoDate) return null;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

export function PublicationReader({ insight, related = [], prev, next }) {
  const isMobile = useIsMobile();
  const isPublication = insight.category && insight.category !== 'moment';

  return (
    <div style={{ background: '#fafbfc', minHeight: '100vh', paddingTop: isMobile ? 80 : 100 }}>
      {/* Article Header Container */}
      <header
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: isMobile ? '28px 20px 36px' : '48px 32px 52px',
        }}
      >
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
            <ol
              style={{
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
                padding: 0,
                margin: 0,
                fontSize: 13,
                fontFamily: tokens.fonts.body,
                color: '#718096',
              }}
            >
              <li>
                <Link href="/" style={{ color: tokens.primary, textDecoration: 'none', fontWeight: 500 }}>
                  Home
                </Link>
                <span style={{ marginLeft: 8, color: '#cbd5e1' }}>/</span>
              </li>
              <li>
                <Link href="/insights/" style={{ color: tokens.primary, textDecoration: 'none', fontWeight: 500 }}>
                  Insights &amp; Research
                </Link>
                <span style={{ marginLeft: 8, color: '#cbd5e1' }}>/</span>
              </li>
              <li
                style={{
                  color: '#475569',
                  fontWeight: 600,
                  maxWidth: isMobile ? 220 : 420,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {insight.title}
              </li>
            </ol>
          </nav>

          {/* Eyebrow & Badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: 'rgba(241, 106, 36, 0.12)',
                color: tokens.primary,
                border: '1px solid rgba(241, 106, 36, 0.25)',
                fontFamily: tokens.fonts.body,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: tokens.primary }} />
              {insight.badge || (isPublication ? 'Research Publication' : 'Field Engagement')}
            </span>

            {insight.readTime && (
              <span
                style={{
                  fontSize: 12.5,
                  color: '#64748b',
                  fontWeight: 500,
                  fontFamily: tokens.fonts.body,
                }}
              >
                {insight.readTime}
              </span>
            )}

            {insight.datePublished && (
              <span style={{ fontSize: 12.5, color: '#64748b', fontFamily: tokens.fonts.body }}>
                &bull; {formatDate(insight.datePublished)}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: isMobile ? '28px' : 'clamp(32px, 3.4vw, 42px)',
              fontWeight: 800,
              color: tokens.onSurface,
              lineHeight: 1.22,
              letterSpacing: '-0.03em',
              margin: '0 0 14px 0',
            }}
          >
            {insight.title}
          </h1>

          {/* Subtitle */}
          {insight.subtitle && (
            <p
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: 600,
                color: tokens.primary,
                lineHeight: 1.45,
                margin: '0 0 18px 0',
              }}
            >
              {insight.subtitle}
            </p>
          )}

          {/* Author and Action Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 16,
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: 14,
                  fontFamily: tokens.fonts.display,
                }}
              >
                G
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: tokens.onSurface, fontFamily: tokens.fonts.body }}>
                  {insight.author || 'GovernAI Research'}
                </div>
                <div style={{ fontSize: 11.5, color: '#64748b', fontFamily: tokens.fonts.body }}>
                  AI Governance, Risk &amp; Compliance Authority
                </div>
              </div>
            </div>

            {/* Clean Quick Action Buttons for Publications */}
            {isPublication && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {insight.externalUrl && (
                  <a
                    href={insight.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '9px 16px',
                      borderRadius: 10,
                      background: '#ffffff',
                      border: '1.5px solid rgba(0,0,0,0.12)',
                      color: tokens.onSurface,
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontFamily: tokens.fonts.display,
                    }}
                  >
                    <span>Original Source</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}

                {insight.downloadPdf && (
                  <a
                    href={insight.downloadPdf}
                    download="DEPA-for-AI-Training-Blueprint.pdf"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '9px 16px',
                      borderRadius: 10,
                      background: '#191c1e',
                      color: '#ffffff',
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontFamily: tokens.fonts.display,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download PDF</span>
                  </a>
                )}

                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '9px 16px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontFamily: tokens.fonts.display,
                    boxShadow: '0 4px 14px rgba(241, 106, 36, 0.25)',
                  }}
                >
                  <span>Book Workshop</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Reading Container — Centered, Distraction-Free */}
      <main
        style={{
          maxWidth: 780,
          margin: '0 auto',
          padding: isMobile ? '28px 18px 80px' : '44px 24px 100px',
        }}
      >
        {isPublication ? (
          /* Publication View: Clean Centered Reading Article */
          <article
            style={{
              background: '#ffffff',
              borderRadius: 22,
              padding: isMobile ? '24px 20px' : '44px 44px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            }}
          >
            {/* Header Abstract Illustration if provided */}
            {insight.image && (
              <div
                style={{
                  marginBottom: 36,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#f8fafc',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                }}
              >
                <SafeImage
                  src={insight.image}
                  alt={insight.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: insight.image.endsWith('.svg') ? 380 : 340,
                    objectFit: insight.image.endsWith('.svg') ? 'contain' : 'cover',
                    display: 'block',
                    padding: insight.image.endsWith('.svg') ? '24px' : 0,
                  }}
                />
              </div>
            )}

            {/* Formatted Markdown Content */}
            <MarkdownContent content={insight.content || insight.description} />

            {/* Executive Consultation Box */}
            <div
              style={{
                marginTop: 48,
                padding: isMobile ? '24px 20px' : '32px 32px',
                borderRadius: 18,
                background: 'linear-gradient(135deg, #FFF8F3 0%, #FFF0E6 100%)',
                border: '1.5px solid rgba(241, 106, 36, 0.3)',
                boxShadow: '0 6px 20px rgba(241, 106, 36, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: tokens.primary }} />
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: tokens.primary,
                    fontFamily: tokens.fonts.body,
                  }}
                >
                  Executive Advisory &amp; Institutional Training
                </span>
              </div>
              <h3
                style={{
                  fontFamily: tokens.fonts.display,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: tokens.onSurface,
                  margin: '0 0 8px 0',
                }}
              >
                Deploy Sovereign AI Governance in Your Organisation
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: tokens.secondary,
                  margin: '0 0 18px 0',
                  fontFamily: tokens.fonts.body,
                }}
              >
                GovernAI conducts bespoke executive capacity-building programs, pre-deployment model audits, and regulatory compliance diagnostics for government MDOs, banks, healthcare institutions, and enterprise data custodians. To schedule an executive consultation, contact our advisory practice at{' '}
                <a
                  href="mailto:contact@governai.info"
                  style={{ color: tokens.primary, fontWeight: 600, textDecoration: 'none' }}
                >
                  contact@governai.info
                </a>.
              </p>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 22px',
                  borderRadius: 12,
                  background: tokens.primary,
                  color: '#ffffff',
                  fontSize: 13.5,
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontFamily: tokens.fonts.display,
                  boxShadow: '0 4px 14px rgba(241, 106, 36, 0.3)',
                }}
              >
                <span>Schedule an Executive Consultation</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ) : (
          /* Moment / Field Engagement View: Photo Narrative */
          <article
            style={{
              background: '#ffffff',
              borderRadius: 22,
              padding: isMobile ? '24px 20px' : '44px 44px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
            }}
          >
            {insight.location && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: tokens.primary,
                  fontSize: 13.5,
                  fontWeight: 600,
                  marginBottom: 20,
                  fontFamily: tokens.fonts.body,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{insight.location}</span>
              </div>
            )}

            {insight.image && (
              <div
                style={{
                  marginBottom: 32,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#0d1117',
                }}
              >
                <SafeImage
                  src={insight.image}
                  alt={insight.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 520,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            )}

            {(insight.content || insight.description)
              .split('\n')
              .filter(Boolean)
              .map((para, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontSize: '16.5px',
                    lineHeight: 1.75,
                    color: '#334155',
                    marginBottom: 20,
                    fontFamily: tokens.fonts.body,
                  }}
                >
                  {para}
                </p>
              ))}
          </article>
        )}

        {/* Related Insights Grid */}
        {related.length > 0 && (
          <section
            aria-label="Related research and insights"
            style={{
              marginTop: 54,
              paddingTop: 36,
              borderTop: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: '20px',
                fontWeight: 700,
                color: tokens.onSurface,
                marginBottom: 20,
                letterSpacing: '-0.02em',
              }}
            >
              Related Research &amp; Deployments
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {related.map((relItem) => (
                <Link
                  key={relItem.id}
                  href={`/insights/${relItem.slug || slugify(relItem.title)}/`}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
                    borderRadius: 14,
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: '#ffffff',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tokens.primary;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: tokens.onSurface,
                      marginBottom: 6,
                    }}
                  >
                    {relItem.title}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    {relItem.readTime || relItem.location || relItem.datePublished}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Previous / Next Contextual Nav */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {prev ? (
            <Link
              href={`/insights/${prev.slug || slugify(prev.title)}/`}
              style={{ color: tokens.primary, textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}
            >
              &larr; {prev.title}
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/insights/"
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: '#191c1e',
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: 8,
              background: '#edf2f7',
            }}
          >
            All Insights &amp; Research
          </Link>

          {next ? (
            <Link
              href={`/insights/${next.slug || slugify(next.title)}/`}
              style={{ color: tokens.primary, textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}
            >
              {next.title} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
