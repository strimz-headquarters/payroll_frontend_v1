'use client'
import React from 'react'
import { FaCheck } from "react-icons/fa6";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { PlansType } from '@/types/guestpage';
import { plans } from '@/utils/pricingPlans';
import { Badge } from '@/components/ui/badge';

/**
 * AllPlans
 *
 * A component that renders all the pricing plans.
 *
 * @returns {React.ReactElement} A react element that renders all the pricing plans.
 */
const AllPlans = () => {
    return (
        <main className="w-full flex flex-col items-center mt-8">
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
    )
}

export default AllPlans