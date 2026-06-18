import { SafeImage } from '@/components/atoms/SafeImage';
import { insightsData, getInsightBySlug, slugify } from '@/config/insightsData';
import { SITE_URL, articleSchema, breadcrumbSchema, eventSchema } from '@/config/seo';

export function generateStaticParams() {
  return insightsData.map((item) => ({ slug: slugify(item.title) }));
}

/* Estimated reading time — ~200 words per minute for professional content */
function getReadingTime(text) {
  if (!text) return 1;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* Format ISO date to human-readable (cross-browser, no Intl dependency) */
function formatDate(isoDate) {
  if (!isoDate) return null;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${months[month - 1]} ${day}, ${year}`;
}

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h1>Insight not found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  const currentIndex = insightsData.findIndex((item) => slugify(item.title) === slug);
  const prev = currentIndex > 0 ? insightsData[currentIndex - 1] : null;
  const next = currentIndex < insightsData.length - 1 ? insightsData[currentIndex + 1] : null;
  const bodyText = insight.content || insight.description;
  const readingTime = getReadingTime(bodyText);

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
      { name: 'Insights', path: '/#insights' },
      { name: insight.title, path: `/insights/${slug}/` },
    ]),
    articleSchema(insightData),
    ...(eventLd ? [eventLd] : []),
  ];

  /* Related insights — pick 3 from the same location or nearby indices.
     This triples internal link density per page. */
  const related = insightsData
    .filter((item, idx) => idx !== currentIndex)
    .filter((item) =>
      item.location === insight.location ||
      Math.abs(insightsData.indexOf(item) - currentIndex) <= 5
    )
    .slice(0, 3);

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

        {/* Article meta — date, author, reading time */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          marginBottom: 24,
          fontSize: 14,
          color: '#666',
        }}>
          {insight.datePublished && (
            <time dateTime={insight.datePublished} style={{ fontWeight: 500 }}>
              {formatDate(insight.datePublished)}
            </time>
          )}
          {insight.author && (
            <>
              <span aria-hidden="true" style={{ color: '#ccc' }}>·</span>
              <address style={{ fontStyle: 'normal', fontWeight: 500 }}>
                By {insight.author}
              </address>
            </>
          )}
          <span aria-hidden="true" style={{ color: '#ccc' }}>·</span>
          <span>{readingTime} min read</span>
        </div>

        {insight.location && (
          <p style={{ color: '#f16a24', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
            {insight.location}
          </p>
        )}

        <SafeImage
          src={insight.image}
          alt={insight.title}
          fetchPriority="high"
          loading="eager"
          width={800}
          height={500}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 500,
            objectFit: 'cover',
            borderRadius: 16,
            marginBottom: 32,
          }}
        />

        {(insight.content || insight.description).split('\n').filter(Boolean).map((para, i) => (
          <p key={i} style={{ fontSize: 18, lineHeight: 1.7, color: '#333', marginBottom: 16 }}>
            {para}
          </p>
        ))}

        {/* Related Insights — internal cross-linking for SEO */}
        {related.length > 0 && (
          <section aria-label="Related insights" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Related Insights
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {related.map((item) => (
                <a
                  key={item.id}
                  href={`/insights/${slugify(item.title)}/`}
                  style={{
                    display: 'block',
                    padding: '14px 16px',
                    borderRadius: 10,
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{item.title}</span>
                  {item.location && (
                    <span style={{ display: 'block', fontSize: 12, color: '#888', marginTop: 4 }}>
                      {item.location}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Contextual internal links */}
        <div style={{
          marginTop: 32, paddingTop: 24, borderTop: '1px solid #e5e7eb',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16,
        }}>
          {prev && (
            <a href={`/insights/${slugify(prev.title)}/`}
               style={{ color: '#f16a24', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              &larr; {prev.title}
            </a>
          )}
          <a href="/contact/"
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
