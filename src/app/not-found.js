import Link from 'next/link';
import { tokens } from '@/theme/tokens';

export const metadata = {
  title: 'Page Not Found — GovernAI',
  description:
    'The page you are looking for does not exist. Explore GovernAI for AI governance, responsible AI training, ISO/IEC 42001 compliance, and policy advisory.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        background: tokens.surface,
        fontFamily: tokens.fonts.body,
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.primary,
            marginBottom: 16,
          }}
        >
          404 — Page Not Found
        </p>
        <h1
          style={{
            fontFamily: tokens.fonts.display,
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: tokens.onSurface,
            marginBottom: 18,
          }}
        >
          This page doesn&apos;t exist.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: tokens.secondary,
            lineHeight: 1.65,
            marginBottom: 36,
          }}
        >
          The page you&apos;re looking for may have been moved or removed. Explore
          GovernAI&apos;s AI governance solutions, responsible AI training programs,
          and compliance services below.
        </p>

        <nav
          aria-label="Helpful links"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #f16a24 0%, #e05a18 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              fontFamily: tokens.fonts.display,
              letterSpacing: '0.02em',
              boxShadow: '0 6px 20px rgba(234, 105, 38, 0.3)',
            }}
          >
            Go to Home
          </Link>
          <Link
            href="/contact/"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: 14,
              background: '#fff',
              color: tokens.onSurface,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              fontFamily: tokens.fonts.display,
              letterSpacing: '0.02em',
              border: '1.5px solid rgba(0,0,0,0.08)',
            }}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </main>
  );
}
