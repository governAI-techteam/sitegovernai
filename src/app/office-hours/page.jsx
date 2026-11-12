import Script from 'next/script';
import { PageNav } from '@/components/organisms/PageNav';
import { OfficeHoursView } from '@/components/organisms/OfficeHoursView';
import { Footer } from '@/components/organisms/Footer';
import { SITE_URL, breadcrumbSchema } from '@/config/seo';

export const metadata = {
  title: 'GovernAI Workflow Clinic — Practical AI Guidance & Task Resolution for UP Govt Officials',
  description:
    'Interactive 60-minute virtual sessions with our expert for UP Government Officials. Pre-submit operational queries, explore Agentic AI and Harness, and assist with institutional task Gen-AI Workflows.',
  alternates: {
    canonical: '/office-hours',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/office-hours`,
    title: 'GovernAI Workflow Clinic — Practical AI Guidance & Task Resolution',
    description:
      'Live 60-minute interactive sessions with our expert. Pre-submit your operational queries, explore Agentic AI and Harness, and assist with institutional task Gen-AI Workflows.',
  },
};

export default function OfficeHoursPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Workflow Clinic', path: '/office-hours' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE_URL}/office-hours#service`,
      name: 'GovernAI Workflow Clinic & Practical AI Guidance',
      provider: { '@id': `${SITE_URL}/#organization` },
      description:
        'Interactive 60-minute virtual sessions with our expert for UP Government Officials to resolve operational queries, demonstrate Agentic AI and Harness, and assist with institutional task Gen-AI Workflows.',
      areaServed: 'IN',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Workflow Clinic Passes',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Monthly Pass (2 Sessions)',
            price: '1999',
            priceCurrency: 'INR',
          },
          {
            '@type': 'Offer',
            name: 'Quarterly Pass (12 Sessions)',
            price: '5999',
            priceCurrency: 'INR',
          },
        ],
      },
    },
  ];

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageNav />
      <main>
        <OfficeHoursView />
      </main>
      <Footer />
    </>
  );
}
