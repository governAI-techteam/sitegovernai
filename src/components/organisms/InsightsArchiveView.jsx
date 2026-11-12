'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SafeImage } from '@/components/atoms/SafeImage';
import { INSIGHT_CATEGORIES, slugify } from '@/config/insightsData';

function formatDate(isoDate) {
  if (!isoDate) return null;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts.map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

export function InsightsArchiveView({ initialItems = [] }) {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Filter items by category and search query
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Category match
      const itemCategory = item.category || 'moment';
      const matchesCategory =
        selectedCategory === 'all' || itemCategory === selectedCategory;

      if (!matchesCategory) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(q));
      const locMatch = item.location?.toLowerCase().includes(q);

      return titleMatch || descMatch || tagMatch || locMatch;
    });
  }, [initialItems, selectedCategory, searchQuery]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
  };

  return (
    <div style={{ background: '#fafbfc', minHeight: '100vh', paddingTop: isMobile ? 80 : 100 }}>
      {/* Hero Header */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: isMobile ? '36px 20px 40px' : '56px 24px 64px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 12px',
              borderRadius: 4,
              background: 'rgba(241, 106, 36, 0.08)',
              border: '1px solid rgba(241, 106, 36, 0.2)',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#f16a24',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: tokens.primary,
                fontFamily: tokens.fonts.body,
              }}
            >
              National AI Governance Publications
            </span>
          </div>

          <h1
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: isMobile ? '30px' : 'clamp(36px, 4.2vw, 52px)',
              fontWeight: 800,
              color: tokens.onSurface,
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              margin: '0 0 16px 0',
            }}
          >
            Insights, Research &amp;{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Whitepapers
            </span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? '15px' : '17px',
              color: tokens.secondary,
              lineHeight: 1.65,
              fontFamily: tokens.fonts.body,
              maxWidth: 680,
              margin: '0 auto 32px auto',
            }}
          >
            Authoritative blueprints, policy SOPs, and techno-legal breakdowns for enterprise leaders and public data custodians navigating India&apos;s DPI and DPDP Act compliance.
          </p>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: 540,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or regulation (e.g. DEPA, DPDP, SOP)..."
              aria-label="Search insights and publications"
              style={{
                width: '100%',
                padding: isMobile ? '12px 16px 12px 42px' : '14px 20px 14px 46px',
                borderRadius: 14,
                border: '1.5px solid rgba(0,0,0,0.1)',
                background: '#ffffff',
                fontSize: '14px',
                fontFamily: tokens.fonts.body,
                color: tokens.onSurface,
                outline: 'none',
                boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = tokens.primary;
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(241,106,36,0.12)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.04)';
              }}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8494a7"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: 'absolute',
                left: isMobile ? 14 : 16,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '28px 16px 60px' : '44px 32px 80px',
        }}
      >
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 36,
          }}
        >
          {INSIGHT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: isMobile ? '8px 14px' : '9px 18px',
                  borderRadius: 6,
                  border: isSelected
                    ? '1.5px solid #f16a24'
                    : '1px solid rgba(0,0,0,0.08)',
                  background: isSelected ? '#f16a24' : '#ffffff',
                  color: isSelected ? '#ffffff' : tokens.secondary,
                  fontSize: isMobile ? '12.5px' : '13.5px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  fontFamily: tokens.fonts.body,
                  boxShadow: isSelected
                    ? '0 4px 14px rgba(241, 106, 36, 0.25)'
                    : '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            fontSize: 13,
            color: '#718096',
            fontFamily: tokens.fonts.body,
            padding: '0 4px',
          }}
        >
          <span>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'publication' : 'publications'}
            {selectedCategory !== 'all' && ` in ${INSIGHT_CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: tokens.primary,
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Publications Grid */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: '60px 24px',
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <p style={{ fontSize: 16, color: tokens.secondary, margin: '0 0 16px 0' }}>
              No publications found matching your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              style={{
                padding: '9px 20px',
                borderRadius: 10,
                background: tokens.primary,
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: isMobile ? '20px' : '26px',
              marginBottom: 60,
            }}
          >
            {filteredItems.map((item) => {
              const slug = item.slug || slugify(item.title);
              const isFlagship = item.id === 'operationalizing-depa-for-ai-training';
              const isMoment = !item.category || item.category === 'moment';
              const targetUrl = item.externalUrl || `/insights/${slug}/`;
              const isExternal = Boolean(item.externalUrl);

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    border: isFlagship
                      ? '1.5px solid rgba(241, 106, 36, 0.4)'
                      : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: isFlagship
                      ? '0 12px 32px rgba(241, 106, 36, 0.09), 0 4px 12px rgba(0,0,0,0.03)'
                      : '0 4px 16px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
                >
                  {/* Top Flagship Strip */}
                  {isFlagship && (
                    <div
                      style={{
                        height: 4,
                        width: '100%',
                        background: 'linear-gradient(90deg, #f16a24 0%, #ff8c42 100%)',
                      }}
                    />
                  )}

                  {/* Thumbnail for moments or architecture diagram for whitepapers */}
                  {item.image && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: isMoment ? 200 : 175,
                        background: '#f4f6f8',
                        overflow: 'hidden',
                      }}
                    >
                      {isExternal ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', width: '100%', height: '100%' }}
                          aria-label={`Read ${item.title}`}
                        >
                          <SafeImage
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: item.image.endsWith('.svg') ? 'contain' : 'cover',
                              objectPosition: 'center',
                              padding: item.image.endsWith('.svg') ? '12px' : 0,
                              display: 'block',
                            }}
                          />
                        </a>
                      ) : (
                        <Link
                          href={targetUrl}
                          style={{ display: 'block', width: '100%', height: '100%' }}
                          aria-label={`Read ${item.title}`}
                        >
                          <SafeImage
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: item.image.endsWith('.svg') ? 'contain' : 'cover',
                              objectPosition: 'center',
                              padding: item.image.endsWith('.svg') ? '12px' : 0,
                              display: 'block',
                            }}
                          />
                        </Link>
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      padding: isMobile ? '20px 18px' : '24px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    {/* Header meta */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '3px 9px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          background: isFlagship
                            ? 'rgba(241, 106, 36, 0.12)'
                            : isMoment
                            ? '#edf2f7'
                            : 'rgba(241, 106, 36, 0.08)',
                          color: isFlagship || !isMoment ? tokens.primary : '#4a5568',
                          fontFamily: tokens.fonts.body,
                        }}
                      >
                        {item.badge || (item.category === 'whitepaper' ? 'Whitepaper' : item.category === 'sop' ? 'Policy SOP' : item.category === 'brief' ? 'Regulatory Brief' : 'Field Engagement')}
                      </span>

                      <span
                        style={{
                          fontSize: 11.5,
                          color: '#718096',
                          fontFamily: tokens.fonts.body,
                        }}
                      >
                        {item.readTime || formatDate(item.datePublished)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: tokens.fonts.display,
                        fontSize: '18px',
                        fontWeight: 700,
                        color: tokens.onSurface,
                        lineHeight: 1.3,
                        letterSpacing: '-0.02em',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {isExternal ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={targetUrl}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {item.title}
                        </Link>
                      )}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '13.5px',
                        color: tokens.secondary,
                        lineHeight: 1.55,
                        fontFamily: tokens.fonts.body,
                        margin: '0 0 16px 0',
                        flex: 1,
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Action buttons */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 'auto',
                        paddingTop: 14,
                        borderTop: '1px solid rgba(0,0,0,0.06)',
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
                            gap: 6,
                            padding: '9px 14px',
                            borderRadius: 10,
                            background: '#191c1e',
                            color: '#ffffff',
                            fontSize: 12.5,
                            fontWeight: 700,
                            textDecoration: 'none',
                            fontFamily: tokens.fonts.display,
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
                            gap: 6,
                            padding: '9px 14px',
                            borderRadius: 10,
                            background: isFlagship
                              ? tokens.primary
                              : '#191c1e',
                            color: '#ffffff',
                            fontSize: 12.5,
                            fontWeight: 700,
                            textDecoration: 'none',
                            fontFamily: tokens.fonts.display,
                          }}
                        >
                          <span>
                            {isFlagship
                              ? 'Read Whitepaper'
                              : isMoment
                              ? 'View Engagement'
                              : 'Read Insight'}
                          </span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      )}

                      {item.downloadPdf && (
                        <a
                          href={item.downloadPdf}
                          download="DEPA-for-AI-Training-Blueprint.pdf"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '9px 12px',
                            borderRadius: 10,
                            border: '1px solid rgba(0,0,0,0.12)',
                            background: '#ffffff',
                            color: tokens.secondary,
                            fontSize: 12,
                            fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          PDF
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Executive Lead Capture Block */}
        <div
          style={{
            background: 'linear-gradient(135deg, #191c1e 0%, #2b3035 100%)',
            borderRadius: 24,
            padding: isMobile ? '32px 20px' : '48px 44px',
            color: '#ffffff',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? '24px' : '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#ff8c42',
                marginBottom: 8,
                fontFamily: tokens.fonts.body,
              }}
            >
              Stay Ahead of Indian AI Regulation
            </div>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: isMobile ? '22px' : '28px',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                margin: '0 0 10px 0',
                lineHeight: 1.25,
              }}
            >
              Receive Our Monthly Executive Intelligence Briefings
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                fontFamily: tokens.fonts.body,
                margin: 0,
              }}
            >
              Curated breakdowns of DEPA for AI Training standards, DPDP Act compliance notices, and turnkey governance frameworks for enterprise leadership.
            </p>
          </div>

          <div>
            {newsletterSubmitted ? (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  borderRadius: 14,
                  padding: '20px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                  Subscription Confirmed
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                  Thank you for subscribing to GovernAI Intelligence Briefings.
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, flexDirection: isMobile ? 'column' : 'row' }}>
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter corporate or official email..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontSize: 14,
                      fontFamily: tokens.fonts.body,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '12px 22px',
                      borderRadius: 12,
                      background: tokens.primary,
                      color: '#ffffff',
                      border: 'none',
                      fontSize: 13.5,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: tokens.fonts.display,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                <div style={{ fontSize: 11.5, color: 'rgba(255, 255, 255, 0.6)', fontFamily: tokens.fonts.body }}>
                  Zero spam. Published exclusively for executive, legal, and government leadership.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
