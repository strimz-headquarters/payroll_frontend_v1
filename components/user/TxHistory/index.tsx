'use client'
import { useRouter } from "next/navigation"
import { RxCaretLeft } from "react-icons/rx";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import AllTx from "./AllTx";
import PayrollTx from "./PayrollTx";
import WithdrawalTx from "./WithdrawalTx";
import WalletFundTx from "./WalletFundTx";
import useWatchContractEvents from "@/controllers/useWatchContractEvent";
import { formatDate, getTokenName } from "@/lib/utils";
import { formatUnits } from "ethers";
// import { useWatchContractEvent } from 'wagmi'

/**
 * TxHistory component renders a section with all the different types of transactions.
 *
 * The component renders all the different types of transactions, including wallet funding,
 * payroll, and withdrawal transactions.
 *
 * @returns {React.ReactElement} A section with all the different types of transactions.
 */
const TxHistory = () => {
    const router = useRouter()
    const { logs, loading, isError, getLogs } = useWatchContractEvents()
    // console.log(logs)

    return (
        <section className="w-full flex flex-col">

            <div className="w-full flex flex-col">
                <button type="button" className="flex focus:outline-none focus:border-none items-center gap-1 text-primary" onClick={() => router.back()}>
                    <RxCaretLeft className="w-5 h-5" />
                    Back
                </button>
                <h3 className="font-[600] font-sora text-base">Transaction history</h3>
                <p className="text-[#58556A] text-xs font-[400] font-poppins">Track and review all your payments </p>
            </div>
            {/* filters */}

            <main className="w-full mt-4">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full bg-[#F9FAFB] justify-start before:bg-border relative h-auto gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
                        <TabsTrigger className="px-3 bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none" value="all">All</TabsTrigger>
                        <TabsTrigger className="px-3 py-2 bg-muted overflow-hidden rounded-b-none border-x border-t data-[state=active]:z-10 data-[state=active]:shadow-none" value="payroll">Payroll</TabsTrigger>
                        <TabsTrigger className="px-3 bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none" value="walletfunding">Wallet Funding</TabsTrigger>
                        <TabsTrigger className="px-3 bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none" value="walletwithdrawal">Wallet Withdrawal</TabsTrigger>
                    </TabsList>
                    {isError ? <div className="text-muted-foreground h-44 gap-1 flex flex-col items-center justify-center">
                        <p>Something went wrong</p>
                        <button onClick={() => getLogs()} className="text-black/50 border-[1px] border-black/30 px-4 py-1">Try again</button>
                    </div> : loading ? <div className="flex items-center justify-center h-44">
                        <p>loading...</p>
                    </div> : logs.length === 0 ? <div className="text-muted-foreground h-44 gap-1 flex flex-col items-center justify-center">
                        <p>No transactions</p>
                    </div> : <div>
                        <TabsContent value="all" className="">
                            <AllTx logs={logs} />
                        </TabsContent>
                        <TabsContent value="payroll" className=" w-full flex flex-col gap-2">

                            {
                                logs.filter(log => log.title === "Payroll").map(log => {
                                    return <PayrollTx key={log.timestamp} title={`${log.subtitle} payroll`} date={formatDate(log.timestamp)} amount={Number(formatUnits(log.amount)).toLocaleString()} status={log.success ? "Completed" : "Failed"} token={getTokenName(log.token)} />
                                })
                            }
                            {/* payroll */}
                            {/* <PayrollTx title="Payment to contract employees" date="15th March, 24 at 10:30AM" amount="10,000" status="Completed" token="USDT" /> */}
                            {/* <PayrollTx title="Civil service payroll" date="30th Feburary, 24 at 8:30AM" amount="100,000" status="Failed" token="USDC" /> */}
                        </TabsContent>
                        <TabsContent value="walletfunding" className=" w-full flex flex-col gap-2">

                            {
                                logs.filter(log => log.title === "Fund").map(log => {
                                    return <WalletFundTx key={log.timestamp} title={`${getTokenName(log.token)} Wallet funding`} date="" amount={Number(formatUnits(log.amount)).toLocaleString()} status={log.success ? "Completed" : "Failed"} token={getTokenName(log.token)} />
                                })
                            }
                            {/* walletfunding */}
                            {/* <WalletFundTx title="USDT Wallet funding" date="10th Jun, 24 at 9:30AM" amount="1,000" status="In progress" token="USDT" /> */}
                            {/* <WalletFundTx title="USDC Wallet funding" date="20th April, 24 at 9:30AM" amount="10,000" status="Completed" token="USDC" /> */}
                        </TabsContent>
                        <TabsContent value="walletwithdrawal" className=" w-full flex flex-col gap-2">

                            {
                                logs.filter(log => log.title === "Withdraw").map(log => {
                                    return <WithdrawalTx key={log.timestamp} title={`Withdrawal from ${getTokenName(log.token)} wallet`} date="" amount={Number(formatUnits(log.amount)).toLocaleString()} status={log.success ? "Completed" : "Failed"} token={getTokenName(log.token)} />
                                })
                            }
                            {/* widthdrawal */}
                            {/* <WithdrawalTx title="Withdrawal from USDC wallet" date="9th Jan, 24 at 9:30AM" amount="500" status="Completed" token="USDC" /> */}
                        </TabsContent>
                    </div>}
                </Tabs>
            </main>
        </section>
    )
}

export default TxHistory