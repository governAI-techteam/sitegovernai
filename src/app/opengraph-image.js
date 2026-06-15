import { ImageResponse } from 'next/og';

/* Site-wide Open Graph image — statically generated at build time.
   Placed at the app root so every route inherits it, except routes
   (e.g. /insights/[slug]) that define their own image. 1200x630 is the
   recommended share-card size for Google, LinkedIn, X, and messaging apps. */

export const dynamic = 'force-static';

export const alt =
  'GovernAI — Governing Artificial Intelligence for a Responsible Future';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export default function Image() {
  const ORANGE = '#f16a24';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #0b0b0d 0%, #131418 55%, #1a1410 100%)',
          color: '#ffffff',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top orange accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            display: 'flex',
            background: `linear-gradient(90deg, transparent 0%, ${ORANGE} 30%, ${ORANGE} 70%, transparent 100%)`,
          }}
        />

        {/* Soft orange glow */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            display: 'flex',
            background:
              'radial-gradient(circle, rgba(241,106,36,0.22) 0%, rgba(241,106,36,0) 70%)',
          }}
        />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 50, fontWeight: 800, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#ffffff' }}>Govern</span>
          <span style={{ color: ORANGE }}>AI</span>
        </div>

        {/* Headline + supporting copy */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 1000,
            }}
          >
            Governing Artificial Intelligence for a Responsible Future
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 28,
              width: 96,
              height: 6,
              borderRadius: 3,
              background: ORANGE,
            }}
          />

          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              color: 'rgba(255,255,255,0.72)',
              letterSpacing: '0.01em',
            }}
          >
            ISO/IEC 42001 Auditing · AI Compliance · Policy Advisory
          </div>
        </div>

        {/* Proof / footer strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 25,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <span style={{ color: ORANGE }}>2,000+</span>
          <span style={{ marginLeft: 10, color: 'rgba(255,255,255,0.85)' }}>Officials Trained</span>
          <span style={{ margin: '0 18px', color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span style={{ color: ORANGE }}>20+</span>
          <span style={{ marginLeft: 10 }}>Institutions</span>
          <span style={{ margin: '0 18px', color: 'rgba(255,255,255,0.3)' }}>•</span>
          <span>India &amp; Global</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
