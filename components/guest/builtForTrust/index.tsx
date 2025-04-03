import { CircleCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import security from "@/public/images/security.png"
import PaddedLines from '../herosection/paddedLines'

/**
 * Renders a section that highlights the benefits of using Strimz.
 * 
 * It consists of a heading and an unordered list with three items,
 * each with a checkmark and a description of a benefit:
 * - On-Chain Transactions, for full transparency.
 * - Non-Custodial, for control over funds.
 * - Reliable Smart Contracts, for no manual intervention, no delays, no errors.
 * 
 * The section is fully responsive and centered, with padding adjustments for large screens.
 * 
 * @returns A JSX element representing the BuiltForTrust section.
 */
const BuiltForTrust = () => {
    return (
        <>
            <section className="w-full bg-primary md:py-20 lg:px-0 py-6 px-6">
                <main className='w-full max-w-[1096px] mx-auto grid md:grid-cols-2 gap-8 md:gap-0'>
                    <div className='w-full max-w-[368px] flex flex-col justify-center items-start gap-4'>
                        <h3 className="text-white font-[700] md:text-[40px] text-[32px] md:leading-[48px] leading-[40px] font-sora">Built for trust and reliability</h3>
                        <ul className="space-y-4">
                            <li className="font-poppins text-white font-[400] text-base leading-[28px] flex items-start gap-2">
                                <div className="shrink-0">
                                    <CircleCheck className="w-5 h-5 mt-1" />
                                </div>
                                <span>On-Chain Transactions → Every payment is recorded on the blockchain for full transparency.</span>
                            </li>
                            <li className="font-poppins text-white font-[400] text-base leading-[28px] flex items-start gap-2">
                                <div className="shrink-0">
                                    <CircleCheck className="w-5 h-5 mt-1" />
                                </div>
                                <span>Non-Custodial → Funds stay in your control until payments are streamed.</span>
                            </li>
                            <li className="font-poppins text-white font-[400] text-base leading-[28px] flex items-start gap-2">
                                <div className="shrink-0">
                                    <CircleCheck className="w-5 h-5 mt-1" />
                                </div>
                                <span>Reliable Smart Contracts → No manual intervention, no delays, no errors.</span>
                            </li>
                        </ul>
                    </div>

                    <Image src={security} alt='illustration' className='w-full' width={2091} height={2092} quality={100} priority />
                </main>
            </section>
            <PaddedLines />
        </>
    )
}

export default BuiltForTrust