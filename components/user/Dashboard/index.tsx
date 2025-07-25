/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Alert from './Alert'
import Image from 'next/image'
import usdcIcon from "@/public/brands/USDC.svg"
import usdtIcon from "@/public/brands/USDT.svg"
import { AiOutlineDollarCircle } from 'react-icons/ai'
import TransactionSummary from './TransactionSummary'
import FundWallet from './FundWallet'
import Withdraw from './Withdraw'
import celoIcon from "@/public/networks/celo.png"
import { IoCopyOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { userManager } from '@/config/ManageUser'
import { StrimzUD } from '@/types/auth'
import useGetUSDCBalance from '@/controllers/useGetUSDCBalance'
import useGetUSDTBalance from '@/controllers/useGetUSDTBalance'

/**
 * UserDashboardHome component renders the main dashboard interface for the user.
 * It displays an overview of the user's USDC and USDT balances, total payout,
 * and provides options to fund and withdraw from the wallet.
 * 
 * The component retrieves the user's wallet address from local storage on mount
 * and provides functionality to copy the address to the clipboard. It also
 * shortens the address for display purposes. The component consists of the following sections:
 * 
 * - Overview: Displays the user's balance for USDC, USDT, and total payout.
 * - Wallet Address: Shows the shortened wallet address with a copy button.
 * - Fund & Withdraw: Allows the user to fund and withdraw from their wallet.
 * 
 * Additionally, the component includes an Alert and a TransactionSummary component.
 */

const UserDashboardHome = () => {
    const [user, setUser] = useState<Partial<StrimzUD>>();

    const usdcBal = useGetUSDCBalance();
    const usdtBal = useGetUSDTBalance();

    useEffect(() => {
        const currentUser = userManager.getUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const shortenAddress = useMemo(() => {
        return user?.address ? `${user?.address.slice(0, 8)}...${user?.address.slice(-6)}` : "";
    }, [user?.address]);


    // async function clipboard copy
    const copyTextToClipboard = async (text: any) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    //handle copy to clipboard
    const handleCopy = () => {
        copyTextToClipboard(user?.address).then(() => {
            toast.success("Wallet address copied to clipboard", {
                position: "top-right",
            })
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to copy wallet address", {
                position: "top-right",
            })
        });
    }

    return (
        <section className="w-full flex flex-col gap-3">
            <Alert />

            <main className="w-full bg-[#F9FAFB] rounded-[16px] p-4 flex flex-col gap-1.5">
                <h2 className="text-primary font-[500] font-poppins text-sm">Overview</h2>
                {/* balance */}
                <div className="w-full h-auto p-5 flex flex-col lg:justify-between rounded-[12px] bg-white shadow-[0px_1px_2px_0px_#00000014]">
                    <div className='w-full grid lg:grid-cols-3 grid-cols-2 gap-4 lg:gap-0'>

                        {/* USDC */}
                        <div className="flex flex-col gap-3 ">
                            <span className="flex items-center gap-2 uppercase font-[400] font-poppins text-[#58556A] text-xs">
                                <span className="w-[24px] h-[24px] border-[0.2px] border-[#E5E7EB] shadow-[0px_-1.2px_1.2px_0px_#0000001F_inset] rounded-full bg-white p-[1px]">
                                    <Image src={usdcIcon} alt='usdt icon' className='w-[24px] h-[24px]' width={68} height={69} quality={100} priority />
                                </span>
                                usdc
                            </span>
                            <h3 className="text-black font-[600] font-sora text-xl text-wrap">$ {usdcBal ? usdcBal : "0.00"}</h3>
                        </div>

                        {/* USDT */}
                        <div className="flex flex-col gap-3 md:border-l border-[#E5E7EB] md:pl-4">
                            <span className="flex items-center gap-2 uppercase font-[400] font-poppins text-[#58556A] text-xs">
                                <span className="w-[24px] h-[24px] border-[0.2px] border-[#E5E7EB] shadow-[0px_-1.2px_1.2px_0px_#0000001F_inset] rounded-full bg-white p-[1px]">
                                    <Image src={usdtIcon} alt='usdt icon' className='w-[24px] h-[24px]' width={68} height={69} quality={100} priority />
                                </span>
                                usdt
                            </span>
                            <h3 className="text-black font-[600] font-sora text-xl text-wrap">$ {usdtBal ? usdtBal : "0.00"}</h3>
                        </div>

                        {/* Total Payout */}
                        <div className="flex flex-col gap-3 md:border-l border-[#E5E7EB] md:pl-4 ">
                            <span className="flex items-center gap-2 uppercase font-[400] font-poppins text-[#58556A] text-xs">
                                <span className="w-[24px] h-[24px] border-[0.2px] border-[#E5E7EB] shadow-[0px_-1.2px_1.2px_0px_#0000001F_inset] rounded-full flex justify-center items-center bg-white p-[1px]">
                                    <AiOutlineDollarCircle className="text-black w-[22px] h-[22px]" />
                                </span>
                                total payout
                            </span>
                            <h3 className="text-black font-[600] font-sora text-xl text-wrap">$ 0</h3>
                        </div>
                    </div>
                    {/* fund & withdraw */}
                    <div className="flex gap-4 mt-6 ">
                        <div className="flex gap-1.5 items-center">
                            <span className="text-[14px] capitalize text-[#58556A] font-poppins font-[500]">Wallet Address:</span>
                            <Image src={celoIcon} alt="Base Icon" className='w-4 h-4 rounded-full' width={16} height={16} quality={100} priority />
                            <p className="text-base capitalize text-[#58556A] font-poppins font-[400]">{shortenAddress}</p>
                            <button type="button" onClick={handleCopy} className="text-[#58556A]">
                                <IoCopyOutline className="w-4 h-4" />
                            </button>
                        </div>

                    </div>
                    <div className="flex gap-4 mt-4">
                        <FundWallet />
                        <Withdraw />
                    </div>
                </div>
            </main>

            <TransactionSummary />
        </section>
    )
}

export default UserDashboardHome