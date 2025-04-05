'use client'
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
import { CiBookmark } from "react-icons/ci"
import { FaCheck } from "react-icons/fa"

/**
 * Cancel
 *
 * Cancel a subscription
 *
 * @returns An AlertDialog with a button triggering it, and the actual content of the dialog
 */
const Cancel = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    type="button"
                    className={`w-[102px] h-[32px] flex justify-center items-center bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB] shadow-[0px_-2px_4px_0px_#00000014_inset] cursor-pointer text-[12px] font-[500] font-poppins text-primary`}
                >
                    Cancel plan
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="w-full flex items-center gap-2">
                        <span className="w-[40px] h-[40px] flex justify-center items-center bg-white border-[0.5px] border-[#E5E7EB] shadow-[0px_1px_2px_0px_#00000014] rounded-full">
                            <CiBookmark className="w-4 h-4 text-primary" />
                        </span>
                        <span className="text-black font-[500] font-sora capitalize text-sm ">Cancel subscription?</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="w-full">
                        <div className="w-full flex flex-col">
                            <h4 className="text-sm text-primary font-[500]">You&apos;re about to cancel your subscription. Here&apos;s what you&apos;ll lose:</h4>
                            <ul className="w-full mt-6 list-none flex flex-col items-start gap-2 transition-all duration-200 text-[#58556A]">
                                <li className="w-full flex items-start gap-2 text-xs font-[400] font-poppins">
                                    <FaCheck className="w-3 h-3 mt-[1.5px]" />
                                    <span className="flex-1">Stream token to 20 recipients only</span>
                                </li>
                                <li className="w-full flex items-start gap-2 text-xs font-[400] font-poppins">
                                    <FaCheck className="w-3 h-3 mt-[1.5px]" />
                                    <span className="flex-1">Access to detailed analytics</span>
                                </li>
                                <li className="w-full flex items-start gap-2 text-xs font-[400] font-poppins">
                                    <FaCheck className="w-3 h-3 mt-[1.5px]" />
                                    <span className="flex-1">Priority support and enhanced functionality for subscription automation</span>
                                </li>
                            </ul>
                            <p className="text-sm text-[#58556A] mt-4 font-[400] font-poppins">Your current subscription is valid until 10th September, 2024. Are you sure you want to proceed?</p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep my subscription</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#FDF2F2] hover:bg-[#FDF2F2] text-[#9B1C1C]">Continue to cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Cancel