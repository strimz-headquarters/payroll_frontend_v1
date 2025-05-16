/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Lock, Trash2, TriangleAlert } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaCheck, FaCopy, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { userManager } from '@/config/ManageUser'
import { useAppKitAccount } from "@reown/appkit/react";
import axiosInstanceWithToken from '@/config/AxiosInstance'

// Validation schemas
const NameSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Too short!')
        .max(50, 'Too long!')
        .required('Name is required'),
})

const EmailSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
})

const PasswordSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number"),
})

const ProfileChange = () => {
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const currentUser = userManager.getUser();
        if (currentUser) {
            setName(currentUser.username || 'John Doe');
            setEmail(currentUser.email || 'johndoe@gmail.com');
        }
    }, []);

    const { isConnected, address } = useAppKitAccount();

    const [showPassword, setShowPassword] = useState(false)

    // For exporting private key
    const [pkey, setPkey] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [showPassword2, setShowPassword2] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Clear timeout on component unmount
    useEffect(() => {
        const timeout = timeoutRef.current;
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, []);

    const handleNameUpdate = (values: { name: string }) => {
        setName(values.name)
        setIsEditingName(false)
        console.log("Updated Name:", values.name)
    }

    const handleEmailUpdate = (values: { email: string }) => {
        setEmail(values.email)
        setIsEditingEmail(false)
        console.log("Updated Email:", values.email)
    }

    const handlePasswordUpdate = (values: { password: string }) => {
        setIsEditingPassword(false)
        console.log("Updated Password:", values.password)
    }

    return (
        <section className="w-full">
            {/* Name */}
            <main className='w-full flex flex-col gap-6 border-b-[1px] border-[#E5E7EB] py-8'>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex flex-col gap-0.5">
                            <h4 className="font-poppins font-[500] text-[14px] text-primary">Name</h4>
                            {!isEditingName ? (
                                <p className='font-poppins text-[14px] text-[#58556A]'>{name}</p>
                            ) : (
                                <Formik
                                    initialValues={{ name }}
                                    validationSchema={NameSchema}
                                    onSubmit={handleNameUpdate}
                                >
                                    {({ handleSubmit }) => (
                                        <Form onSubmit={handleSubmit} className='w-full flex flex-col gap-1'>
                                            <Field
                                                name="name"
                                                className="w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                                            />
                                            <ErrorMessage name="name" component="p" className="text-xs text-rose-600" />
                                            <div className='flex gap-2 mt-1'>
                                                <Button variant="outline" size="sm" type="button" onClick={() => setIsEditingName(false)}>Cancel</Button>
                                                <Button size="sm" className='bg-accent text-white hover:bg-accent' type="submit">Save</Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                        {!isEditingName && (
                            <button onClick={() => setIsEditingName(true)} className="font-poppins text-[14px] text-primary cursor-pointer">
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex flex-col gap-0.5">
                            <h4 className="font-poppins font-[500] text-[14px] text-primary">Email</h4>
                            {!isEditingEmail ? (
                                <p className='font-poppins text-[14px] text-[#58556A]'>{email}</p>
                            ) : (
                                <Formik
                                    initialValues={{ email }}
                                    validationSchema={EmailSchema}
                                    onSubmit={handleEmailUpdate}
                                >
                                    {({ handleSubmit }) => (
                                        <Form onSubmit={handleSubmit} className='w-full flex flex-col gap-1'>
                                            <Field
                                                name="email"
                                                className="w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                                            />
                                            <ErrorMessage name="email" component="p" className="text-xs text-rose-600" />
                                            <div className='flex gap-2 mt-1'>
                                                <Button variant="outline" size="sm" type="button" onClick={() => setIsEditingEmail(false)}>Cancel</Button>
                                                <Button size="sm" className='bg-accent text-white hover:bg-accent' type="submit">Save</Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                        {!isEditingEmail && (
                            <button onClick={() => setIsEditingEmail(true)} className="font-poppins text-[14px] text-primary cursor-pointer">
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Wallet - static */}
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                        <h4 className="font-poppins font-[500] text-[14px] text-primary">Wallet</h4>
                        <p className='font-poppins text-[14px] text-[#58556A]'>
                            {isConnected ? (
                                <span className='text-primary'>{address}</span>
                            ) : (
                                <span className='text-[#58556A]'>Wallet not connected</span>
                            )}
                        </p>
                    </div>
                </div>
            </main>

            {/* Security */}
            <main className='w-full flex flex-col gap-6 border-b-[1px] border-[#E5E7EB] py-8'>
                <div className='flex items-center gap-3'>
                    <div className='bg-white w-[40px] h-[40px] rounded-full border shadow-subIconShadow flex justify-center items-center'>
                        <Lock className='w-[18px] h-[18px] text-primary' />
                    </div>
                    <h2 className="font-sora font-[600] text-primary text-[24px]">Security</h2>
                </div>

                {/* Password */}
                <div className="w-full flex flex-col gap-2 relative">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex flex-col gap-0.5 relative">
                            <h4 className="font-poppins font-[500] text-[14px] text-primary">Password</h4>
                            {!isEditingPassword ? (
                                <p className='font-poppins text-[14px] text-[#58556A]'>*************</p>
                            ) : (
                                <Formik
                                    initialValues={{ password: '' }}
                                    validationSchema={PasswordSchema}
                                    onSubmit={handlePasswordUpdate}
                                >
                                    {({ handleSubmit }) => (
                                        <Form onSubmit={handleSubmit} className='w-full flex flex-col gap-1 relative'>
                                            <div className="relative">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Enter new password"
                                                    className="w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
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
                                            <ErrorMessage name="password" component="p" className="text-xs text-rose-600" />
                                            <div className='flex gap-2 mt-1'>
                                                <Button variant="outline" size="sm" type="button" onClick={() => setIsEditingPassword(false)}>Cancel</Button>
                                                <Button size="sm" className='bg-accent text-white hover:bg-accent' type="submit">Save</Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                        {!isEditingPassword && (
                            <button onClick={() => setIsEditingPassword(true)} className="font-poppins text-[14px] text-primary cursor-pointer">
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Export Private Key */}
                <div className="w-full flex flex-col gap-2 relative">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex flex-col gap-0.5 relative">
                            <h4 className="font-poppins font-[500] text-[14px] text-primary">
                                Export Private Key
                            </h4>

                            <Formik
                                initialValues={{ password: '' }}
                                validationSchema={PasswordSchema}
                                onSubmit={async (values, { resetForm }) => {

                                    const req = JSON.stringify({
                                        password: values.password
                                    })

                                    try {
                                        const response = await axiosInstanceWithToken.post('users/export-wallet', req);

                                        if (response.data.success) {
                                            setPkey(response.data.data.privateKey);
                                            resetForm();
                                            // Auto-clear after 30 seconds
                                            setTimeout(() => setPkey(''), 30000);
                                        }
                                    } catch (error: any) {
                                        console.log(error);
                                        setError(error.response?.data?.message || 'Invalid password or server error');
                                    }
                                }}
                            >
                                {({ isSubmitting, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit} className='w-full flex flex-col gap-1 relative'>
                                        <div className="relative">
                                            <Field
                                                type={showPassword2 ? "text" : "password"}
                                                name="password"
                                                placeholder="Enter your password"
                                                className="w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword2((prev) => !prev)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#58556A]"
                                            >
                                                {showPassword2 ? (
                                                    <FaRegEyeSlash className="w-5 h-5" />
                                                ) : (
                                                    <FaRegEye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage name="password" component="p" className="text-xs text-rose-600" />

                                        {pkey && (
                                            <div className="mt-2 p-3 bg-red-50 rounded-md relative">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-sora text-sm">
                                                        {`${pkey.slice(0, 6)}...${pkey.slice(-5)}`}
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        size={"icon"}
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(pkey);
                                                            setCopied(true);
                                                            setTimeout(() => setCopied(false), 2000);
                                                        }}
                                                        className="bg-accent text-white hover:bg-accent"
                                                    >
                                                        {copied ? (
                                                            <FaCheck className="w-4 h-4" />
                                                        ) : (
                                                            <FaCopy className="w-4 h-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                                <div className="text-xs text-red-600 mt-1">
                                                    Warning: This will be cleared in 30 seconds. Store it securely!
                                                </div>
                                            </div>
                                        )}

                                        {error && (
                                            <div className="text-red-500 text-sm mt-1">{error}</div>
                                        )}

                                        <div className='flex gap-2 mt-1'>
                                            <Button
                                                size="sm"
                                                className='bg-accent text-white hover:bg-accent'
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Processing...' : 'Get Key'}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </main>

            {/* Danger Zone */}
            <main className='w-full flex flex-col items-start gap-6 py-8'>
                <div className='flex items-center gap-3'>
                    <div className='bg-white w-[40px] h-[40px] rounded-full border shadow-subIconShadow flex justify-center items-center'>
                        <TriangleAlert className='w-[18px] h-[18px] text-primary' />
                    </div>
                    <h2 className="font-sora font-[600] text-primary text-[24px]">Danger Zone</h2>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className='border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white'>
                            <Trash2 className="mr-2" /> Delete account
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-rose-600 text-white">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
        </section>
    )
}

export default ProfileChange
