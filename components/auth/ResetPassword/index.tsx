/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useRouter } from "next/navigation"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { RxCaretLeft } from "react-icons/rx";
import { TbLockPassword } from "react-icons/tb";
import ErrorDisplay from "@/components/shared/ErrorMsg";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { EmailInputValues } from "@/types/auth";

const ResetPasswordForm = () => {
    const router = useRouter()
    return (
        <div className="shadow-authCardShadow md:w-[380px] w-full rounded-[16px] bg-white border border-[#E5E7EB] flex flex-col gap-4 items-center py-8 px-6 relative">
            <div className="w-[56px] h-[56px] flex justify-center items-center bg-white border-[0.7px] border-[#E5E7EB] rounded-full shadow-verifyMShadow text-accent">
                <TbLockPassword className="w-5 h-5" />
            </div>

            <div className="w-full flex flex-col gap-3">
                <h4 className="font-poppins font-[600] text-base text-primary text-center">Reset Password</h4>
                <p className="font-poppins font-[400] text-[14px] leading-[24px] text-[#58556A] text-center px-3">No worries! Enter your email to reset your password and regain access. </p>
            </div>

            <FormInputs />

            {/* go back btn */}
            <button type="button" onClick={() => router.back()} className="absolute top-5 left-5 text-primary font-bold">
                <RxCaretLeft className="w-8 h-8" />
            </button>
        </div>
    )
}

export default ResetPasswordForm


const FormInputs = () => {
    const [isSending, setIsSending] = useState<boolean>(false);

    const router = useRouter();

    //initial form values
    const initialValues: EmailInputValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
    });

    // OnSubmit handler
    const onSubmit = async (
        values: EmailInputValues,
        { resetForm }: FormikHelpers<EmailInputValues>
    ) => {
        try {
            setIsSending(true);

            console.log("Email:", values.email);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

            // Reset the form after successful submission
            resetForm();
            router.push("/confirm-password-reset");
            console.log("Email sent!");
        } catch (error) {
            console.error("Failed to send", error);
        } finally {
            setIsSending(false);
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={true}
        >
            {(formik) => {
                const { dirty, isValid, errors } = formik;
                return (
                    <Form className="w-full flex flex-col gap-3 mt-6">
                        {/* email */}
                        <div className='w-full flex flex-col'>
                            <label htmlFor="email" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Email</label>
                            <Field type="email" name="email" id="email" placeholder='Adams@example.com' className={`w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent ${errors.email ? "border-red-500" : "border-[#E5E7EB]"}`} />
                            {/* error */}
                            <ErrorMessage name="email"
                                component={({ children }: any) => <ErrorDisplay message={children} />} />
                        </div>

                        {/* btn */}
                        <button type="submit" disabled={!(dirty && isValid)} className='w-full h-[40px] mt-3 flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[600] shadow-joinWaitlistBtnShadow text-shadow text-[14px] disabled:opacity-80 disabled:cursor-not-allowed'>
                            {
                                isSending ?
                                    (<span className="flex items-center text-[#FFFFFF] gap-1">
                                        <AiOutlineLoading3Quarters className="animate-spin text-[#FFFFFF]" />
                                        Resetting...
                                    </span>)
                                    : (<span>Reset password</span>)
                            }
                        </button>

                    </Form>
                )
            }}
        </Formik>
    )
}