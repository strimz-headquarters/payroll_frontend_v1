'use client'
import React from 'react'
import { Element } from 'react-scroll'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { allfaqs } from '@/utils/allFaqs';
import { FaqsTypes } from '@/types/guestpage';

const Faqs = () => {
    return (
        <Element name='faqs'>
            <section className="w-full bg-white md:py-20 lg:px-0 py-6 px-6">
                <main className='w-full max-w-[996px] mx-auto flex flex-col items-center'>
                    <div className="w-full max-w-[572px]">
                        <h3 className="text-primary font-[700] md:text-[40px] text-[32px] md:leading-[48px] leading-[40px] font-sora text-center">
                            Frequently asked questions
                        </h3>
                        <p className='font-poppins text-[#58556A] font-[400] text-base leading-[28px] text-center'>Don&apos;t see your question? Reach out, and we&apos;ll be happy to help you get the information you need. </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-2 mt-8" defaultValue="1">
                        {allfaqs.map((item: FaqsTypes, i: number) => (
                            <AccordionItem value={String(i + 1)} key={i} className='border-[1px] border-[#E5E7EB] rounded-[8px] px-8 bg-[#F3F4F6]'>
                                <AccordionTrigger className="text-primary font-poppins font-medium text-[18px] leading-[28px]">{item.question}</AccordionTrigger>
                                <AccordionContent className="pb-4 text-[#58556A] font-poppins text-base leading-[28px] font-[400]">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                </main>
            </section>
        </Element>
    )
}

export default Faqs