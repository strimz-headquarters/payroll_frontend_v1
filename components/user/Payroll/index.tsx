'use client'
import { useRouter } from "next/navigation"
import { GoPlus } from "react-icons/go"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import ActivePayroll from "./ActivePayroll"
import axiosInstanceWithToken from "@/config/AxiosInstance"
import { useQuery } from "@tanstack/react-query";


/**
 * The UserPayrolls component renders a section displaying a list of payrolls
 * for contract employees. It provides functionality to view, edit, pause, or delete
 * payrolls. The component uses a collapsible section to show detailed information
 * about each payroll, including name, wallet address, amount, and status.
 *
 * @returns A JSX element representing the payrolls section.
 */

const fetchPayrolls = async () => {
    const response = await axiosInstanceWithToken.get("payroll");
    if (response.data.success) {
        return response.data.data; // Return the rows and count directly
    } else {
        throw new Error("Failed to fetch payrolls");
    }
};

const UserPayrolls = () => {
    const router = useRouter()

    const {
        data: payrollData, // Destructure payroll data
        isLoading, // Loading state
        isError, // Error state
        error, // Error details
    } = useQuery({
        queryKey: ["strimzPayrolls"], // Unique query key
        queryFn: fetchPayrolls,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
    });


    if (isLoading) {
        return <div>Loading payrolls...</div>;
    }

    if (isError) {
        return (
            <div className="text-red-500">
                Error: {error?.message || "An unexpected error occurred"}
            </div>
        );
    }

    const { rows: strimzPayrolls = [], count: numOfPayrolls = 0 } = payrollData || {};

    console.log("Payrolls data:", strimzPayrolls);

    return (
        <section className="w-full flex flex-col">
            <div className="w-full flex md:flex-row flex-col justify-between md:items-center">
                <div className="w-full flex flex-col">
                    <h3 className="font-[600] font-sora text-lg">Payroll</h3>
                    <p className="text-[#58556A] capitalize text-xs font-[400] font-poppins">Automate token streaming instantly </p>
                </div>

                {
                    numOfPayrolls > 0 &&
                    <button type="button" onClick={() => router.push("/user/payroll/create")} className='w-[151px] mt-4 h-[38px] flex justify-center gap-1 items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[600] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[12px]'>
                        <GoPlus className="w-4 h-4 font-bold" />
                        Create payroll
                    </button>
                }
            </div>

            {/* no payrolls */}

            {
                numOfPayrolls === 0 &&
                <div className="w-full h-[350px] flex justify-center items-center">
                    <div className="w-full flex flex-col justify-center gap-1 items-center">
                        <h4 className="text-strimzPrimary font-[500] font-poppins text-base">
                            No Payrolls yet</h4>
                        <p className="text-[#58556A] md:w-[50%] w-[80%] text-center text-xs font-[400] font-poppins">Set up your first payroll and start automating payments effortlessly.</p>

                        <button type="button" onClick={() => router.push("/user/payroll/create")} className='w-[151px] mt-4 h-[38px] flex justify-center gap-1 items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[600] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[12px]'>
                            <GoPlus className="w-4 h-4 font-bold" />
                            Create payroll
                        </button>
                    </div>
                </div>
            }


            {
                numOfPayrolls > 0 &&
                <main className="w-full mt-4">
                    <Tabs defaultValue="activepayroll" className="w-full">
                        <TabsList className="w-auto bg-[#F9FAFB] justify-start ">
                            <TabsTrigger className="px-3" value="activepayroll">Active payroll</TabsTrigger>
                            <TabsTrigger className="px-3 py-2" value="pausedpayroll">Paused payroll</TabsTrigger>

                        </TabsList>
                        <TabsContent value="activepayroll" className="mt-8 w-full">
                            <ActivePayroll data={strimzPayrolls} />
                        </TabsContent>
                        <TabsContent value="pausedpayroll" className="mt-8 w-full">
                            {/* <PausedPayroll /> */}
                        </TabsContent>
                    </Tabs>
                </main>
            }
        </section>
    )
}

export default UserPayrolls