/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"


interface StepOneFormProps {
    data: {
        payrollName: string;
        token: string;
        frequency: string;
        startDate: Date | null;
        // paymentTime: string;
    };
    setData: (newData: any) => void;
    handleClick: () => void;
}


/**
 * StepOneForm component renders a form for setting up payroll details.
 * It provides fields for:
 * - Payroll name
 * - Token selection (USDC or USDT)
 * - Stream frequency (Daily, Weekly, Monthly)
 * - Stream start date
 * - Stream start time
 * It also includes a Next button to proceed to the second step.
 * @param data - The data to be updated in the parent component
 * @param setData - The function to update the data in the parent component
 * @param handleClick - The function to handle the Next button click
 * @returns A JSX element representing the StepOneForm
 */
const StepOneForm = ({ data, setData, handleClick }: StepOneFormProps) => {

    return (
        <main className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col">
                <h5 className="uppercase font-[400] font-poppins text-[#58556A] text-xs">Step 1 of 2</h5>
                <h2 className="font-[600] font-sora capitalize text-xl text-primary">Setup payroll</h2>
                <p className="font-[400] font-poppins text-sm text-[#58556A]">Steup your payment timing and preference</p>
            </div>

            {/* inputs section */}
            <div className="w-full flex flex-col gap-4">

                <div className="w-full grid md:grid-cols-2 md:gap-6 gap-4">
                    {/* payroll name */}
                    <div className="w-full flex flex-col">
                        <label htmlFor="payrollName" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Payroll name <span className="text-rose-600 mt-2">*</span></label>
                        <input
                            type="text"
                            name="payrollName"
                            id="payrollName"
                            placeholder='Contract employees'
                            value={data.payrollName}
                            onChange={(e) =>
                                setData((prev: any) => ({ ...prev, payrollName: e.target.value }))
                            }
                            className={`w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]`} />
                    </div>

                    {/* select token */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="token" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Token <span className="text-rose-600 mt-2">*</span></label>
                        <Select
                            onValueChange={(value) =>
                                setData((prev: any) => ({ ...prev, token: value }))
                            }
                        >
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


                </div>

                <div className="w-full grid md:grid-cols-2 md:gap-6 gap-4">
                    {/* stream frequency */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="frequency" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Stream frequency <span className="text-rose-600 mt-2">*</span></label>
                        <Select
                            onValueChange={(value) =>
                                setData((prev: any) => ({ ...prev, frequency: value }))}
                        >
                            <SelectTrigger className="focus:ring-0 focus:outline-none w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent">
                                <SelectValue placeholder="Select a frequency" />
                            </SelectTrigger>
                            <SelectContent className="focus:ring-0 focus:outline-none z-[99999]">
                                <SelectItem value="daily" >
                                    Daily(24 hours)
                                </SelectItem>
                                <SelectItem value="weekly">
                                    Weekly(7 days)
                                </SelectItem>
                                <SelectItem value="monthly">
                                    Monthly(30 days)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* stream start date */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="startDate" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Stream start date <span className="text-rose-600 mt-2">*</span></label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    className={cn(
                                        "w-full flex items-center justify-start text-left rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[44px] font-poppins text-[14px] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {data.startDate
                                        ? format(data.startDate, "PPP")
                                        : <span>Pick a date</span>
                                    }
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={data.startDate || undefined}
                                    onSelect={(selectedDate) => {
                                        setData((prev: any) => ({
                                            ...prev,
                                            startDate: selectedDate,
                                        }))
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* payment time */}
                    {/* <div className="w-full flex flex-col">
                        <label htmlFor="paymentTime" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Stream start time <span className="text-rose-600 mt-2">*</span></label>
                        <input
                            type="time"
                            name="startTime"
                            id="startTime"
                            placeholder='00:00AM'
                            value={data.paymentTime}
                            onChange={(e) => setData((prev: any) => ({ ...prev, paymentTime: e.target.value }))}
                            className={`w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]`} />
                    </div> */}
                </div>

                {/* button */}
                <button onClick={handleClick} type="button" className="self-end mt-3 w-[97px] h-[40px] flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[500] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[14px] capitalize">Next</button>
            </div>
        </main>
    )
}

export default StepOneForm