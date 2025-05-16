'use client'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LuWallet } from "react-icons/lu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import usdcIcon from "@/public/brands/USDC.svg"
import usdtIcon from "@/public/brands/USDT.svg"
import Image from "next/image";
import useWithdrawFunds from "@/controllers/useWithdrawFunds";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { isAddress } from "viem";

/**
 * Withdraw is a dialog component that facilitates the process of withdrawing funds from a wallet.
 * It includes a button to trigger the dialog, a form to select a token type and enter an amount,
 * and a confirmation button to proceed with the withdrawal.
 * 
 * The dialog consists of:
 * - A header with a title indicating the withdrawal process.
 * - A body with a select input for choosing a token (USDC or USDT) and an input field for entering the withdrawal amount.
 * - A footer with a button to confirm and execute the withdrawal.
 * 
 * The component uses a modal dialog structure to ensure a focused user experience.
 */

const Withdraw = () => {

    const { withdrawFunds } = useWithdrawFunds()

    const [amount, setAmount] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleFundWithdrawal = () => {
        if (!token) {
            toast.error("Please select a token", {
                position: "top-right",
            });
            return;
        }
        if (!recipient) {
            toast.error("Please enter a recipient address", {
                position: "top-right",
            });
            return;
        }
        if (isAddress(recipient) === false) {
            toast.error("Please enter a valid recipient address", {
                position: "top-right",
            });
            return;
        }
        if (!password) {
            toast.error("Please enter your password", {
                position: "top-right",
            });
            return;
        }
        if (!amount) {
            toast.error("Please enter an amount", {
                position: "top-right",
            });
            return;
        }
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) return;

        withdrawFunds(password, token, numericAmount, recipient);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className={`w-[97px] h-[32px] flex justify-center items-center bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] cursor-pointer text-[12px] font-[500] font-poppins text-primary`}
                >
                    Withdraw
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="w-[40px] h-[40px] flex justify-center items-center bg-white border-[0.5px] border-[#E5E7EB] shadow-[0px_1px_2px_0px_#00000014] rounded-full">
                            <LuWallet className="w-4 h-4 text-primary" />
                        </span>
                        <span className="text-black font-[500] font-sora capitalize text-sm ">withdraw from wallet</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* token */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="token" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Select token</label>
                        <Select value={token}
                            onValueChange={setToken}>
                            <SelectTrigger className="focus:ring-0 focus:outline-none w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent">
                                <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent className="focus:ring-0 focus:outline-none z-[99999]">
                                <SelectItem value="usdc" >
                                    <span className="w-full uppercase flex flex-row items-center gap-1">
                                        <Image src={usdcIcon} className="mt-1" alt="USDC" width={22} height={22} />
                                        USDC
                                    </span>
                                </SelectItem>
                                <SelectItem value="usdt" className="flex-row items-center gap-2">
                                    <span className="w-full uppercase flex flex-row items-center gap-1">
                                        <Image src={usdtIcon} className="mt-1" alt="USDT" width={22} height={22} />
                                        USDT
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* amount */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="amount" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Amount</label>
                        <input type="number" name="amount" value={amount}
                            onChange={(e) => setAmount(e.target.value)} id="amount" placeholder='$ 0.00' className={`w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent`} />

                    </div>

                    {/* recipient */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="recipient" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Recipient</label>
                        <input type="text" name="recipient" value={recipient}
                            onChange={(e) => setRecipient(e.target.value)} id="recipient" placeholder='0x1234abc...' className={`w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent`} />

                    </div>

                    {/* Password */}
                    <div className="w-full flex flex-col">
                        <label
                            htmlFor="password"
                            className="font-poppins text-[14px] text-[#58556A] leading-[24px]"
                        >
                            Password
                        </label>
                        <div className="relative w-full h-[44px]">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-full font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] pl-4 pr-14 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]`}
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
                    </div>
                </div>
                <DialogFooter>
                    <button type="button" onClick={handleFundWithdrawal} className='w-full h-[40px] flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[500] shadow-joinWaitlistBtnShadow text-shadow text-[12px] capitalize'>
                        withdraw from wallet
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Withdraw