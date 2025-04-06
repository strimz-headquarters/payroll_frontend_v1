'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { RxCaretLeft } from 'react-icons/rx'
import User from './User'
import ProfileChange from './ProfileChange'

const AccountSettings = () => {
    const router = useRouter()
    return (
        <section className="w-full max-w-[516px] mx-auto flex flex-col gap-10">
            <div className="w-full flex flex-col">
                <button type="button" className="flex focus:outline-none focus:border-none items-center gap-1 text-primary" onClick={() => router.back()}>
                    <RxCaretLeft className="w-5 h-5" />
                    Back
                </button>
                <h3 className="font-[600] font-sora text-base">Profile Settings</h3>
                <p className="text-[#58556A] text-xs font-[400] font-poppins">Manage your account and preferences </p>
            </div>

            <main className="flex flex-col">
                <User />
                <ProfileChange />
            </main>
        </section>
    )
}

export default AccountSettings