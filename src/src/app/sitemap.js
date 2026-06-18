import { SITE_URL } from '@/config/seo';
import { insightsData, slugify } from '@/config/insightsData';

export const dynamic = 'force-static';

export default function sitemap() {
  const insightEntries = insightsData.map((item) => ({
    url: `${SITE_URL}/insights/${slugify(item.title)}/`,
    lastModified: item.datePublished
      ? new Date(item.datePublished)
      : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
    /* Image sitemap — improves Google Images ranking */
    images: item.image
      ? [`${SITE_URL}${item.image}`]
      : undefined,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...insightEntries,
  ];
}
