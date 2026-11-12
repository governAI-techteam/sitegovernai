import { PageNav } from '@/components/organisms/PageNav';
import { Footer } from '@/components/organisms/Footer';
import { InsightsArchiveView } from '@/components/organisms/InsightsArchiveView';
import { insightsData, slugify } from '@/config/insightsData';
import { SITE_URL, breadcrumbSchema, insightsItemListSchema } from '@/config/seo';

export const metadata = {
  title: 'Insights, Research & Whitepapers — GovernAI',
  description:
    'Authoritative blueprints, policy SOPs, and governance frameworks for India’s sovereign AI and Digital Public Infrastructure (DPI) ecosystem, including DEPA for AI Training.',
  alternates: {
    canonical: '/insights/',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/insights/`,
    title: 'Insights, Research & Whitepapers — GovernAI',
    description:
      'Authoritative blueprints, policy SOPs, and governance frameworks for India’s sovereign AI and Digital Public Infrastructure (DPI) ecosystem, including DEPA for AI Training.',
    siteName: 'GovernAI',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights, Research & Whitepapers — GovernAI',
    description:
      'Authoritative blueprints, policy SOPs, and governance frameworks for India’s sovereign AI and Digital Public Infrastructure (DPI) ecosystem.',
  },
};

export default function InsightsPage() {
  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Insights & Research', path: '/insights/' },
    ]),
    insightsItemListSchema(insightsData, slugify),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageNav />
      <main id="main-content" role="main">
        <InsightsArchiveView initialItems={insightsData} />
      </main>
      <Footer />
    </>
  );
}
