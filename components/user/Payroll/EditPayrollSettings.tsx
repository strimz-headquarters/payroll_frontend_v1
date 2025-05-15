/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRouter } from "next/navigation"
import { RxCaretLeft } from "react-icons/rx";
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
import { useCallback, useEffect, useState } from "react";
import axiosInstanceWithToken from "@/config/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { USDC_ON_SEPOLIA, USDT_ON_SEPOLIA } from "@/constants/Contracts";

/**
 * EditPayrollSettings component renders a section displaying a form to edit
 * the details of a payroll. It provides functionality to update the payroll
 * name, select token, stream frequency, start date, and payment time. The
 * component uses a collapsible section to show the form and a button to save
 * the changes.
 * @returns A JSX element representing the edit payroll settings section.
 */
const EditPayrollSettings = ({ id }: { id: string }) => {
    const router = useRouter()

    const [data, setData] = useState({
        payrollName: '',
        token: '',
        frequency: '',
        startDate: null as Date | null,
    });

    const fetchPayroll = useCallback(async () => {
        const response = await axiosInstanceWithToken.get(`payroll/${id}`);
        if (response.data.success) {
            return response.data.data; // Return the rows and count directly
        } else {
            throw new Error("Failed to fetch payrolls");
        }
    }, [id]);

    const {
        data: payrollData, // Destructure payroll data
        isLoading, // Loading state
    } = useQuery({
        queryKey: ["strimzPayrolls", id], // Unique query key
        queryFn: fetchPayroll,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });

    useEffect(() => {
        if (payrollData) {
            setData({
                payrollName: payrollData.name || '',
                token: payrollData.token || '',
                frequency: payrollData.frequency || '',
                startDate: payrollData.start_date ? new Date(payrollData.start_date) : null,
            });
        }
    }, [payrollData]);



    const handleClick = () => {
        // router.push("/user/payroll")
    }

    if (isLoading) {
        return <div>Loading payrolls...</div>;
    }

    console.log({ "payrollData": payrollData });

    return (
        <section className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col">
                <button type="button" className="flex focus:outline-none focus:border-none items-center gap-1 text-primary" onClick={() => router.back()}>
                    <RxCaretLeft className="w-5 h-5" />
                    Back
                </button>
                <h3 className="font-[600] font-sora text-base">Edit payroll settings</h3>
                <p className="text-[#58556A] text-xs font-[400] font-poppins">Define your payroll schedule and details </p>
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
                                <SelectItem value={`${USDC_ON_SEPOLIA}`} >
                                    <span className="w-full uppercase flex flex-row items-center gap-1">
                                        <Image src={usdcIcon} className="mt-1" alt="USDC" width={22} height={22} />
                                        USDC
                                    </span>
                                </SelectItem>
                                <SelectItem value={`${USDT_ON_SEPOLIA}`} className="flex-row items-center gap-2">
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


                </div>

                {/* button */}
                <button onClick={handleClick} type="button" className="self-end mt-3 w-[97px] h-[40px] flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[500] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[14px] capitalize">Save</button>
            </div>
        </section>
    )
}

export default EditPayrollSettings