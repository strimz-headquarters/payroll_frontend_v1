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
import PausedPayroll from "./PausedPayroll"


const UserPayrolls = () => {
    const router = useRouter()

    return (
        <section className="w-full flex flex-col">
            <div className="w-full flex md:flex-row flex-col justify-between md:items-center">
                <div className="w-full flex flex-col">
                    <h3 className="font-[600] font-sora text-lg">Payroll</h3>
                    <p className="text-[#58556A] capitalize text-xs font-[400] font-poppins">Automate token streaming instantly </p>
                </div>


                <button type="button" onClick={() => router.push("/user/payroll/create")} className='w-[151px] mt-4 h-[38px] flex justify-center gap-1 items-center rounded-[8px] bg-accent text-[#FFFFFF] font-poppins font-[600] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[12px]'>
                    <GoPlus className="w-4 h-4 font-bold" />
                    Create payroll
                </button>
            </div>

            {/* no payrolls */}

            {/* <div className="w-full h-[350px] flex justify-center items-center">
                <div className="w-full flex flex-col justify-center gap-1 items-center">
                    <h4 className="text-strimzPrimary font-[500] font-poppins text-base">
                        No Payrolls yet</h4>
                    <p className="text-[#58556A] md:w-[50%] w-[80%] text-center text-xs font-[400] font-poppins">Set up your first payroll and start automating payments effortlessly.</p>

                    <button type="button" onClick={() => router.push("/user/payroll/create")} className='w-[151px] mt-4 h-[38px] flex justify-center gap-1 items-center rounded-[8px] bg-strimzBrandAccent text-[#FFFFFF] font-poppins font-[600] shadow-joinWaitlistBtnShadow z-10 text-shadow text-[12px]'>
                        <GoPlus className="w-4 h-4 font-bold" />
                        Create payroll
                    </button>
                </div>
            </div> */}


            <main className="w-full mt-4">
                <Tabs defaultValue="activepayroll" className="w-full">
                    <TabsList className="w-auto bg-[#F9FAFB] justify-start ">
                        <TabsTrigger className="px-3" value="activepayroll">Active payroll</TabsTrigger>
                        <TabsTrigger className="px-3 py-2" value="pausedpayroll">Paused payroll</TabsTrigger>

                    </TabsList>
                    <TabsContent value="activepayroll" className="mt-8 w-full">
                        <ActivePayroll />
                    </TabsContent>
                    <TabsContent value="pausedpayroll" className="mt-8 w-full">
                        <PausedPayroll />
                    </TabsContent>
                </Tabs>
            </main>

        </section>
    )
}

export default UserPayrolls