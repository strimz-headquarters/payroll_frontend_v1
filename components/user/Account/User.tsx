'use client'
import { userManager } from '@/config/ManageUser';
import { StrimzUD } from '@/types/auth';
import React, { useState, useEffect } from 'react'
import { PiUserCircleLight } from 'react-icons/pi'

const User = () => {
    const [user, setUser] = useState<Partial<StrimzUD>>();

    useEffect(() => {
        const currentUser = userManager.getUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);


    return (
        <div className='w-full flex gap-3 items-center justify-start border-b-[1px] border-[#E5E7EB] pb-4'>
            <div className='bg-[#FFFFFF] w-[45px] h-[45px] rounded-full border-[0.5px] border-[#E5E7EB] shadow-subIconShadow flex justify-center items-center'>
                <PiUserCircleLight className='w-[25px] h-[25px] text-primary' />
            </div>
            <div className='flex flex-col'>
                <h2 className="font-sora font-[600] text-primary text-[24px] leading-[32px]">{user?.username}</h2>
                <p className='font-poppins font-[400] text-[14px] leading-[24px] text-[#58556A]'>{user?.email}</p>
            </div>
        </div>
    )
}

export default User