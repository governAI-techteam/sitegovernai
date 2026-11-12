'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/atoms/SafeImage';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';
import { insightsData, slugify } from '@/config/insightsData';

export function ResearchPreviewSection() {
  const isMobile = useIsMobile();

  // Get the 3 featured research publications
  const featuredPublications = insightsData
    .filter((item) => item.featured)
    .slice(0, 3);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f7f9fb 50%, #ffffff 100%)',
        padding: isMobile ? '56px 0' : 'clamp(80px, 7vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 32px',
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: 820,
            margin: '0 auto 48px auto',
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 32,
                height: 2,
                borderRadius: 1,
                background: tokens.primary,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: tokens.primary,
                fontFamily: tokens.fonts.body,
              }}
            >
              Governance Intelligence &amp; Research
            </span>
            <span
              style={{
                width: 32,
                height: 2,
                borderRadius: 1,
                background: tokens.primary,
                display: 'inline-block',
              }}
            />
          </div>

          <h2
            id="research-heading"
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: isMobile ? '28px' : 'clamp(32px, 3.8vw, 46px)',
              fontWeight: 800,
              color: tokens.onSurface,
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              margin: '0 0 16px 0',
            }}
          >
            National AI Frameworks,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Demystified.
            </span>
          </h2>

          <p
            style={{
              fontSize: isMobile ? '15px' : '17px',
              color: tokens.secondary,
              lineHeight: 1.65,
              fontFamily: tokens.fonts.body,
              margin: 0,
            }}
          >
            In-depth analysis, techno-legal breakdowns, and operational blueprints for enterprise leaders navigating India&apos;s Digital Public Infrastructure (DPI) and DPDP Act compliance.
          </p>
        </motion.div>

        {/* 3-Card Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '26px',
            marginBottom: 44,
          }}
        >
          {featuredPublications.map((pub, idx) => {
            const isFlagship = pub.id === 'operationalizing-depa-for-ai-training';
            const slug = pub.slug || slugify(pub.title);
            const targetUrl = pub.externalUrl || `/insights/${slug}/`;
            const isExternal = Boolean(pub.externalUrl);

            return (
              <motion.article
                key={pub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                style={{
                  background: '#ffffff',
                  borderRadius: 22,
                  border: isFlagship
                    ? '1.5px solid rgba(241, 106, 36, 0.4)'
                    : '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: isFlagship
                    ? '0 16px 40px rgba(241, 106, 36, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)'
                    : '0 6px 24px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Top Flagship Accent Strip */}
                {isFlagship && (
                  <div
                    style={{
                      height: 5,
                      width: '100%',
                      background: 'linear-gradient(90deg, #f16a24 0%, #ff8c42 100%)',
                    }}
                  />
                )}

                {/* Abstract Thumbnail Banner */}
                {pub.image && (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 165,
                      background: '#f8fafc',
                      overflow: 'hidden',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', width: '100%', height: '100%' }}
                        aria-label={`Read ${pub.title}`}
                      >
                        <SafeImage
                          src={pub.image}
                          alt={pub.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: pub.image.endsWith('.svg') ? 'contain' : 'cover',
                            objectPosition: 'center',
                            padding: pub.image.endsWith('.svg') ? '12px' : 0,
                            display: 'block',
                          }}
                        />
                      </a>
                    ) : (
                      <Link
                        href={targetUrl}
                        style={{ display: 'block', width: '100%', height: '100%' }}
                        aria-label={`Read ${pub.title}`}
                      >
                        <SafeImage
                          src={pub.image}
                          alt={pub.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: pub.image.endsWith('.svg') ? 'contain' : 'cover',
                            objectPosition: 'center',
                            padding: pub.image.endsWith('.svg') ? '12px' : 0,
                            display: 'block',
                          }}
                        />
                      </Link>
                    )}
                  </div>
                )}

                <div
                  style={{
                    padding: isMobile ? '22px 18px' : '26px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  {/* Category Pill & Read Time */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 10px',
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        background: isFlagship
                          ? 'rgba(241, 106, 36, 0.12)'
                          : 'rgba(0, 0, 0, 0.05)',
                        color: isFlagship ? tokens.primary : tokens.secondary,
                        border: isFlagship
                          ? '1px solid rgba(241, 106, 36, 0.25)'
                          : '1px solid rgba(0, 0, 0, 0.06)',
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      {isFlagship && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#f16a24',
                            boxShadow: '0 0 6px #f16a24',
                          }}
                        />
                      )}
                      {pub.badge || (pub.category === 'whitepaper' ? 'Whitepaper' : pub.category === 'sop' ? 'Policy SOP' : 'Regulatory Brief')}
                    </span>

                    <span
                      style={{
                        fontSize: 12,
                        color: '#718096',
                        fontWeight: 500,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      {pub.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: tokens.fonts.display,
                      fontSize: isMobile ? '20px' : '22px',
                      fontWeight: 700,
                      color: tokens.onSurface,
                      lineHeight: 1.25,
                      letterSpacing: '-0.025em',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        {pub.title}
                      </a>
                    ) : (
                      <Link
                        href={targetUrl}
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        {pub.title}
                      </Link>
                    )}
                  </h3>

                  {/* Subtitle */}
                  {pub.subtitle && (
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: tokens.primary,
                        marginBottom: 12,
                        lineHeight: 1.4,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      {pub.subtitle}
                    </div>
                  )}

                  {/* Description / Snippet */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: tokens.secondary,
                      lineHeight: 1.6,
                      fontFamily: tokens.fonts.body,
                      margin: '0 0 20px 0',
                      flex: 1,
                    }}
                  >
                    {pub.description}
                  </p>

                  {/* Tags */}
                  {pub.tags && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 6,
                        marginBottom: 24,
                      }}
                    >
                      {pub.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: '#f4f6f8',
                            color: '#4a5568',
                            fontFamily: tokens.fonts.mono,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 'auto',
                    }}
                  >
                    {isExternal ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          padding: '10px 16px',
                          borderRadius: 12,
                          background: '#191c1e',
                          color: '#ffffff',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          fontFamily: tokens.fonts.display,
                          boxShadow: 'none',
                          transition: 'transform 0.2s ease, opacity 0.2s ease',
                        }}
                      >
                        <span>Read Article</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={targetUrl}
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          padding: '10px 16px',
                          borderRadius: 12,
                          background: isFlagship
                            ? 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)'
                            : '#191c1e',
                          color: '#ffffff',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          fontFamily: tokens.fonts.display,
                          boxShadow: isFlagship
                            ? '0 4px 14px rgba(241, 106, 36, 0.3)'
                            : 'none',
                          transition: 'transform 0.2s ease, opacity 0.2s ease',
                        }}
                      >
                        <span>{isFlagship ? 'Read Whitepaper' : pub.category === 'sop' ? 'View SOP' : 'Read Brief'}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}

                    {pub.downloadPdf && (
                      <a
                        href={pub.downloadPdf}
                        download="DEPA-for-AI-Training-Blueprint.pdf"
                        aria-label={`Download PDF of ${pub.title}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '10px 14px',
                          borderRadius: 12,
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          background: '#ffffff',
                          color: tokens.secondary,
                          fontSize: 12.5,
                          fontWeight: 600,
                          textDecoration: 'none',
                          fontFamily: tokens.fonts.body,
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = tokens.primary;
                          e.currentTarget.style.color = tokens.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                          e.currentTarget.style.color = tokens.secondary;
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: 6 }}
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Research Link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/insights/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 28px',
              borderRadius: 100,
              background: '#ffffff',
              border: '1.5px solid rgba(241, 106, 36, 0.35)',
              color: tokens.primary,
              fontFamily: tokens.fonts.display,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(241, 106, 36, 0.06)';
              e.currentTarget.style.borderColor = tokens.primary;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(241, 106, 36, 0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore All Research, Whitepapers &amp; Briefs</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
