'use client'
import Link from 'next/link';
import {
    LogOut,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RxCaretDown } from 'react-icons/rx';
import { PiUserCircleLight } from "react-icons/pi";
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { MdOutlinePayment } from "react-icons/md";
import { useRouter } from 'next/navigation';


const UserDropdown: React.FC = () => {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("strimzUser");
        router.push("/login")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none focus:border-none' asChild>
                <button type="button" className="bg-[#F3F4F6] p-[8px] flex justify-center items-center gap-[8px] text-[#58556A] rounded-[12px]">
                    <PiUserCircleLight className='w-[24px] h-[24px]' />
                    <RxCaretDown className='w-[24px] h-[24px]' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-[#58556A] w-44 z-[100] mr-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/user/account">
                            <User />
                            <span>Profile Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/user/account/plan">
                            <MdOutlinePayment />
                            <span>Plans and billing</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/user/settings">
                            <IoIosHelpCircleOutline />
                            <span>Help</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <button onClick={handleLogout} className='w-full text-[#9B1C1C]'>
                        <LogOut />
                        <span>Sign out</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
