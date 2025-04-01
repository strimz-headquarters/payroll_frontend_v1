'use client'
import { InfinitySpin } from "react-loader-spinner"

const Preloader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen z-[9999] bg-[#F9FAFB] flex justify-center items-center">
            <InfinitySpin
                width="200"
                color="#02C76A"
            />
        </div>
    )
}

export default Preloader