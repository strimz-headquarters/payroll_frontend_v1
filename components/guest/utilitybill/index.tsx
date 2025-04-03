import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import utilityPay from "@/public/images/utility.png"

/**
 * Utility component renders a section that explains how Strimz can be used to pay
 * for utility bills, streaming services, and mobile data without manual transactions.
 *
 * The component consists of a heading, a paragraph, a link, and an image area with
 * an illustration.
 *
 * The component is designed to be fully responsive and centered, with padding
 * adjustments for large screens.
 */
const Utility = () => {
    return (
        <section className="w-full bg-[#F3F4F6] md:py-20 lg:px-0 py-16 px-6">
            <main className='w-full max-w-[1096px] mx-auto grid md:grid-cols-7 gap-8 md:gap-0'>
                <div className='w-full md:col-span-3 max-w-[368px] flex flex-col justify-center items-start gap-4'>
                    <h3 className="text-primary font-[700] md:text-[40px] text-[32px] md:leading-[48px] leading-[40px] font-sora">Pay your utility bills with strimz</h3>
                    <p className='font-poppins text-[#58556A] font-[400] text-base leading-[28px]'>Pay for streaming services, utility bills, and mobile data without manual transactions.</p>
                    <Link href="/" target='_blank' className='md:w-[201px] w-[230px] h-[48px] flex justify-center items-center bg-accent rounded-[8px] shadow-ctaShadow text-white md:text-[14px] text-base font-poppins font-[600] leading-[24px]'>Explore utility payments</Link>
                </div>

                <Image src={utilityPay} alt='illustration' className='w-full md:col-span-4' width={2492} height={1943} quality={100} priority />
            </main>
        </section>
    )
}

export default Utility