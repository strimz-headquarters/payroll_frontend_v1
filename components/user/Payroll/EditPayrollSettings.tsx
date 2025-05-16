/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useCallback, useEffect, useState, useMemo } from "react";
import axiosInstanceWithToken from "@/config/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { USDC_ON_SEPOLIA, USDT_ON_SEPOLIA } from "@/constants/Contracts";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { VscEdit, VscRemove, VscSave } from "react-icons/vsc";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoPlus } from "react-icons/go";

/**
 * EditPayrollSettings component renders a section displaying a form to edit
 * the details of a payroll. It provides functionality to update the payroll
 * name, select token, stream frequency, start date, and payment time. The
 * component uses a collapsible section to show the form and a button to save
 * the changes.
 * @returns A JSX element representing the edit payroll settings section.
 */

// Add these interfaces
interface TableDataType {
    id: number;
    name: string;
    address: string;
    amount: number;
    isEditing: boolean;
}

const EditPayrollSettings = ({ id }: { id: string }) => {
    const router = useRouter()
    const [isSending, setIsSending] = useState(false);
    const [tableData, setTableData] = useState<TableDataType[]>([]);

    const columns = useMemo<ColumnDef<TableDataType>[]>(
        () => [
            {
                accessorKey: "name",
                header: () => "Name",
                cell: (info) => {
                    const row = info.row.original;
                    return row.isEditing ? (
                        <input
                            type="text"
                            value={row.name}
                            onChange={(e) => updateRow(row.id, "name", e.target.value)}
                            className="w-full rounded-[8px] border bg-[#F9FAFB] h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-3 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                        />
                    ) : (
                        info.getValue()
                    );
                },
            },
            {
                accessorKey: "address",
                header: () => "Wallet Address",
                cell: (info) => {
                    const row = info.row.original;
                    return row.isEditing ? (
                        <input
                            type="text"
                            value={row.address}
                            onChange={(e) => updateRow(row.id, "address", e.target.value)}
                            className="w-full rounded-[8px] border bg-[#F9FAFB] h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-3 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                        />
                    ) : (
                        info.getValue()
                    );
                },
            },
            {
                accessorKey: "amount",
                header: () => "Amount",
                cell: (info) => {
                    const row = info.row.original;
                    return row.isEditing ? (
                        <input
                            type="number"
                            value={row.amount}
                            onChange={(e) => updateRow(row.id, "amount", e.target.value)}
                            className="w-full rounded-[8px] border bg-[#F9FAFB] h-[40px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-3 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]"
                        />
                    ) : (
                        info.getValue()
                    );
                },
            },
            {
                id: "actions",
                header: () => "Actions",
                cell: (info) => {
                    const row = info.row.original;
                    return (
                        <div className="flex items-center gap-3">
                            <button
                                className="text-[#8E8C9C]"
                                onClick={() => toggleEdit(row.id)}
                            >
                                {row.isEditing ? <VscSave className="w-4 h-4" /> : <VscEdit className="w-4 h-4" />}
                            </button>
                            <button
                                className="text-[#8E8C9C]"
                                onClick={() => removeRow(row.id)}
                            >
                                <VscRemove className="w-4 h-4" />
                            </button>
                        </div>
                    );
                },
            }
        ],
        []
    );

    const table = useReactTable({
        columns,
        data: tableData,
        getCoreRowModel: getCoreRowModel(),
    });

    const [data, setData] = useState({
        payrollName: '',
        token: '',
        frequency: '',
        startDate: null as Date | null,
    });

    const fetchPayroll = useCallback(async () => {
        const response = await axiosInstanceWithToken.get(`payroll?id=${id}`);
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
        if (payrollData && payrollData.rows.length > 0) {
            const payroll = payrollData.rows[0];
            setData({
                payrollName: payroll.name || '',
                token: payroll.token || '',
                frequency: payroll.frequency || '',
                startDate: payroll.start_date ? new Date(payroll.start_date) : null,
            });

            const initialData = payroll.receipients.map((recipient: any, index: number) => ({
                id: index + 1,
                name: recipient.name,
                address: recipient.address,
                amount: recipient.amount,
                isEditing: false
            }));
            setTableData(initialData);
        }
    }, [payrollData]);


    // Add table management functions
    const addNewRecord = () => {
        const newRow = { id: tableData.length + 1, name: '', address: '', amount: 0, isEditing: true };
        setTableData([...tableData, newRow]);
    };

    const updateRow = (id: number, key: keyof TableDataType, value: any) => {
        setTableData((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
        );
    };

    const toggleEdit = (id: number) => {
        setTableData((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, isEditing: !row.isEditing } : row
            )
        );
    };

    const removeRow = (id: number) => {
        setTableData((prev) => prev.filter((row) => row.id !== id));
    };


    // Update your handleSubmit
    const handleSubmit = async () => {
        try {
            setIsSending(true);
            const payload = {
                ...data,
                receipients: tableData.map(({ id, isEditing, ...rest }) => rest)
            };

            const formattedReq = JSON.stringify(payload);

            console.log("formattedReq: ", formattedReq);

            // const response = await axiosInstanceWithToken.put(`payroll/${id}`, payload);

            toast.success("Payroll updated successfully");
            router.push('/user/payroll');

        } catch (error: any) {
            console.log("Failed to update payroll:", error);
            toast.error("Failed to update payroll");
        } finally {
            setIsSending(false);
        }
    };

    if (isLoading) {
        return <div>Loading payrolls...</div>;
    }

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
                            className={`w-full rounded-[8px] border bg-[#F9FAFB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] capitalize px-4 outline-none transition duration-300 focus:border-accent border-[#E5E7EB]`} />
                    </div>

                    {/* select token */}
                    <div className='w-full flex flex-col'>
                        <label htmlFor="token" className="font-poppins text-[14px] text-[#58556A] leading-[24px]">Token <span className="text-rose-600 mt-2">*</span></label>
                        <Select
                            value={data.token}
                            onValueChange={(value) =>
                                setData((prev: any) => ({ ...prev, token: value }))
                            }
                        >
                            <SelectTrigger className="focus:ring-0 focus:outline-none w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent">
                                <SelectValue placeholder="Select token">
                                    {data.token === USDC_ON_SEPOLIA ? (
                                        <span className="flex items-center gap-1">
                                            <Image src={usdcIcon} alt="USDC" width={22} height={22} />
                                            USDC
                                        </span>
                                    ) : data.token === USDT_ON_SEPOLIA ? (
                                        <span className="flex items-center gap-1">
                                            <Image src={usdtIcon} alt="USDT" width={22} height={22} />
                                            USDT
                                        </span>
                                    ) : null}
                                </SelectValue>
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
                            value={data.frequency}
                            onValueChange={(value) =>
                                setData((prev: any) => ({ ...prev, frequency: value }))}
                        >
                            <SelectTrigger className="focus:ring-0 focus:outline-none w-full rounded-[8px] border bg-[#F9FAFB] border-[#E5E7EB] shadow-navbarShadow h-[44px] font-poppins text-[14px] placeholder:text-[14px] placeholder:text-[#8E8C9C] text-[#8E8C9C] px-4 outline-none transition duration-300 focus:border-accent">
                                <SelectValue placeholder="Select frequency">
                                    {data.frequency ?
                                        `${data.frequency.charAt(0).toUpperCase()}${data.frequency.slice(1)}` :
                                        'Select frequency'
                                    }
                                </SelectValue>
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


                {/* Table */}
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full border border-[#E5E7EB] shadow-[0px_1px_2px_0px_#00000014] p-1 rounded-[12px]">
                        <div className="w-full overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow className="bg-[#F9FAFB]" key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead className="text-xs font-[600] font-poppins text-[#58556A]" key={header.id}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody className="bg-white">
                                    {table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]" key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <button
                            type="button"
                            onClick={addNewRecord}
                            className="w-auto mt-3 px-4 h-[38px] flex justify-center items-center bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] cursor-pointer text-[12px] font-[500] font-poppins text-primary"
                        >
                            <GoPlus className="w-4 h-4 font-bold" />
                            Add Recipient
                        </button>
                    </div>
                </div>




                {/* button */}
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="self-end mt-3 w-[97px] h-[40px] flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[500] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[14px] capitalize"
                    disabled={isSending}
                >
                    {isSending ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-[#FFFFFF]" />
                    ) : (
                        'Update'
                    )}
                </button>
            </div>
        </section>
    )
}

export default EditPayrollSettings;