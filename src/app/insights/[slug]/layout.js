import { getInsightBySlug } from '@/config/insightsData';
import { SITE_URL } from '@/config/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};

  return {
    title: `${insight.title} — GovernAI Insights`,
    description: insight.description,
    alternates: {
      canonical: `/insights/${slug}/`,
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/insights/${slug}/`,
      title: `${insight.title} — GovernAI Insights`,
      description: insight.description,
      images: [{ url: `${SITE_URL}${insight.image}`, width: 1200, height: 900, alt: insight.title }],
      siteName: 'GovernAI',
      locale: 'en_IN',
      /* Article-specific OG tags — critical for social + search */
      ...(insight.datePublished ? { publishedTime: insight.datePublished } : {}),
      ...(insight.author ? { authors: [insight.author] } : {}),
      section: 'AI Governance',
      tags: ['AI Governance', 'Responsible AI', 'AI Policy', insight.title],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${insight.title} — GovernAI Insights`,
      description: insight.description,
      images: [`${SITE_URL}${insight.image}`],
      creator: '@governaiofc',
    },
    /* Per-article keywords for niche search targeting */
    keywords: [
      insight.title,
      'AI Governance',
      'Responsible AI',
      ...(insight.location ? [insight.location] : []),
      'GovernAI',
    ],
  };
}

export default function InsightsLayout({ children }) {
  return <>{children}</>;
}
