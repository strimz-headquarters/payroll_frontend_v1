import React from 'react'
import globalPay from "@/public/images/globalPayment.png"
import Image from 'next/image'

/**
 * PayAnyone component renders a section that explains how Strimz allows businesses to make
 * instant global payments to their teams in crypto. It consists of a text area with a heading
 * and a paragraph, and an image area with an illustration.
 *
 * @returns A JSX element representing the PayAnyone section.
 */
const PayAnyone = () => {
    return (
        <div className="w-full bg-[#F9FAFB] border-[1px] border-[#E5E7EB] rounded-[16px] grid md:grid-cols-2 gap-4 md:gap-0 lg:px-20 lg:py-20 px-6 py-8">
            {/* text */}
            <div className="w-full max-w-[365px] order-2 md:order-1 font-[700] flex flex-col justify-center">
                <h3 className="md:text-[32px] text-[24px] leading-[40px] font-sora text-primary mb-3">Pay anyone, anywhere</h3>
                <p className='font-[400] text-base leading-[28px] text-[#58556A] font-poppins'>Avoid banking delays and cross-border fees. Strimz lets you pay teams worldwide instantly in crypto. Employees receive their payments the same day, without delays.</p>
            </div>
            {/* image */}
            <Image src={globalPay} alt='image' className='max-w-[513.68px] w-full order-1 md:order-2' width={2155} height={1571} quality={100} priority />
        </div>
    )
}

export default PayAnyone