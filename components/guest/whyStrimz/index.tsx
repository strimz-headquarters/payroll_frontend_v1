import React from 'react'
import { Element } from 'react-scroll'
import PayAnyone from './payAnyone'
import StablePayment from './stablePay'
import SaveTime from './saveTime'

/**
 * Renders the Benefits section of the page, highlighting the advantages of choosing Strimz.
 * 
 * This section is wrapped in a scrollable Element with the name "benefits".
 * It includes a heading and three main components:
 * - PayAnyone: Emphasizes the ability to pay anyone, anywhere, instantly.
 * - StablePayment: Highlights the stability of using stablecoin payments.
 * - SaveTime: Focuses on saving time and offering flexible payroll options.
 * 
 * The section is styled to be fully responsive and centered, with padding adjustments for large screens.
 */

const Benefits = () => {
    return (
        <Element name="benefits" >
            <section className="w-full lg:py-28 py-20 flex flex-col px-4">
                <h1 className='text-primary md:text-[40px] text-[32px] font-[700] font-sora text-center mb-8'>Why choose Strimz</h1>

                <main className='w-full max-w-[1200px] mx-auto space-y-10'>
                    {/* pay anyone... */}
                    <PayAnyone />
                    {/* stable pay */}
                    <StablePayment />
                    {/* save time & flexible payroll */}
                    <SaveTime />
                </main>
            </section>
        </Element>
    )
}

export default Benefits