/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import ErrorDisplay from "@/components/shared/ErrorMsg";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { TbLockPassword } from 'react-icons/tb'
import { useRouter } from "next/navigation";
import { PasswordInputValues } from "@/types/auth";

const SetNewPasswordForm = () => {
    return (
        <div className="shadow-authCardShadow md:w-[380px] w-full rounded-[16px] bg-white border border-[#E5E7EB] flex flex-col gap-4 items-center py-8 px-6 relative">
            <div className="w-[56px] h-[56px] flex justify-center items-center bg-white border-[0.7px] border-[#E5E7EB] rounded-full shadow-verifyMShadow text-accent">
                <TbLockPassword className="w-5 h-5" />
            </div>

            <div className="w-full flex flex-col gap-3">
                <h4 className="font-poppins font-[600] text-base text-primary text-center">Create a New Password</h4>
                <p className="font-poppins font-[400] text-[14px] leading-[24px] text-[#58556A] text-center px-3">Set a strong password to secure your account. </p>
            </div>

            <FormInputs />
        </div>
    )
}

export default SetNewPasswordForm


const FormInputs = () => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    //initial form values
    const initialValues: PasswordInputValues = {
        password: ""
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/\d/, "Password must contain at least one number"),
    });

    // OnSubmit handler
    const onSubmit = async (
        values: PasswordInputValues,
        { resetForm }: FormikHelpers<PasswordInputValues>
    ) => {
        try {
            setIsSending(true);

            console.log("Password", values.password);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

            // Reset the form after successful submission
            resetForm();
            router.push("/login");
            console.log("created successfully!");
        } catch (error) {
            console.error("Failed to create:", error);
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
                    <Form className="w-full flex flex-col gap-3 mt-4">

                        {/* Password */}
                        <div className="w-full flex flex-col">
                            <label
                                htmlFor="password"
                                className="font-poppins text-[14px] text-[#58556A] leading-[24px]"
                            >
                                Password
                            </label>
                            <div className="relative w-full h-[44px]">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className={`w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-full font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] pl-4 pr-14 outline-none transition duration-300 focus:border-accent ${errors.password ? "border-red-500" : "border-[#E5E7EB]"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#58556A]"
                                >
                                    {showPassword ? (
                                        <FaRegEyeSlash className="w-5 h-5" />
                                    ) : (
                                        <FaRegEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <ErrorMessage
                                name="password"
                                component={({ children }: any) => <ErrorDisplay message={children} />}
                            />
                        </div>

                        {/* btn */}
                        <button type="submit" disabled={!(dirty && isValid)} className='w-full h-[40px] mt-3 flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[600] shadow-joinWaitlistBtnShadow text-shadow text-[14px] disabled:opacity-80 disabled:cursor-not-allowed'>
                            {
                                isSending ?
                                    (<span className="flex items-center text-[#FFFFFF] gap-1">
                                        <AiOutlineLoading3Quarters className="animate-spin text-[#FFFFFF]" />
                                        Creating...
                                    </span>)
                                    : (<span>Create password</span>)
                            }
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}