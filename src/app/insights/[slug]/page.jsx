import { insightsData, getInsightBySlug, slugify } from '@/config/insightsData';
import { SITE_URL, articleSchema, breadcrumbSchema } from '@/config/seo';

export function generateStaticParams() {
  return insightsData.map((item) => ({ slug: slugify(item.title) }));
}

export default function InsightPage({ params }) {
  const insight = getInsightBySlug(params.slug);
  if (!insight) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h1>Insight not found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  const currentIndex = insightsData.findIndex((item) => slugify(item.title) === params.slug);
  const prev = currentIndex > 0 ? insightsData[currentIndex - 1] : null;
  const next = currentIndex < insightsData.length - 1 ? insightsData[currentIndex + 1] : null;

  const jsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Insights', path: '/#insights' },
      { name: insight.title, path: `/insights/${params.slug}/` },
    ]),
    articleSchema({
      slug: params.slug,
      title: insight.title,
      description: insight.description,
      image: insight.image,
      location: insight.location,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
        {/* Visible breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32, fontSize: 13, color: '#888' }}>
          <ol style={{ listStyle: 'none', display: 'flex', gap: 8, padding: 0, margin: 0 }}>
            <li>
              <a href="/" style={{ color: '#f16a24', textDecoration: 'none' }}>Home</a>
              <span style={{ marginLeft: 8 }}>/</span>
            </li>
            <li>
              <a href="/#insights" style={{ color: '#f16a24', textDecoration: 'none' }}>Insights</a>
              <span style={{ marginLeft: 8 }}>/</span>
            </li>
            <li style={{ color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>
              {insight.title}
            </li>
          </ol>
        </nav>

        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          {insight.title}
        </h1>

        {insight.location && (
          <p style={{ color: '#f16a24', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
            {insight.location}
          </p>
        )}

        <img
          src={insight.image}
          alt={insight.title}
          fetchpriority="high"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 500,
            objectFit: 'cover',
            borderRadius: 16,
            marginBottom: 32,
          }}
        />

        <p style={{ fontSize: 18, lineHeight: 1.7, color: '#333' }}>
          {insight.description}
        </p>

        {/* Contextual internal links */}
        <div style={{
          marginTop: 48, paddingTop: 32, borderTop: '1px solid #e5e7eb',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16,
        }}>
          {prev && (
            <a href={`/insights/${slugify(prev.title)}/`}
               style={{ color: '#f16a24', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              &larr; {prev.title}
            </a>
          )}
          <a href="/contact"
             style={{ color: '#f16a24', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            Contact Us &rarr;
          </a>
          {next && (
            <a href={`/insights/${slugify(next.title)}/`}
               style={{ color: '#f16a24', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              {next.title} &rarr;
            </a>
          )}
        </div>
      </article>
    </>
  );
}
