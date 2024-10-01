'use client'

import dynamic from 'next/dynamic'

import type { WalletError } from '@solana/wallet-adapter-base'
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { type ReactNode, useCallback, useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import './styles.css'

require('@solana/wallet-adapter-react-ui/styles.css')

export const WalletButton = dynamic(
    async () =>
        (await import('@solana/wallet-adapter-react-ui')).WalletModalButton,
    { ssr: false }
)

export function SolanaProvider({ children }: { children: ReactNode }) {
    const { cluster } = useCluster()
    const endpoint = useMemo(() => cluster.endpoint, [cluster])
    const onError = useCallback((error: WalletError) => {
        console.error(error)
    }, [])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider
                wallets={[]}
                onError={onError}
                autoConnect={true}
            >
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
