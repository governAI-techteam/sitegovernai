'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ScrollProvider } from '@/context/ScrollContext';
import { NavBar } from '@/components/organisms/NavBar';

import { LandingSection } from '@/components/organisms/LandingSection';
import { DomainsSection } from '@/components/organisms/DomainsSection';
import ClientsMarqueeSection from '@/components/organisms/ClientsMarqueeSection';

import InsightsCarouselSection from '@/components/organisms/InsightsCarouselSection';
import ImageCard from '@/components/molecules/ImageCard';
import { FAQSection } from '@/components/organisms/FAQSection';
import { Footer } from '@/components/organisms/Footer';
import { Preloader } from '@/components/molecules/Preloader';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { Reveal } from '@/components/atoms/Reveal';
import { webPageSchema, faqSchema, insightsItemListSchema, stateServiceAreasSchema } from '@/config/seo';
import { insightsData, slugify } from '@/config/insightsData';

/* Module-level flag — persists across SPA navigations, resets on full reload */
let _navigatedAway = false;

function Divider() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth: 720,
        margin: '0 auto',
        height: 1,
        transformOrigin: 'center',
        background:
          'linear-gradient(90deg, transparent, rgba(241,106,36,0.25), transparent)',
      }}
    />
  );
}

export default function GovernAI() {
  const sectionRefs = useRef({});
  const activeSection = useActiveSection(sectionRefs);

  // Skip preloader only on SPA navigations back to home (e.g. from /contact)
  const [skipLoader] = useState(() => _navigatedAway);

  // Home-page-specific structured data (WebPage + FAQ + Insights ItemList).
  // Kept here rather than in the root layout so it is emitted only on the
  // homepage, where the matching visible content (FAQ section, insights) lives.
  const homeJsonLd = [
    webPageSchema(),
    faqSchema(),
    insightsItemListSchema(insightsData, slugify),
    stateServiceAreasSchema(),
  ];

  useEffect(() => {
    return () => { _navigatedAway = true; };
  }, []);

  return (
    <ScrollProvider sectionRefs={sectionRefs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {!skipLoader && <Preloader />}
      <ScrollProgress />

      <NavBar activeSection={activeSection} />

      <main id="main-content" role="main">
        {/* 1. Hero */}
        <section aria-label="Hero — Governing AI for a Responsible Future" ref={(el) => (sectionRefs.current['hero'] = el)}>
          <LandingSection sectionRefs={sectionRefs} />
        </section>

        {/* 2. Institutional Clients Served */}
        <section id="platform" aria-label="Institutional Clients and Engagements" ref={(el) => (sectionRefs.current['platform'] = el)}>
          <ClientsMarqueeSection />
        </section>

        <Divider />

        {/* 3. Our Domains */}
        <section id="domains" aria-label="Our Domains of AI Governance" ref={(el) => (sectionRefs.current['domains'] = el)}>
          <DomainsSection />
        </section>

        <Divider />

        {/* 4. Insights */}
        <section id="insights" aria-label="Insights and Impact" ref={(el) => (sectionRefs.current['insights'] = el)}>
          <InsightsCarouselSection />
        </section>

        <Divider />

        {/* 5. Meet the Team (Founder + Team + Advisor) */}
        <section id="team" aria-label="Meet Our Team" ref={(el) => (sectionRefs.current['team'] = el)}>
          <ImageCard />
        </section>
      </main>

      <Footer />
    </ScrollProvider>
  );
}
