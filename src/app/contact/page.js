import { PageNav } from '@/components/organisms/PageNav';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';
import { SITE_URL, breadcrumbSchema } from '@/config/seo';

export const metadata = {
  title: 'Contact Us — AI Governance Enquiries',
  description:
    'Get in touch with GovernAI for AI governance capacity building, ISO/IEC 42001 compliance auditing, and policy advisory. We respond within one business day.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact`,
    title: 'Contact GovernAI — AI Governance Enquiries',
    description:
      'Partner with GovernAI to deploy AI with absolute compliance and zero bias. Reach our team today.',
  },
};

export default function ContactPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#contactpage`,
      url: `${SITE_URL}/contact`,
      name: 'Contact GovernAI',
      description:
        'Contact GovernAI for AI governance capacity building, compliance auditing, and policy advisory.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageNav />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
