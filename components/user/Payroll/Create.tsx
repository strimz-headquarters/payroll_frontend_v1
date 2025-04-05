'use client'
import { useRouter } from "next/navigation"
import { useState } from "react";
import { RxCaretLeft } from "react-icons/rx";
import StepOneForm from "./StepOne";
import StepTwoForm from "./StepTwo";
import { toast } from "sonner";

/**
 * Create component renders a page for creating a new payroll.
 *
 * The component renders a header with a back button and a title.
 * It also renders a form for creating a new payroll, split into two steps.
 * The first step asks for payroll name, token, frequency, start date, and payment time.
 * The second step renders a table with the payroll details.
 *
 * The component uses the `useState` hook to store the step number and the payroll data.
 * The `isStepOneValid` function checks if the step one data is valid.
 * The `handleNext` function sets the step number to 2 if the step one data is valid.
 * The `handleBack` function sets the step number to 1.
 */
const Create = () => {
    const [step, setStep] = useState<1 | 2>(1);
    const router = useRouter()

    const [stepOneData, setStepOneData] = useState({
        payrollName: '',
        token: '',
        frequency: '',
        startDate: null as Date | null,
        paymentTime: '',
    });

    // Validation for Step 1 inputs
    const isStepOneValid = () => {
        return (
            stepOneData.payrollName.trim() &&
            stepOneData.token &&
            stepOneData.frequency &&
            stepOneData.startDate &&
            stepOneData.paymentTime.trim()
        );
    };

    const handleNext = () => {
        if (isStepOneValid()) {
            setStep(2);
        } else {
            toast.error('Please fill in all required fields');
        }
    };

    const handleBack = () => setStep(1);

    return (
        <section className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col">
                <button type="button" className="flex focus:outline-none focus:border-none items-center gap-1 text-primary" onClick={() => router.back()}>
                    <RxCaretLeft className="w-5 h-5" />
                    Back
                </button>
                <h3 className="font-[600] font-sora text-base">Create a payroll</h3>
                <p className="text-[#58556A] text-xs font-[400] font-poppins">Define your payroll schedule and details </p>
            </div>

            {step === 1 && <StepOneForm data={stepOneData} setData={setStepOneData} handleClick={handleNext} />}

            {step === 2 && <StepTwoForm data={stepOneData} handleClick={handleBack} />}
        </section>
    )
}

export default Create