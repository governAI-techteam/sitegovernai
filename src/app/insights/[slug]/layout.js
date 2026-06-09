import { getInsightBySlug } from '@/config/insightsData';
import { SITE_URL } from '@/config/seo';

export function generateMetadata({ params }) {
  const insight = getInsightBySlug(params.slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.description,
    alternates: {
      canonical: `/insights/${params.slug}/`,
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/insights/${params.slug}/`,
      title: `${insight.title} — GovernAI Insights`,
      description: insight.description,
      images: [{ url: `${SITE_URL}${insight.image}`, width: 1200, height: 900, alt: insight.title }],
      siteName: 'GovernAI',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${insight.title} — GovernAI Insights`,
      description: insight.description,
      images: [`${SITE_URL}${insight.image}`],
    },
  };
}

export default function InsightsLayout({ children }) {
  return <>{children}</>;
}
