'use client'
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import { MoveRight } from "lucide-react"
import { useRouter } from "next/navigation"
import WorldMapWithAnimatedOverlay from "./worldMap"

/**
 * The HeroSection component renders a section with a heading, a paragraph, and a button.
 * The heading is "Pay your team in crypto with ease".
 * The paragraph is "Strimz makes payroll simple by automating crypto payments on a set schedule. Designed for startups, DAOs, and freelancers."
 * The button is an InteractiveHoverButton with a MoveRight icon, and the text "Start Automating Payroll".
 * When the button is clicked, it navigates to the "/login" route.
 * The section also renders a WorldMapWithAnimatedOverlay below the button.
 */
const HeroSection = () => {

    const router = useRouter()

    return (
        <section className='w-full min-h-screen lg:pt-[64px] pt-[56px] pb-16 overflow-x-hidden bg-primary '>
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
        </section>
    )
}

export default HeroSection