'use client'
import HeroSection from "@/components/guest/herosection";
import Benefits from "@/components/guest/whyStrimz";

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
    </main>
  );
}
