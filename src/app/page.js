'use client';

import { useRef } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';

import { LandingSection } from '@/components/organisms/LandingSection';
import { DomainsSection } from '@/components/organisms/DomainsSection';
import ClientsMarqueeSection from '@/components/organisms/ClientsMarqueeSection';
import { SolutionsSection } from '@/components/organisms/SolutionsSection';
import { ProductSection } from '@/components/organisms/ProductSection';
import LinkedInCarouselSection from '@/components/organisms/LinkedInCarouselSection';
import { FounderProfile } from '@/components/organisms/FounderProfile';
import ImageCard from '@/components/molecules/ImageCard';
import { Footer } from '@/components/organisms/Footer';
import { Preloader } from '@/components/molecules/Preloader';
import { FadeIn } from '@/components/atoms/FadeIn';

export default function GovernAI() {
  const sectionRefs = useRef({});
  const activeSection = useActiveSection(sectionRefs);

  return (
    <>
      <Preloader />

      <main>
        {/* 1. Hero */}
        <section ref={(el) => (sectionRefs.current['hero'] = el)}>
          <LandingSection sectionRefs={sectionRefs} />
        </section>

        {/* 2. Our Three Domains */}
        <section id="domains" ref={(el) => (sectionRefs.current['domains'] = el)}>
          <DomainsSection />
        </section>

        {/* 3. Institutional Clients Served */}
        <section id="platform" ref={(el) => (sectionRefs.current['platform'] = el)}>
          <ClientsMarqueeSection />
        </section>

        {/* 4. Solutions - AI TRiSM & Model Card */}
        <section id="solutions" ref={(el) => (sectionRefs.current['solutions'] = el)}>
          <SolutionsSection sectionRefs={sectionRefs} />
        </section>

        {/* 5. Products */}
        <section id="products" ref={(el) => (sectionRefs.current['products'] = el)}>
          <ProductSection />
        </section>

        {/* 6. LinkedIn */}
        <section id="linkedin" ref={(el) => (sectionRefs.current['linkedin'] = el)}>
          <LinkedInCarouselSection />
        </section>

        {/* 7. Meet the Founder (second-to-last) */}
        <section id="founder" ref={(el) => (sectionRefs.current['founder'] = el)}>
          <FadeIn delay={0.2} yOffset={30}>
            <FounderProfile />
          </FadeIn>
        </section>

        {/* 8. Meet the Team (last) */}
        <section id="team" ref={(el) => (sectionRefs.current['team'] = el)}>
          <FadeIn delay={0.2} yOffset={40}>
            <ImageCard />
          </FadeIn>
        </section>
      </main>

      <Footer />
    </>
  );
}
