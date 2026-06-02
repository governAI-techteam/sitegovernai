export const metadata = {
  // Placeholder route — keep out of the index until real content ships.
  robots: { index: false, follow: false },
};

export default function InsightsLayout({ children }) {
  return (
    <section>
      <h2>Insights Section</h2>
      {children}
    </section>
  );
}
