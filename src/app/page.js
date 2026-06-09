'use client';

import { useRef } from 'react';
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

  return (
    <ScrollProvider sectionRefs={sectionRefs}>
      <Preloader />
      <ScrollProgress />

      <NavBar activeSection={activeSection} />

      <main>
        {/* 1. Hero */}
        <section ref={(el) => (sectionRefs.current['hero'] = el)}>
          <LandingSection sectionRefs={sectionRefs} />
        </section>

        {/* 2. Our Domains */}
        <section id="domains" ref={(el) => (sectionRefs.current['domains'] = el)}>
          <DomainsSection />
        </section>

        <Divider />

        {/* 3. Institutional Clients Served */}
        <section id="platform" ref={(el) => (sectionRefs.current['platform'] = el)}>
          <ClientsMarqueeSection />
        </section>

        <Divider />

        {/* 4. Insights */}
        <section id="insights" ref={(el) => (sectionRefs.current['insights'] = el)}>
          <InsightsCarouselSection />
        </section>

        <Divider />

        {/* 5. Meet the Team (Founder + Team + Advisor) */}
        <section id="team" ref={(el) => (sectionRefs.current['team'] = el)}>
          <Reveal y={48} delay={0.1}>
            <ImageCard />
          </Reveal>
        </section>
      </main>

      <Footer />
    </ScrollProvider>
  );
}
