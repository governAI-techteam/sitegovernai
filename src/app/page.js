'use client';

import { useRef } from 'react';
import { ScrollProvider } from '@/context/ScrollContext';
import { useActiveSection } from '@/hooks/useActiveSection';

import { LandingSection } from '@/components/organisms/LandingSection';
import { Footer } from '@/components/organisms/Footer';
import { Preloader } from '@/components/molecules/Preloader';



export default function GovernAI() {
  const sectionRefs = useRef({});
  const activeSection = useActiveSection(sectionRefs);

  return (
    <>
      <Preloader />
      
      <LandingSection sectionRefs={sectionRefs} />
      
      
      <Footer />
    </>
  );
}
