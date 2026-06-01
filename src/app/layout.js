import { tokens } from '@/theme/tokens';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://govern-ai.com'),
  title: {
    default: 'GovernAI',
    template: '%s | GovernAI',
  },
  description:
    'GovernAI provides the architectural framework to deploy, monitor, and scale AI systems with absolute compliance, ethical frameworks, and zero bias.',
  keywords: [
    'AI Governance',
    'Ethical AI',
    'AI Compliance',
    'Robust AI',
    'Trustworthy AI',
    'Artificial Intelligence Frameworks',
    'AI Policy',
  ],
  authors: [
    {
      name: 'Parishrut Jassal',
      url: 'https://linkedin.com/in/parishrut-jassal',
    },
  ],
  creator: 'GovernAI',
  publisher: 'GovernAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://govern-ai.com',
    title: 'GovernAI',
    description:
      'Architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias.',
    siteName: 'GovernAI',
    images: [
      {
        url: null, // Next.js will resolve relative to standard absolute URL
        width: 1200,
        height: 630,
        alt: 'GovernAI - Modern AI Confidence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GovernAI | Modern AI Confidence & Governance',
    description:
      'Architectural framework to deploy, monitor, and scale AI systems with absolute compliance and zero bias.',
    images: [null],
    creator: '@GovernAI',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
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
