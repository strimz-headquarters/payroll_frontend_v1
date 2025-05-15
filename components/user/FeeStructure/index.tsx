'use client'
import { useRouter } from "next/navigation"
import { RxCaretLeft } from "react-icons/rx"

/**
 * FeeStructure component renders a section that explains Strimz's transaction fee structure.
 *
 * The section includes:
 * - A heading and a subheading inviting users to learn more about the fee structure.
 * - A card presenting the fee formula and example calculations.
 * - A section displaying the transaction history (Invoices component).
 *
 * The component is fully responsive, ensuring accessibility on various devices.
 */
const FeeStructure = () => {
    const router = useRouter()

    // Example fee calculations
    const feeExamples = [
        { addresses: 1, fee: 0.45 },
        { addresses: 5, fee: 0.64 },
        { addresses: 20, fee: 0.97 },
        { addresses: 100, fee: 1.80 }
    ]

    return (
        <section className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col">
                <button type="button" className="flex items-center gap-1 text-primary" onClick={() => router.back()}>
                    <RxCaretLeft className="w-5 h-5" />
                    Back
                </button>
                <h3 className="font-[600] font-sora text-base">Transaction Fee Structure</h3>
                <p className="text-[#58556A] text-xs font-[400] font-poppins">Understand how our fees are calculated</p>
            </div>

            <main className="w-full bg-[#F9FAFB] rounded-[16px] p-4 flex flex-col gap-6">
                {/* Fee Calculation Card */}
                <div className="w-full p-5 rounded-[12px] bg-white shadow-[0px_1px_2px_0px_#00000014]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Formula Section */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-sora font-[600] text-lg">Fee Formula</h4>
                            <div className="space-y-2">
                                <p className="font-poppins text-sm">
                                    <span className="font-[500]">Base Fee:</span> $0.30 (network costs)
                                </p>
                                <p className="font-poppins text-sm">
                                    <span className="font-[500]">Variable Fee:</span> $0.15 × √N
                                </p>
                                <div className="mt-2 p-3 bg-[#F9FAFB] rounded-md">
                                    <code className="text-sm">
                                        Total Fee = 0.30 + (0.15 × √N)
                                    </code>
                                </div>
                            </div>
                        </div>

                        {/* Examples Section */}
                        <div className="flex flex-col gap-4">
                            <h4 className="font-sora font-[600] text-lg">Example Calculations</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {feeExamples.map((example, index) => (
                                    <div key={index} className="p-3 bg-[#F9FAFB] rounded-md">
                                        <p className="text-xs font-poppins text-[#58556A]">
                                            {example.addresses} address{example.addresses !== 1 ? 'es' : ''}
                                        </p>
                                        <p className="font-sora font-[600] text-primary">
                                            ${example.fee.toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                        <p className="text-sm font-poppins text-[#58556A]">
                            Fees scale sub-linearly - doubling addresses increases fees by ~40%
                        </p>
                    </div>
                </div>
            </main>

        </section>
    )
}

export default FeeStructure