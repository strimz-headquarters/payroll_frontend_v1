/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { plans } from '@/utils/pricingPlans';
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import Logo from "@/components/shared/Logo";
import StrimzLogo from "@/public/logo/blueLogo.png"
import { Badge } from "../ui/badge";
import { PlansType } from "@/types/guestpage";

/**
 * The Plans component renders a pricing page.
 *
 * The component renders a header with a logo and a sign out button.
 * It also renders a section with a heading and a paragraph, and a main section with a tabs component.
 *
 * The tabs component renders two tabs, one for monthly and one for yearly plans.
 * Each tab renders a section with a grid of plans, with each plan rendered as a div with a class of "h-[420px] rounded-[16px] border border-[#E5E7EB] bg-[#F9FAFB] cursor-pointer transition-all duration-200 group hover:bg-primary shadow-subCardShadow flex flex-col justify-between p-6 relative".
 * Each plan renders an icon, a heading, a paragraph, a list of features, and a button.
 *
 * The button is a Next.js Link component that links to the user page.
 *
 * The component also renders a badge component on the recommended plan.
 *
 * @returns {JSX.Element} The plans page component.
 */
const Plans = () => {

    const router = useRouter()
    const handleClick = () => {
        router.push("/user")
    }

    // logout
    const handleLogout = () => {
        localStorage.removeItem("strimzUser");
        router.push("/login")
    }

    return (
        <>
            <header className="w-full flex justify-between items-center lg:px-16 md:px-8 px-5">
                <Logo href='/' className='md:w-[114.28px] w-[101px]' image={StrimzLogo} />

                <button type="button" onClick={handleLogout} className="bg-[#F3F4F6] w-[87px] h-[40px] border border-[#E5E7EB] flex justify-center items-center shadow-[0px_-2px_4px_0px_#00000014_inset] rounded-[8px]">Sign out</button>
            </header>

            <section className="w-full flex flex-col items-center mt-12">
                <h3 className="font-[700] font-sora text-strimzPrimary md:text-[32px] md:leading-[36px] text-[28px] leading-[28px]">Choose your plan</h3>
                <p className="lg:w-[40%] md:w-[55%] w-full px-3 md:px-0 mt-2 font-[400] font-poppins text-[#58556A] text-[14px] leading-[24px] text-center">Unlock the tools you need to simplify payments and scale your operations. Start free or upgrade for advanced features</p>

                <main className="w-full flex flex-col items-center mt-8 lg:px-10 md:px-16 px-6">
                    <Tabs defaultValue="monthly" className="w-full flex flex-col items-center">
                        <TabsList className="md:w-[400px] w-[85%] grid grid-cols-2 mb-3">
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly">Yearly</TabsTrigger>
                        </TabsList>
                        <p className="text-center text-sm font-[400] font-poppins"><span className="text-accent">Save 15%</span> on a yearly subscription</p>

                        {/* monthly subscription */}
                        <TabsContent className="w-full lg:mt-16 md:mt-10 mt-8" value="monthly">
                            <section className="w-full grid lg:grid-cols-4 md:grid-cols-2 lg:gap-8 md:gap-12 gap-8">
                                {
                                    plans.map((plan: PlansType, index: number) => (
                                        <div
                                            key={index}
                                            className="h-[420px] rounded-[16px] border border-[#E5E7EB] bg-[#F9FAFB] cursor-pointer transition-all duration-200 group hover:bg-primary shadow-subCardShadow flex flex-col justify-between p-6 relative"
                                        >
                                            <div className="w-full flex flex-col">
                                                <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-white border-[0.5px] border-[#E5E7EB] shadow-verifyMShadow text-primary">
                                                    {/* Replace with dynamic icon */}
                                                    {plan.icon}
                                                </span>
                                                <h4 className="font-poppins font-[500] text-base text-primary my-2 transition-all duration-200 group-hover:text-[#F9FAFB]">
                                                    {plan.name}
                                                </h4>
                                                <div className="flex items-end gap-1">
                                                    <h2 className="font-[700] font-sora text-3xl text-primary transition-all duration-200 group-hover:text-[#F9FAFB]">
                                                        {plan.monthlyPrice === 0 ? "Free" : `$${plan.monthlyPrice}`}
                                                    </h2>
                                                    <span className="uppercase text-[#58556A] font-[400] font-poppins text-sm transition-all duration-200 group-hover:text-[#F9FAFB]">
                                                        / month
                                                    </span>
                                                </div>
                                                {/* features */}
                                                <ul className="w-full mt-6 list-none flex flex-col gap-3 transition-all duration-200 group-hover:text-[#F9FAFB] text-[#58556A]">
                                                    {plan.features.map((feature, idx) => (
                                                        <li key={idx} className="w-full flex items-start gap-2 text-xs font-[400] font-poppins">
                                                            <div className="shrink-0">
                                                                <FaCheck className="w-3 h-3 mt-[1.5px]" />
                                                            </div>
                                                            <span className="flex-1">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleClick}
                                                className="w-full h-[40px] flex justify-center items-center bg-[#F3F4F6] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] rounded-[8px] text-sm font-[500] font-poppins text-primary transition-all duration-200 group-hover:text-white group-hover:bg-accent group-hover:shadow-joinWaitlistBtnShadow group-hover:border-none"
                                            >
                                                {plan.name === "Basic" ? "Start for free" : "Choose plan"}
                                            </button>


                                            {/* badge */}
                                            {index === 2 && (
                                                <Badge className="absolute top-4 right-4 bg-primary text-white border border-[#E5E7EB] group-hover:bg-[#F9FAFB] group-hover:text-primary rounded-[16px] px-[12px] py-[4px] text-[12px] font-[500] font-poppins">Recommended</Badge>
                                            )}
                                        </div>
                                    ))}
                            </section>
                        </TabsContent>
                        <TabsContent className="w-full lg:mt-16 md:mt-10 mt-8" value="yearly">
                            <section className="w-full grid lg:grid-cols-4 md:grid-cols-2 lg:gap-8 md:gap-12 gap-8">
                                {
                                    plans.map((plan: PlansType, index: number) => (
                                        <div
                                            key={index}
                                            className="h-[420px] rounded-[16px] border border-[#E5E7EB] bg-[#F9FAFB] cursor-pointer transition-all duration-200 group hover:bg-primary shadow-subCardShadow flex flex-col justify-between p-6 relative"
                                        >
                                            <div className="w-full flex flex-col">
                                                <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-white border-[0.5px] border-[#E5E7EB] shadow-verifyMShadow text-primary">
                                                    {/* Replace with dynamic icon */}
                                                    {plan.icon}
                                                </span>
                                                <h4 className="font-poppins font-[500] text-base text-primary my-2 transition-all duration-200 group-hover:text-[#F9FAFB]">
                                                    {plan.name}
                                                </h4>
                                                <div className="flex items-end gap-1">
                                                    <h2 className="font-[700] font-sora text-3xl text-primary transition-all duration-200 group-hover:text-[#F9FAFB]">
                                                        {plan.yearlyPrice === 0 ? "Free" : `$${plan.yearlyPrice}`}
                                                    </h2>
                                                    <span className="uppercase text-[#58556A] font-[400] font-poppins text-sm transition-all duration-200 group-hover:text-[#F9FAFB]">
                                                        / year
                                                    </span>
                                                </div>
                                                {/* features */}
                                                <ul className="w-full mt-6 list-none flex flex-col gap-3 transition-all duration-200 group-hover:text-[#F9FAFB] text-[#58556A]">
                                                    {plan.features.map((feature: string, idx: number) => (
                                                        <li key={idx} className="w-full flex items-start gap-2 text-xs font-[400] font-poppins">
                                                            <div className="shrink-0">
                                                                <FaCheck className="w-3 h-3 mt-[1.5px]" />
                                                            </div>
                                                            <span className="flex-1">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleClick}
                                                className="w-full h-[40px] flex justify-center items-center bg-[#F3F4F6] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] rounded-[8px] text-sm font-[500] font-poppins text-primary transition-all duration-200 group-hover:text-white group-hover:bg-accent group-hover:shadow-joinWaitlistBtnShadow group-hover:border-none"
                                            >
                                                {plan.name === "Basic" ? "Start for free" : "Choose plan"}
                                            </button>


                                            {/* badge */}
                                            {index === 2 && (
                                                <Badge className="absolute top-4 right-4 bg-primary text-white border border-[#E5E7EB] group-hover:bg-[#F9FAFB] group-hover:text-primary rounded-[16px] px-[12px] py-[4px] text-[12px] font-[500] font-poppins">Recommended</Badge>
                                            )}
                                        </div>
                                    ))}
                            </section>
                        </TabsContent>
                    </Tabs>
                </main>
            </section>
        </>
    )
}

export default Plans