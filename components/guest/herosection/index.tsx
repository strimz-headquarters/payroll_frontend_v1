'use client'
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { MoveRight } from "lucide-react"
import { useRouter } from "next/navigation"
import WorldMapWithAnimatedOverlay from "./worldMap"
import PaddedLines from "./paddedLines"
import MovingText from "./MovingText"

/**
 * A hero section for the landing page.
 *
 * The section contains a heading, a paragraph, a call-to-action button, a world map with animated overlays, padded lines, and moving text.
 *
 * The heading is a large font text that is centered and has a font size of 64px on large screens, 56px on medium screens, and 46px on small screens.
 * The paragraph is a smaller font text that is centered and has a font size of 16px on large screens, 14px on medium screens, and 12px on small screens.
 * The call-to-action button is a large font text that is centered and has a font size of 16px on large screens, 14px on medium screens, and 12px on small screens.
 * The world map with animated overlays is a component that renders a world map with animated overlays.
 * The padded lines are a component that renders a series of padded lines.
 * The moving text is a component that renders a series of moving text.
 *
 * The section is responsive and has a max-width of 3xl on large screens, full-width on medium screens, and full-width on small screens.
 * The section has a padding of 64px on the top and 56px on the bottom on large screens, a padding of 56px on the top and 48px on the bottom on medium screens, and a padding of 48px on the top and 40px on the bottom on small screens.
 * The section has a background color of primary and an overflow-x of hidden.
 * The section has a z-index of 1.
 *
 * The section is rendered as a client component.
 */
const HeroSection = () => {

    const router = useRouter()

    return (
        <section className='w-full min-h-screen lg:pt-[64px] pt-[56px] overflow-x-hidden bg-primary '>
            <main className="max-w-3xl mx-auto w-full flex flex-col items-center gap-6 pb-12 px-4 lg:px-4">
                <div className="w-full flex flex-col items-center gap-4">
                    <h1 className="font-sora font-[700] lg:text-[64px] md:text-[56px] text-[46px] lg:leading-[64px] md:leading-[56px] leading-[48px] text-white text-center">Pay your team in crypto with ease</h1>
                    <p className="lg:w-[80%] font-[400] font-poppins md:text-[16px] text-[14px] md:leading-[28px] leading-[24px] text-center text-[#D1D5DB]">Strimz makes payroll simple by automating crypto payments on a set schedule. Designed for startups, DAOs, and freelancers.</p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <InteractiveHoverButton
                        type='button'
                        onClick={() => router.push("/login")}
                        icon={<MoveRight className="w-5 h-5" />}
                        innerClassName='bg-white rounded-[8px]'
                        className='w-[250px] h-[48px] flex justify-center items-center bg-accent rounded-[8px] cursor-pointer text-[14px] font-[500] font-poppins text-white hover:text-primary shadow-ctaShadow'>
                        Start Automating Payroll
                    </InteractiveHoverButton>
                </div>
            </main>

            <WorldMapWithAnimatedOverlay />

            {/* padded lines */}
            <PaddedLines />

            {/* Moving texts */}
            <MovingText />
        </section>
    )
}

export default HeroSection