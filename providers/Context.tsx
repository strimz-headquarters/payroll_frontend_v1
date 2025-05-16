'use client'

import { wagmiAdapter, projectId } from '@/config'
import { createAppKit } from '@reown/appkit/react'
import { baseSepolia } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import ReactQueryProvider from './ReactQueryProvider'


if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: 'Strimz Payroll',
    description: 'Strimz Payroll is a DeFi payroll solution designed to automate crypto-based salary disbursements, offering secure, seamless, and efficient financial management for businesses and individuals.',
    url: 'https://strimz-payroll.vercel.app', // origin must match your domain & subdomain
    icons: ['/favicon-32x32.png']
}

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [baseSepolia],
    defaultNetwork: baseSepolia,
    metadata: metadata,
    defaultAccountTypes: { eip155: "eoa" },
    features: {
        analytics: true,
        socials: false,
        swaps: true,
        onramp: true,
        email: false,
    },
    themeMode: 'light',
    themeVariables: {
        "--w3m-accent": "#02C76A",
        "--w3m-border-radius-master": "1px",
        "--w3m-font-size-master": "9px",
        "--w3m-z-index": 9999,
    },
})


/**
 * A higher-order component that wraps your application with the
 * necessary Wagmi and React Query providers.
 *
 * @param {{ children: ReactNode; cookies: string | null; }} props
 * @param {ReactNode} props.children The children to be rendered within the context.
 * @param {string | null} props.cookies The stringified cookies to use for initializing the context.
 * @returns {JSX.Element} The wrapped children with the necessary providers.
 */
function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </WagmiProvider>
    )
}

export default ContextProvider