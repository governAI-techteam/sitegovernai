import Script from 'next/script';
import { tokens } from '@/theme/tokens';
import {
  SITE,
  SITE_URL,
  SITE_KEYWORDS,
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
  founderSchema,
  teamSchema,
  advisorSchema,
  developerSchema,
  creativeWorkSchema,
  trustBackboneSchema,
} from '@/config/seo';
import { getDeveloperData } from '@/config/developer';
import './globals.css';

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'GovernAI — AI Governance, Compliance & ISO 42001',
      template: '%s | GovernAI',
    },
    description:
      'GovernAI delivers AI governance capacity building, ISO/IEC 42001 compliance auditing & responsible AI policy advisory. 2,000+ officials trained across India.',
    applicationName: 'GovernAI',
    keywords: SITE_KEYWORDS,
    category: 'technology',
    creator: 'GovernAI',
    publisher: 'GovernAI OPC Pvt. Ltd.',
    alternates: {
      canonical: SITE_URL,
      languages: {
        'en-IN': SITE_URL,
        'en': SITE_URL,
        'x-default': SITE_URL,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: SITE_URL,
      title: 'GovernAI — AI Governance, Compliance & Capacity Building for India',
      description:
        'AI governance capacity building, ISO/IEC 42001 auditing & responsible AI policy advisory for governments, universities & enterprises. 2,000+ officials trained across 10+ states.',
      siteName: 'GovernAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GovernAI — AI Governance & ISO 42001 Compliance Advisory',
      description:
        'AI governance capacity building, ISO/IEC 42001 compliance auditing & responsible AI advisory. 2,000+ officials trained. 20+ institutional engagements across India.',
      creator: SITE.twitter,
      site: SITE.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
    other: {
      'image_src': `${SITE_URL}${SITE.ogImage}`,
    },
    authors: [
      { name: 'Divyakush Punjabi', url: 'https://divyakush2006.github.io/divyakush-resume/' },
    ],
  };
}

export const viewport = {
  themeColor: '#f16a24',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  // Site-wide entity knowledge graph. Page-specific schemas (WebPage, FAQPage,
  // ItemList) live on the home page only, so they aren't emitted on routes
  // that don't display that content.
  const dev = await getDeveloperData();

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    professionalServiceSchema(),
    founderSchema(),
    ...teamSchema(),
    ...advisorSchema(),
    developerSchema(dev),
    creativeWorkSchema(dev),
    ...trustBackboneSchema(),
  ];

  return (
    <html lang="en-IN">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WKMKFJ48QC"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WKMKFJ48QC');
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Preload critical display font for faster LCP */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap"
          as="style"
        />
        {/* Developer credits — standard web convention */}
        <link rel="author" href="/humans.txt" />
        {/* Developer identity backlinks (rel=me) — invisible, standard identity
            relation that ties the developer's profiles to this site. */}
        <link rel="me" href="https://divyakush2006.github.io/divyakush-resume/" />
        <link rel="me" href="https://linkedin.com/in/divyakush-punjabi" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        style={{
          fontFamily: tokens.fonts.body,
          color: tokens.onSurface,
          background: tokens.surface,
        }}
      >
        {children}
      </body>
    </html>
  );
}
