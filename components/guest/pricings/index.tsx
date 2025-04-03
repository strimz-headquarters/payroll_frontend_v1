import React from 'react'
import { Element } from 'react-scroll'
import AllPlans from './allPlans'

/**
 * Pricings component renders a section that displays Strimz's pricing plans.
 *
 * It is an Element with the name "pricing" and contains a heading and a paragraph
 * describing the benefits of using Strimz, and an AllPlans component that renders
 * the different pricing plans.
 *
 * The component is designed to be fully responsive and centered, with padding
 * adjustments for large screens.
 */
const Pricings = () => {
    return (
        <Element name='pricing'>
            <section className="w-full bg-white md:py-20 lg:px-0 py-16 px-6">
                <main className='w-full max-w-[1200px] mx-auto flex flex-col items-center'>
                    <div className="w-full max-w-[401px]">
                        <h3 className="text-primary font-[700] md:text-[40px] text-[32px] md:leading-[48px] leading-[40px] font-sora text-center">
                            Pricing
                        </h3>
                        <p className='font-poppins text-[#58556A] font-[400] text-base leading-[28px] text-center'>Avoid banking delays and cross-border fees. Strimz lets you pay teams worldwide instantly in crypto. </p>
                    </div>

                    <AllPlans />
                </main>
            </section>
        </Element>
    )
}

export default Pricings