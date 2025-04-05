/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect, useMemo, } from "react";
import { formatFileSize, useCSVReader } from "react-papaparse";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { LuArrowDownToLine } from "react-icons/lu"
import Link from "next/link";
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc';
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CVSDataType, TableDataType } from "@/types/dashboard";

interface StepTwoFormProps {
    data: {
        payrollName: string;
        token: string;
        frequency: string;
        startDate: Date | null;
        paymentTime: string;
    };
    handleClick: () => void;
}

const StepTwoForm = ({ data: StepOneData, handleClick }: StepTwoFormProps) => {
    const [csvData, setCsvData] = useState<CVSDataType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [tableData, setTableData] = useState<TableDataType[]>([]);

    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);

    const validateCSVData = (data: CVSDataType[]): boolean => {
        if (!data || data.length === 0) {
            setError("The uploaded file is empty. Please check the file.");
            return false;
        }

        for (const row of data) {
            // Check if name exists and is a string
            if (typeof row.name !== "string" || row.name.trim() === "") {
                setError("Invalid data: 'name' field must be a non-empty string.");
                return false;
            }

            // Check if amount exists and is a valid number
            const amount = Number(row.amount);
            if (isNaN(amount) || amount <= 0) {
                setError("Invalid data: 'amount' must be a positive number.");
                return false;
            }

            // Optional: Add address validation if required
            // Check if address is valid
            if (row.address) {
                // TODO to replace this check with ethers isAddress method
                if (
                    typeof row.address !== "string" || // Must be a string
                    !row.address.startsWith("0x") ||  // Must start with '0x'
                    row.address.length !== 42         // Must have 42 characters
                ) {
                    setError("Invalid data: 'address' must be a valid wallet address (42 characters, starting with '0x').");
                    return false;
                }
            } else {
                setError("Invalid data: 'address' field is required.");
            }
        }

        setError(null);
        return true;
    };

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
                                className="text-[#8E8C9C] "
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

    useEffect(() => {
        if (csvData && csvData.length > 0) {
            setTableData(csvData.map((item, index) => ({ ...item, id: index + 1 })));
        }
    }, [csvData]);

    // adding new record
    const addNewRecord = () => {
        const newRow = { id: tableData.length + 1, name: '', address: '', amount: 0, isEditing: true };
        setTableData([...tableData, newRow]);
    };

    // Update record
    const updateRow = (id: number, key: keyof TableDataType, value: any) => {
        setTableData((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
        );
    };

    // toggle Edit
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

    const router = useRouter();

    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async () => {
        const req = {
            name: StepOneData.payrollName,
            plan: localStorage.getItem("strimzPlan"),
            frequency: StepOneData.frequency,
            token: StepOneData.token,
            start_date: (() => {
                const date = StepOneData?.startDate ? new Date(StepOneData.startDate) : new Date();
                date.setUTCHours(9, 0, 0, 0); // Set time to 9:00 UTC
                return date.toISOString();
            })(),
            receipients: tableData,
        };

        const formattedReq = JSON.stringify(req);

        try {
            setIsSending(true);

            console.log(formattedReq);
            toast.success("payroll created", {
                position: "top-right",
            });
            router.push("/user/payroll");
        } catch (error: any) {
            console.error("Failed to create payroll:", error);
        } finally {
            setIsSending(false);
        }
    };



    return (
        <main className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col">
                <h5 className="uppercase font-[400] font-poppins text-[#58556A] text-xs">Step 2 of 2</h5>
                <h2 className="font-[600] font-sora capitalize text-xl text-primary">Add Recipients</h2>
                <p className="font-[400] font-poppins text-sm text-[#58556A]">Enter recipient details to complete</p>
            </div>

            {/* table section */}
            <div className="w-full flex flex-col gap-4">
                {/* csv import modal */}
                <div className="w-full flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button type="button" className='w-[120px] h-[32px] flex justify-center items-center gap-2 bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] cursor-pointer text-[12px] font-[500] font-poppins text-primary capitalize'>
                                <LuArrowDownToLine className="w-4 h-4" />
                                Import CSV
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <span className="w-[40px] h-[40px] flex justify-center items-center bg-white border-[0.5px] border-[#E5E7EB] shadow-[0px_1px_2px_0px_#00000014] rounded-full">
                                        <LuArrowDownToLine className="w-4 h-4 text-primary" />
                                    </span>
                                    <span className="text-black font-[500] font-sora capitalize text-sm ">Import .CSV file</span>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="w-full">
                                {/* Download Sample CSV */}
                                <Link href="/sample.csv" download className="text-xs font-poppins font-[400] text-[#58556A] underline">
                                    Download Sample CSV
                                </Link>
                                <CSVReader
                                    config={{ header: true, skipEmptyLines: true }}
                                    onUploadAccepted={(results: any) => {
                                        const data = results.data;
                                        if (validateCSVData(data)) {
                                            setCsvData(data);
                                            setError(null);
                                        } else {
                                            setCsvData([]);
                                        }
                                        setZoneHover(false);
                                    }}
                                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
                                        event.preventDefault();
                                        setZoneHover(true);
                                    }}
                                    onDragLeave={(event: React.DragEvent<HTMLDivElement>) => {
                                        event.preventDefault();
                                        setZoneHover(false);
                                    }}
                                >
                                    {({
                                        getRootProps,
                                        acceptedFile,
                                        ProgressBar,
                                        getRemoveFileProps,
                                    }: any) => (
                                        <div
                                            {...getRootProps()}
                                            className={`flex h-[200px] mt-2 flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${zoneHover ? "border-accent bg-[#F9FAFB]" : "border-[#E5E7EB] bg-[#F9FAFB]"
                                                }`}
                                        >
                                            {acceptedFile ? (
                                                <>
                                                    <div className="flex flex-col items-center w-full">
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-primary font-poppins font-[400] text-sm">
                                                                {formatFileSize(acceptedFile.size)}
                                                            </span>
                                                            <span className="text-primary text-sm font-poppins font-medium">
                                                                {acceptedFile.name}
                                                            </span>
                                                        </div>
                                                        <div className="w-full mt-2">
                                                            <ProgressBar />
                                                        </div>
                                                        <button
                                                            {...getRemoveFileProps()}
                                                            className="mt-2 px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded hover:bg-rose-600"
                                                        >
                                                            Remove File
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col gap-1.5 items-center cursor-pointer ">
                                                    <LuArrowDownToLine className="w-6 h-6 text-[#58556A]" />
                                                    <h3 className="capitalize text-base font-sora cursor-pointer font-[500] text-[#58556A]">
                                                        Import CSV File
                                                    </h3>

                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CSVReader>
                                {error && (
                                    <p className="text-red-600 text-sm mt-3">{error}</p>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Table */}
                <main className="w-full flex flex-col items-start border border-[#E5E7EB] shadow-[0px_1px_2px_0px_#00000014] p-1 rounded-[12px]">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow
                                        className="bg-[#F9FAFB] "
                                        key={headerGroup.id}
                                    >
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead
                                                    className="text-xs font-[600] font-poppins text-[#58556A]"
                                                    key={header.id}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="bg-white">
                                {table.getRowModel().rows.length > 0 ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]" key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="text-center text-[#8E8C9C] text-base font-poppins font-[500]">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* add new record */}
                    <button type="button" onClick={addNewRecord} className="w-auto mt-3 px-4 h-[38px] flex justify-center items-center bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] cursor-pointer text-[12px] font-[500] font-poppins text-primary">
                        <GoPlus className="w-4 h-4 font-bold" />
                        Add Recipient
                    </button>
                </main>

                {/* buttons */}
                <div className="w-full justify-end flex gap-4 mt-3">
                    {/* button */}
                    <button onClick={handleClick} type="button" className="w-[97px] h-[40px] flex justify-center items-center bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] cursor-pointer text-[14px] font-[500] font-poppins text-primary">Back</button>

                    <button onClick={handleSubmit} type="button" className="px-4 h-[40px] flex justify-center items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[500] shadow-joinWaitlistBtnShadow text-shadow text-[14px] capitalize">
                        {
                            isSending ?
                                (<span className="flex items-center text-[#FFFFFF] gap-1">
                                    <AiOutlineLoading3Quarters className="animate-spin text-[#FFFFFF]" />
                                    Submitting...
                                </span>)
                                : (<span>Submit</span>)
                        }
                    </button>
                </div>
            </div>
        </main>
    )
}

export default StepTwoForm