"use client";

import { useRef } from "react";
import { ScrollProvider } from "@/context/ScrollContext";
import { useActiveSection } from "@/hooks/useActiveSection";

import { NavBar } from "@/components/organisms/NavBar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { PlatformSection } from "@/components/organisms/PlatformSection";
import { SolutionsSection } from "@/components/organisms/SolutionsSection";
import { ServicesSection } from "@/components/organisms/ServicesSection";
import { FrameworkSection } from "@/components/organisms/FrameworkSection";
import { WorkflowSection } from "@/components/organisms/WorkflowSection";
import { IndustriesSection } from "@/components/organisms/IndustriesSection";
import { StandardsSection } from "@/components/organisms/StandardsSection";
import { ResourcesSection } from "@/components/organisms/ResourcesSection";
import { InsightsSection } from "@/components/organisms/InsightsSection";
import { PricingSection } from "@/components/organisms/PricingSection";
import { Footer } from "@/components/organisms/Footer";

export default function GovernAI() {
  const sectionRefs = useRef({});
  const activeSection = useActiveSection(sectionRefs);

  return (
    <ScrollProvider sectionRefs={sectionRefs}>
      <NavBar activeSection={activeSection} />

      <HeroSection       sectionRefs={sectionRefs} />
      <PlatformSection   sectionRefs={sectionRefs} />
      <SolutionsSection  sectionRefs={sectionRefs} />
      <ServicesSection   sectionRefs={sectionRefs} />
      <FrameworkSection  sectionRefs={sectionRefs} />
      <WorkflowSection   sectionRefs={sectionRefs} />
      <IndustriesSection sectionRefs={sectionRefs} />
      <StandardsSection  sectionRefs={sectionRefs} />
      <ResourcesSection  sectionRefs={sectionRefs} />
      <InsightsSection   sectionRefs={sectionRefs} />
      <PricingSection    sectionRefs={sectionRefs} />
      
      <Footer />
    </ScrollProvider>
  );
}
