import { LogoTypes } from '@/types/guestpage'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from "react";


const Logo: FC<LogoTypes> = ({ className, image, href }) => {
    return (
        <Link href={href} className={className}>
            <Image src={image} alt="Logo" className='w-full' width={407} height={128} priority quality={100} />
        </Link>
    )
}

export default Logo