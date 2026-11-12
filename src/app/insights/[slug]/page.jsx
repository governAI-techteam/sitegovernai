import { PageNav } from '@/components/organisms/PageNav';
import { Footer } from '@/components/organisms/Footer';
import { PublicationReader } from '@/components/organisms/PublicationReader';
import { insightsData, getInsightBySlug, slugify } from '@/config/insightsData';
import { articleSchema, breadcrumbSchema, eventSchema } from '@/config/seo';

export function generateStaticParams() {
  return insightsData.map((item) => ({ slug: item.slug || slugify(item.title) }));
}

function getReadingTime(text) {
  if (!text) return '1 min read';
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return (
      <>
        <PageNav />
        <div style={{ padding: '140px 24px', textAlign: 'center', minHeight: '60vh' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Publication Not Found</h1>
          <p style={{ color: '#666', marginBottom: 24 }}>The publication or insight you are looking for does not exist.</p>
        </div>
        <Footer />
      </>
    );
  }

  const currentIndex = insightsData.findIndex(
    (item) => (item.slug && item.slug === slug) || slugify(item.title) === slug
  );
  const prev = currentIndex > 0 ? insightsData[currentIndex - 1] : null;
  const next = currentIndex < insightsData.length - 1 ? insightsData[currentIndex + 1] : null;

  const bodyText = insight.content || insight.description;
  const readingTime = insight.readTime || getReadingTime(bodyText);

  const insightData = {
    slug: slug,
    title: insight.title,
    description: insight.description,
    image: insight.image,
    location: insight.location,
    datePublished: insight.datePublished,
    author: insight.author,
  };

  const eventLd = eventSchema(insightData);

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Insights & Research', path: '/insights/' },
      { name: insight.title, path: `/insights/${slug}/` },
    ]),
    articleSchema(insightData),
    ...(eventLd ? [eventLd] : []),
  ];

  // Related insights — prioritize same category or nearby publications
  const related = insightsData
    .filter((item, idx) => idx !== currentIndex)
    .filter(
      (item) =>
        (insight.category && item.category === insight.category) ||
        (insight.location && item.location === insight.location) ||
        Math.abs(insightsData.indexOf(item) - currentIndex) <= 4
    )
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageNav />
      <PublicationReader
        insight={insight}
        readingTime={readingTime}
        related={related}
        prev={prev}
        next={next}
      />
      <Footer />
    </>
  );
}
