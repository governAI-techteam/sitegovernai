"use client";

import { useRef } from "react";
import { ScrollProvider } from "@/context/ScrollContext";
import { useActiveSection } from "@/hooks/useActiveSection";

import {LandingSection} from "@/components/organisms/LandingSection";
import { Footer } from "@/components/organisms/Footer";

export default function GovernAI() {
  const sectionRefs = useRef({});
  const activeSection = useActiveSection(sectionRefs);

        return (
          <>
     
      <LandingSection sectionRefs={sectionRefs} />
      
     <Footer />
           </>
    
  );
}
