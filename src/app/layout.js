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
} from '@/config/seo';
import './globals.css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'GovernAI | AI Governance, Compliance & Responsible AI',
    template: '%s | GovernAI',
  },
  description:
    'GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance, ethical frameworks, and zero bias. AI governance capacity building, ISO/IEC 42001 auditing, and policy advisory for governments, universities, and enterprises.',
  applicationName: 'GovernAI',
  keywords: SITE_KEYWORDS,
  category: 'technology',
  authors: [
    {
      name: 'Parishrut Jassal',
      url: 'https://linkedin.com/in/parishrut-jassal',
    },
  ],
  creator: 'GovernAI',
  publisher: 'GovernAI OPC Pvt. Ltd.',
  alternates: {
    canonical: '/',
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
    title: 'GovernAI | Governing Artificial Intelligence for a Responsible Future',
    description:
      'The architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias. Capacity building, ISO/IEC 42001 auditing, and policy advisory.',
    siteName: 'GovernAI',
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: 'GovernAI — Governing Artificial Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GovernAI | AI Governance, Compliance & Responsible AI',
    description:
      'The architectural framework to deploy, monitor, and scale AI with absolute compliance and zero bias.',
    images: [SITE.ogImage],
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
};

export const viewport = {
  themeColor: '#f16a24',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  // Full site-wide knowledge graph. Individual @id nodes interlink
  // (Organization ↔ founder ↔ employees ↔ website ↔ service).
  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema(),
    professionalServiceSchema(),
    founderSchema(),
    ...teamSchema(),
    advisorSchema(),
    developerSchema(),
    faqSchema(),
  ];

  return (
    <html lang="en-IN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Structured data — Organization, WebSite, ProfessionalService */}
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
