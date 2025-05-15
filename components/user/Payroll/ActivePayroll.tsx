/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { useState } from "react"
import usdcIcon from "@/public/brands/USDC.svg"
import usdtIcon from "@/public/brands/USDT.svg"
import { GrPowerCycle, GrStatusGood } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci"
import { PiCaretDown } from "react-icons/pi"
import { BsThreeDotsVertical } from "react-icons/bs"
import Link from "next/link"
import { FiEdit, FiPause } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { format } from "date-fns";
import { USDC_ON_SEPOLIA } from "@/constants/Contracts";
import useDeletePayroll from "@/controllers/useDeletePayroll"

/**
 * ActivePayroll component renders a section displaying a list of active payrolls
 * for contract employees. It provides functionality to view, edit, pause, or delete
 * payrolls. The component uses a collapsible section to show detailed information
 * about each payroll, including name, wallet address, amount, and status.
 *
 * @returns A JSX element representing the active payrolls section.
 */

const ActivePayroll = ({ data }: any) => {
    const [isOpen, setIsOpen] = useState<Map<number, boolean>>(new Map());

    const formatDateTime = (isoString: any) => {
        const date = new Date(isoString);
        return format(date, "dd/MM/yyyy hh:mm a"); // Format the date and time
    };

    const handleToggle = (index: number) => {
        setIsOpen((prevOpen) => {
            const newOpen = new Map(prevOpen);
            newOpen.set(index, !newOpen.get(index));
            return newOpen;
        });
    };

    const accumulatedAmount = (data: any) => {
        let total = 0;
        data.receipients.forEach((item: any) => {
            total += Number(item.amount); // Accumulate the amounts
        });
        // Format the total with commas and two decimal places
        return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const deletePayroll = useDeletePayroll();

    const handleDelete = async (id: string) => {
        await deletePayroll(id);
    }


    return (
        <section className="w-full flex flex-col gap-4">
            {
                data.map((payroll: any, index: number) => (
                    <Collapsible
                        key={index}
                        open={isOpen.get(index) ?? false}
                        onOpenChange={() => handleToggle(index)}
                        className="w-full space-y-2 bg-[#F9FAFB] p-3 rounded-[16px] border border-[#E5E7EB]"
                    >
                        <div className="flex items-start justify-between gap-3 bg-white rounded-[8px] border border-[#E5E7EB] shadow-navbarShadow p-4">
                            <div className="flex flex-col gap-1.5">
                                <h4 className="text-sm font-poppins capitalize font-[600] text-primary">
                                    {payroll.name}
                                </h4>
                                <div className="flex flex-wrap items-center md:gap-3 gap-2 text-xs font-poppins font-[400] text-[#8E8C9C]">
                                    <span className="flex items-center gap-0.5">
                                        <Image src={payroll.token === USDC_ON_SEPOLIA ? usdcIcon : usdtIcon} alt={payroll.token} className='w-4 h-4 mt-0.5' width={68} height={69} quality={100} priority />
                                        {accumulatedAmount(payroll)}
                                    </span>
                                    <span className="flex capitalize items-center gap-1">
                                        <GrPowerCycle className='w-3 h-3' />
                                        {payroll.frequency}
                                    </span>
                                    <span className="flex capitalize items-center gap-1">
                                        <GrStatusGood className='w-3 h-3' />
                                        {payroll.status}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CiCalendar className='w-3 h-3' />
                                        {formatDateTime(payroll.start_date)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1 text-primary outline-none focus:outline-none focus:border-none">
                                        <BsThreeDotsVertical className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="text-[#58556A] w-40 text-sm">
                                        <Link href="/user/payroll/edit" className="w-full flex items-center gap-1 text-sm px-2 py-1">
                                            <FiEdit className="w-4 h-4" />
                                            <span>Edit Settings</span>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="w-full flex items-center gap-1 text-sm px-2 py-1">
                                                    <FiPause className="w-4 h-4" />
                                                    Pause payroll
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Do you really want to pause this payroll ? If yes, click on continue
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-accent text-white">Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <DropdownMenuSeparator />
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="w-full flex items-center gap-1 text-sm px-2 py-1">
                                                    <RiDeleteBin6Line className="w-4 h-4" />
                                                    Delete payroll
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete this payroll. If you want to go ahead, click on continue
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-red-600 text-white" onClick={() => handleDelete(payroll.id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <CollapsibleTrigger asChild>
                                    <button type="button" className="text-primary p-0">
                                        <PiCaretDown className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </button>
                                </CollapsibleTrigger>
                            </div>
                        </div>
                        <CollapsibleContent className="w-full mt-3">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="text-xs font-[600] font-poppins text-[#58556A] bg-[#F9FAFB]">
                                            <TableHead >Name</TableHead>
                                            <TableHead>Wallet Address</TableHead>
                                            <TableHead>Amount(s)</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="bg-white">
                                        {payroll.receipients.map((item: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">{item.name}</TableCell>
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">{item.address}</TableCell>
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">{item.amount}</TableCell>
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">
                                                    <span className="rounded-[8px] bg-[#F5FFFA] px-2 py-1 text-[#01753E]">
                                                        Active
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="flex items-center gap-1 text-primary outline-none focus:outline-none focus:border-none">
                                                            <BsThreeDotsVertical className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="text-[#58556A] w-40 text-sm">
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <button className="w-full flex items-center gap-1 text-sm px-2 py-1">
                                                                        <FiPause className="w-4 h-4" />
                                                                        Pause payroll
                                                                    </button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Do you really want to pause this recipient&apos;s payroll ? If yes, click on continue
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction className="bg-accent text-white">Continue</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                            <DropdownMenuSeparator />
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <button className="w-full flex items-center gap-1 text-sm px-2 py-1">
                                                                        <RiDeleteBin6Line className="w-4 h-4" />
                                                                        Delete payroll
                                                                    </button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be undone. This will permanently delete this recipient&apos;s payroll. If you want to go ahead, click on continue
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction className="bg-red-600 text-white">Continue</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))
            }
        </section>
    )
}

export default ActivePayroll