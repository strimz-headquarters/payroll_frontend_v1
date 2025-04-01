import HeroSection from "@/components/guest/herosection";


/**
 * The guest home page. This page is visible to users who are not signed in.
 *
 * @returns {JSX.Element} The guest home page.
 */
export default function Home() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden">
      <HeroSection />
    </main>
  );
}
