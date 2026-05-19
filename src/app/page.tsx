"use client";

import { useTracking } from "@/hooks/useTracking";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Welcome } from "@/components/Welcome";
import { WhyUs } from "@/components/WhyUs";
import { Locations } from "@/components/Locations";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import { SITE_ID, SITE_KEY, CUSTOMER_GTM_ID } from "@/components/Brand";

export default function AchillesFootAnkleLandingPage() {
  useTracking({ siteKey: SITE_KEY, siteId: SITE_ID, gtmId: CUSTOMER_GTM_ID });

  return (
    <main className="bg-white">
      <QueryParamPersistence />
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Welcome />
      <WhyUs />
      <Locations />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
