export function generateMetadata({ params }) {
  return {
    title: `Insight: ${params.slug}`,
    description: `Details about ${params.slug}`,
  };
}

export default function Insights({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Insight Page: {slug}</h1>
      <p>This is a dynamic page for {slug}</p>
    </div>
  );
}