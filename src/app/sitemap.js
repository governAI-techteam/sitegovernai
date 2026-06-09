import { SITE_URL } from '@/config/seo';
import { insightsData, slugify } from '@/config/insightsData';

export default function sitemap() {
  const now = new Date();

  const insightEntries = insightsData.map((item) => ({
    url: `${SITE_URL}/insights/${slugify(item.title)}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...insightEntries,
  ];
}
