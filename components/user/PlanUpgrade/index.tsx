'use client'
import { useRouter } from "next/navigation"
import { RxCaretLeft } from "react-icons/rx"
import Upgrade from "./Upgrade"
import Cancel from "./Cancel"
import Invoices from "./Invoices"


/**
 * PlanUpgrade component renders a section that allows users to manage their 
 * account plans and billing preferences. It includes navigation to go back 
 * to the previous page, displays current plan details, billing cycle, and 
 * the next payment date. Users can upgrade or cancel their plans and view 
 * invoices. The component is designed to be responsive and includes 
 * sections for current plan details, billing cycle, next payment, upgrade 
 * and cancel options, and invoice history.
 */

const PlanUpgrade = () => {
    const router = useRouter()
    return (
        <section className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col">
                <button type="button" className="flex focus:outline-none focus:border-none items-center gap-1 text-primary" onClick={() => router.back()}>
                    <RxCaretLeft className="w-5 h-5" />
                    Back
                </button>
                <h3 className="font-[600] font-sora text-base">Plans and billing</h3>
                <p className="text-[#58556A] text-xs font-[400] font-poppins">Manage your account and preferences </p>
            </div>

            <main className="w-full bg-[#F9FAFB] rounded-[16px] lg:h-[219px] p-4 flex flex-col gap-1.5">
                {/* plan stats */}
                <div className="w-full lg:h-[187px] h-auto p-5 flex flex-col lg:justify-center rounded-[12px] bg-white shadow-[0px_1px_2px_0px_#00000014]">
                    <div className='w-full lg:h-[155px] grid lg:grid-cols-3 grid-cols-2 gap-4 lg:gap-0'>
                        {/* Current plan */}
                        <div className="flex flex-col gap-3 ">
                            <span className="flex items-center gap-2 uppercase font-[400] font-poppins text-[#58556A] text-xs">
                                current plan
                            </span>
                            <h3 className="text-black font-[600] font-sora text-xl text-wrap">Bronze($10)</h3>
                        </div>

                        {/* Billing cycle */}
                        <div className="flex flex-col gap-3 md:border-l border-[#E5E7EB] md:pl-4">
                            <span className="flex items-center gap-2 uppercase font-[400] font-poppins text-[#58556A] text-xs">
                                billing cycle
                            </span>
                            <h3 className="text-black font-[600] font-sora text-xl text-wrap">Monthly</h3>
                        </div>

                        {/* next pay */}
                        <div className="flex flex-col gap-3 lg:border-l border-[#E5E7EB] lg:pl-4 col-span-2 lg:col-span-1">
                            <span className="flex items-center gap-2 uppercase font-[400] font-poppins text-[#58556A] text-xs">
                                next payment
                            </span>
                            <h3 className="text-black font-[600] font-sora text-xl text-wrap">10 Sep, 2025</h3>
                        </div>
                    </div>
                    {/* upgrade & cancel */}
                    <div className="flex gap-4 mt-4 lg:mt-0 pt-4 border-t border-[#E5E7EB]">
                        <Upgrade />
                        <Cancel />
                    </div>
                </div>
            </main>

            <div className="w-full flex flex-col gap-3">
                <h5 className="text-sm text-strimzPrimary font-poppins font-[500]">Invoice</h5>
                {/* no data */}
                {/* <div className="w-full h-[245px] bg-[#F9FAFB] rounded-[12px] flex justify-center items-center">
                    <div className="w-full flex flex-col justify-center gap-1 items-center">
                        <h4 className="text-strimzPrimary font-[500] font-poppins text-sm">Not transactions yet</h4>
                        <p className="text-[#58556A] md:w-[50%] w-[80%] text-center text-xs font-[400] font-poppins">Your transaction history will appear here once you start streaming payments.</p>
                    </div>
                </div> */}
                <Invoices />
            </div>
        </section>
    )
}

export default PlanUpgrade