'use client';

import { useRef } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ScrollProvider } from '@/context/ScrollContext';
import { NavBar } from '@/components/organisms/NavBar';

import { LandingSection } from '@/components/organisms/LandingSection';
import { DomainsSection } from '@/components/organisms/DomainsSection';
import ClientsMarqueeSection from '@/components/organisms/ClientsMarqueeSection';

import InsightsCarouselSection from '@/components/organisms/InsightsCarouselSection';
import ImageCard from '@/components/molecules/ImageCard';
import { Footer } from '@/components/organisms/Footer';
import { Preloader } from '@/components/molecules/Preloader';
import { FadeIn } from '@/components/atoms/FadeIn';

export default function GovernAI() {
  const sectionRefs = useRef({});
  const activeSection = useActiveSection(sectionRefs);

  return (
    <ScrollProvider sectionRefs={sectionRefs}>
      <Preloader />

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

        {/* Divider */}
        <div style={{ maxWidth: 720, margin: '0 auto', height: 1, background: 'linear-gradient(90deg, transparent, rgba(234,105,38,0.15), transparent)' }} />

        {/* 3. Institutional Clients Served */}
        <section id="platform" ref={(el) => (sectionRefs.current['platform'] = el)}>
          <ClientsMarqueeSection />
        </section>

        {/* Divider */}
        <div style={{ maxWidth: 720, margin: '0 auto', height: 1, background: 'linear-gradient(90deg, transparent, rgba(234,105,38,0.15), transparent)' }} />

        {/* 4. Insights */}
        <section id="insights" ref={(el) => (sectionRefs.current['insights'] = el)}>
          <InsightsCarouselSection />
        </section>

        {/* Divider */}
        <div style={{ maxWidth: 720, margin: '0 auto', height: 1, background: 'linear-gradient(90deg, transparent, rgba(234,105,38,0.15), transparent)' }} />

        {/* 5. Meet the Team (Founder + Team + Advisor) */}
        <section id="team" ref={(el) => (sectionRefs.current['team'] = el)}>
          <FadeIn delay={0.2} yOffset={40}>
            <ImageCard />
          </FadeIn>
        </section>
      </main>

      <Footer />
    </ScrollProvider>
  );
}
