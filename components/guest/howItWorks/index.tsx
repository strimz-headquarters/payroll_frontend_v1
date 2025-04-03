import Image from 'next/image'
import React from 'react'
import Num1 from "@/public/icons/Number1.svg"
import Num2 from "@/public/icons/Number2.svg"
import Num3 from "@/public/icons/Number3.svg"
import create from "@/public/icons/create.svg"
import add from "@/public/icons/add.svg"
import stream from "@/public/icons/stream.svg"
import { Element } from 'react-scroll'



/**
 * HowItWorks component renders a section that visually describes the three-step process
 * for setting up and managing payroll with Strimz. 
 *
 * The section includes:
 * - A main heading and a subheading that introduce the concept.
 * - Three grid columns, each representing a step with an icon, title, and description:
 *   1. Setup Your Payroll: Name the payroll, choose a token, and set payment frequency.
 *   2. Add Your Team: Upload employee details for automatic payment setups.
 *   3. Stream Payments Automatically: Automate scheduled payments and monitor transactions.
 *
 * The component is styled to be fully responsive, ensuring a seamless viewing experience across devices.
 */

const HowItWorks = () => {
    return (
        <Element name='howitworks'>
            <section className="w-full bg-[#F3F4F6] md:py-20 lg:px-0 py-6 px-6">
                <main className='w-full max-w-[1200px] mx-auto flex flex-col items-center'>
                    <h3 className="text-primary font-[700] md:text-[40px] text-[32px] md:leading-[48px] leading-[40px] font-sora text-center">
                        How it works
                    </h3>
                    <p className='font-poppins text-[#58556A] font-[400] text-base leading-[28px] text-center'>Get up and running with three steps</p>

                    <div className='w-full grid md:grid-cols-3 gap-8 mt-10'>

                        <div className="w-full flex flex-col items-start gap-3 bg-white border-[1px] border-[#E5E7EB] rounded-[16px] p-8">
                            <Image src={Num1} alt='number' className="w-[22.03px]" width={25} height={69} quality={100} priority />
                            <Image src={create} alt='create payroll' className="w-[72px]" width={72} height={73} quality={100} priority />

                            <div>
                                <h4 className='text-primary font-sora font-[600] text-[18px] leading-[30px]'>Setup Your Payroll</h4>
                                <p className="text-[#58556A] font-poppins font-[400] text-base leading-[28px]">Give your payroll a name, pick a token, and choose how often payments should be made—daily, weekly, or monthly.</p>
                            </div>
                        </div>


                        <div className="w-full flex flex-col items-start gap-3 bg-white border-[1px] border-[#E5E7EB] rounded-[16px] p-8">
                            <Image src={Num2} alt='number' className="w-[38.23px]" width={41} height={71} quality={100} priority />
                            <Image src={add} alt='add users to payroll' className="w-[72px]" width={73} height={73} quality={100} priority />

                            <div>
                                <h4 className='text-primary font-sora font-[600] text-[18px] leading-[30px]'>Add Your Team</h4>
                                <p className="text-[#58556A] font-poppins font-[400] text-base leading-[28px]">Upload a list of employees, including wallet addresses and payment amounts. No manual transfers, just smooth automation.</p>
                            </div>
                        </div>


                        <div className="w-full flex flex-col items-start gap-3 bg-white border-[1px] border-[#E5E7EB] rounded-[16px] p-8">
                            <Image src={Num3} alt='number' className="w-[39.74px]" width={43} height={71} quality={100} priority />
                            <Image src={stream} alt='stream payroll' className="w-[72px]" width={73} height={73} quality={100} priority />

                            <div>
                                <h4 className='text-primary font-sora font-[600] text-[18px] leading-[30px]'>Stream Payments Automatically</h4>
                                <p className="text-[#58556A] font-poppins font-[400] text-base leading-[28px]">Payments stream on schedule while you focus on growth. Check your dashboard anytime to see your transactions.</p>
                            </div>
                        </div>

                    </div>
                </main>
            </section>
        </Element>
    )
}

export default HowItWorks