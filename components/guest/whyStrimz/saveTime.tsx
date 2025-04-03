import Image from 'next/image'
import React from 'react'
import saveTime from "@/public/images/savetime.png"
import flexiblePay from "@/public/images/flexibePayroll.png"

/**
 * SaveTime component renders a section that highlights the benefits of using Strimz
 * for streamlined and efficient payroll management.
 *
 * The component consists of two sub-sections:
 * 1. "Save time and reduce workload" - Emphasizes the advantage of automating payroll
 *    processes with Strimz, eliminating manual payments and batch transactions.
 * 2. "Flexible Payroll for Any Team" - Describes the flexibility offered by Strimz to
 *    manage payroll for various types of workers,
 **/
const SaveTime = () => {
    return (
        <div className="w-full grid md:grid-cols-2 gap-10">
            <div className='w-full bg-[#F9FAFB] border-[1px] border-[#E5E7EB] rounded-[16px] flex flex-col md:gap-8 gap-6 md:p-8 p-6'>
                <h3 className="font-[600] font-sora text-[24px] leading-[32px] text-primary">Save time and reduce workload</h3>
                <Image src={saveTime} alt='illustration' className="w-full" width={2016} height={1040} quality={100} priority />
                <p className='font-poppins text-[#58556A] font-[400] text-base leading-[28px]'>No more manual payments or batch transactions. Upload your payroll file, set a schedule, and let Strimz handle the rest. </p>
            </div>

            <div className='w-full bg-[#F9FAFB] border-[1px] border-[#E5E7EB] rounded-[16px] flex flex-col md:gap-8 gap-6 md:p-8 p-6'>
                <h3 className="font-[600] font-sora text-[24px] text-primary leading-[32px]">Flexible Payroll for Any Team</h3>
                <Image src={flexiblePay} alt='illustration' className="w-full" width={2016} height={1040} quality={100} priority />
                <p className='font-poppins text-[#58556A] font-[400] text-base leading-[28px]'>Manage payroll for full-time employees, contractors, and freelancers. Customize payouts based on agreements and schedules. </p>
            </div>
        </div>
    )
}

export default SaveTime