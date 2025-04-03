'use client'
import Benefits from "@/components/guest/whyStrimz";
import BuiltForTrust from "@/components/guest/builtForTrust";
import HeroSection from "@/components/guest/herosection";
import HowItWorks from "@/components/guest/howItWorks";
import Pricings from "@/components/guest/pricings";
import Utility from "@/components/guest/utilitybill";

/**
 * The guest home page. This page is visible to users who are not signed in.
 *
 * @returns {JSX.Element} The guest home page.
 */
export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <Benefits />
      <Utility />
      <BuiltForTrust />
      <HowItWorks />
      <Pricings />
    </main>
  );
}
