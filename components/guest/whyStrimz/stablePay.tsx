import Image from 'next/image'
import React from 'react'
import stablePay from "@/public/images/stablePayment.png"

/**
 * StablePayment component renders a section that highlights the benefits of
 * using stablecoins for payments, providing price stability and protecting
 * earnings from market volatility.
 *
 * The component consists of an image area with an illustration and a text area
 * with a heading and a paragraph.
 *
 * @returns A JSX element representing the StablePayment section.
 */
const StablePayment = () => {
    return (
        <div className="w-full bg-[#F9FAFB] border-[1px] border-[#E5E7EB] rounded-[16px] grid md:grid-cols-2 gap-4 md:gap-0 lg:px-20 lg:py-0 px-6 py-8">
            {/* image */}
            <Image src={stablePay} alt='image' className='max-w-[515px] w-full' width={2060} height={2148} quality={100} priority />

            {/* text */}
            <div className="w-full font-[700] flex flex-col justify-center lg:pl-24">
                <h3 className="md:text-[32px] text-[24px] leading-[40px] font-sora text-primary mb-3">Stablecoin payments for price stability</h3>
                <p className='font-[400] text-base leading-[28px] text-[#58556A] font-poppins'>Ensure predictable salaries by paying in stablecoins. Protect earnings from market volatility. This makes crypto payroll more reliable for both businesses and employees.</p>
            </div>

        </div>
    )
}

export default StablePayment