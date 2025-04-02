import Image from 'next/image'
import { motion } from 'framer-motion';
import React from 'react'
import worldMapPattern from '@/public/patterns/world-map-dotted.png'
import strimzVector from '@/public/logoIcons/StrimzVector.svg'
import user1 from "@/public/images/1.png"
import user2 from "@/public/images/2.png"
import user3 from "@/public/images/3.png"
import user4 from "@/public/images/4.png"
import usdcIcon from '@/public/icons/usdc.png';
import usdtIcon from '@/public/icons/usdt.png';

const WorldMapWithAnimatedOverlay = () => {
    return (
        <main className="w-full max-w-5xl mx-auto relative">
            <Image src={worldMapPattern} alt="World Map" className='w-full md:h-[544px] h-[304px] object-cover' width={4392} height={2176} priority quality={100} />

            {/* Overlaying Elements */}
            {/* Strimz Logo (Center) */}
            <span className='absolute lg:top-[25%] md:top-[30%] top-[30%] left-1/2 z-20 -translate-x-1/2 flex lg:w-[90px] lg:h-[90px] md:w-[70px] md:h-[70px] w-[50px] h-[50px]'>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-85" />
                <Image src={strimzVector} alt='logo' className='w-full h-full' width={120} height={120} priority quality={100} />
            </span>

            {/* User Images */}
            <Image src={user1} alt='user' className='absolute top-[4%] left-[3%] md:w-[120px] w-[60px]' width={120} height={161} priority quality={100} />

            <Image src={user2} alt='user' className='absolute top-[4%] right-[3%] md:w-[120px] w-[60px]' width={120} height={161} priority quality={100} />

            <Image src={user3} alt='user' className='absolute bottom-[2%] left-[12%] md:w-[120px] w-[60px]' width={120} height={161} priority quality={100} />

            <Image src={user4} alt='user' className='absolute bottom-[2%] right-[12%] md:w-[120px] w-[60px]' width={120} height={161} priority quality={100} />

            {/* SVG Paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 544">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L6,3 L0,6" fill="#00FF00" />
                    </marker>
                </defs>

                {/* Paths */}
                <path id="path1" d="M500,200 Q420,100 200,90" stroke="#00FF00" strokeWidth="2" strokeDasharray="8,8" markerEnd="url(#arrowhead)" fill="transparent" />
                <path id="path2" d="M500,200 Q580,100 800,90" stroke="#00FF00" strokeWidth="2" strokeDasharray="8,8" markerEnd="url(#arrowhead)" fill="transparent" />
                <path id="path3" d="M470,180 Q320,200 300,320 Q280,370 260,380" stroke="#00FF00" strokeWidth="2" strokeDasharray="8,8" markerEnd="url(#arrowhead)" fill="transparent" />
                <path id="path4" d="M530,180 Q680,200 700,320 Q720,370 740,380" stroke="#00FF00" strokeWidth="2" strokeDasharray="8,8" markerEnd="url(#arrowhead)" fill="transparent" />
            </svg>

            {/* Animated Icons */}
            <div className="absolute inset-0 lg:block hidden">
                {/* USDC on Path 1 */}
                <motion.div
                    className="absolute w-[30px] h-[30px]"
                    style={{ offsetPath: 'path("M500,200 Q420,100 200,90")', offsetRotate: 'auto' }}
                    initial={{ offsetDistance: '0%', opacity: 1 }}
                    animate={{ offsetDistance: '100%', opacity: [1, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                    <Image src={usdcIcon} alt="usdc" width={30} height={30} />
                </motion.div>

                {/* USDC on Path 3 */}
                <motion.div
                    className="absolute w-[30px] h-[30px]"
                    style={{ offsetPath: 'path("M470,180 Q320,200 300,320 Q280,370 260,380")', offsetRotate: 'auto' }}
                    initial={{ offsetDistance: '0%', opacity: 1 }}
                    animate={{ offsetDistance: '100%', opacity: [1, 1, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                >
                    <Image src={usdcIcon} alt="usdc" width={30} height={30} />
                </motion.div>

                {/* USDT on Path 2 */}
                <motion.div
                    className="absolute w-[30px] h-[30px]"
                    style={{ offsetPath: 'path("M500,200 Q580,100 800,90")', offsetRotate: 'auto' }}
                    initial={{ offsetDistance: '0%', opacity: 1 }}
                    animate={{ offsetDistance: '100%', opacity: [1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                    <Image src={usdtIcon} alt="usdt" width={30} height={30} />
                </motion.div>

                {/* USDT on Path 4 */}
                <motion.div
                    className="absolute w-[30px] h-[30px]"
                    style={{ offsetPath: 'path("M530,180 Q680,200 700,320 Q720,370 740,380")', offsetRotate: 'auto' }}
                    initial={{ offsetDistance: '0%', opacity: 1 }}
                    animate={{ offsetDistance: '100%', opacity: [1, 1, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                >
                    <Image src={usdtIcon} alt="usdt" width={30} height={30} />
                </motion.div>
            </div>

        </main>
    )
}

export default WorldMapWithAnimatedOverlay