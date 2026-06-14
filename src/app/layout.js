import { tokens } from '@/theme/tokens';
import {
  SITE,
  SITE_URL,
  SITE_KEYWORDS,
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
  webPageSchema,
  founderSchema,
  teamSchema,
  advisorSchema,
  developerSchema,
  faqSchema,
  insightsItemListSchema,
  creativeWorkSchema,
  eventSchema,
} from '@/config/seo';
import { insightsData, slugify } from '@/config/insightsData';
import { getDeveloperData } from '@/config/developer';
import './globals.css';

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'AI Governance, Compliance & Responsible AI | GovernAI',
      template: '%s | GovernAI',
    },
    description:
      'GovernAI helps governments, universities & enterprises deploy AI responsibly — ISO/IEC 42001 auditing, compliance & policy advisory. 2,000+ officials trained.',
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
      title: 'GovernAI — Governing Artificial Intelligence for a Responsible Future',
      description:
        'Deploy, monitor & scale AI with absolute compliance and zero bias. ISO/IEC 42001 auditing, capacity building & AI policy advisory for the public and private sector.',
      siteName: 'GovernAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GovernAI | AI Governance, Compliance & Responsible AI',
      description:
        'Deploy AI with absolute compliance and zero bias — ISO/IEC 42001 auditing, capacity building & AI policy advisory. 2,000+ officials trained across India.',
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
  // Full site-wide knowledge graph. Individual @id nodes interlink
  // (Organization ↔ founder ↔ employees ↔ website ↔ service).
  const dev = await getDeveloperData();

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(),
    professionalServiceSchema(),
    founderSchema(),
    ...teamSchema(),
    ...advisorSchema(),
    developerSchema(dev),
    faqSchema(),
    insightsItemListSchema(insightsData, slugify),
    creativeWorkSchema(dev),
  ];

  return (
    <html lang="en-IN">
      <head>
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
