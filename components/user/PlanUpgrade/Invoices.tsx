'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useMemo } from "react"

/**
 * Renders a table of invoices.
 * 
 * @returns {React.ReactElement} A JSX element representing the table of invoices.
 */
const Invoices = () => {

    const invoiceData = useMemo(() =>
        [
            {
                id: 1,
                date: "10th Aug, 24",
                plantype: "Bronze",
                amount: "$10",
                status: "Paid",
            },
            {
                id: 2,
                date: "20th Aug, 24",
                plantype: "Bronze",
                amount: "$10",
                status: "Paid",
            },
            {
                id: 3,
                date: "30th Aug, 24",
                plantype: "Bronze",
                amount: "$10",
                status: "Paid",
            },
        ], [])

    return (
        <main className="w-full border border-[#E5E7EB] rounded-[12px] shadow-[0px_1px_2px_0px_#00000014] overflow-hidden">
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="text-xs font-[600] font-poppins text-[#58556A] bg-[#F9FAFB]">
                            <TableHead>Date</TableHead>
                            <TableHead>Plan type</TableHead>
                            <TableHead>Amount(s)</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white">
                        {invoiceData.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">{item.date}</TableCell>
                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">{item.plantype}</TableCell>
                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">{item.amount}</TableCell>
                                <TableCell className="text-nowrap text-[#8E8C9C] text-sm font-poppins font-[400]">
                                    <span className="rounded-[8px] bg-[#F5FFFA] px-2 py-1 text-[#01753E]">
                                        {item.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}

export default Invoices