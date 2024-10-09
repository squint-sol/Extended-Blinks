import './global.css'
import LogoIcon from 'components/icons/logo-icon'
import { Orbitron } from 'next/font/google'
import GlobalProvider from 'providers/global-provider'
import { WalletButton } from 'providers/solana-provider/solana-provider'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { SocialIcon } from 'react-social-icons'

export const metadata = {
    title: 'crct',
    description: 'Generated by create-solana-dapp',
}

const links: { label: string; path: string }[] = [
    { label: 'Account', path: '/account' },
    { label: 'Clusters', path: '/clusters' },
]

const orbitron = Orbitron({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={orbitron.className}>
                <GlobalProvider>
                    <div className="flex min-h-full flex-col bg-[#1E1E1E]">
                        <div className="navbar bg-base-300 text-neutral-content border-light-white flex flex-row items-center justify-between rounded-xl border-2 border-solid px-2 py-2 md:px-10">
                            <LogoIcon />
                            <WalletButton />
                        </div>
                        <div className="flex grow animate-fadeInUp flex-col justify-evenly px-5 pt-5 md:w-full">
                            <Suspense
                                fallback={
                                    <div className="my-32 text-center">
                                        <span className="loading loading-spinner loading-lg" />
                                    </div>
                                }
                            >
                                {children}
                            </Suspense>
                            <Toaster position="bottom-right" />
                        </div>
                        <footer className="flex h-[70px] justify-center">
                            <SocialIcon
                                url="https://x.com"
                                href="https://x.com/crct_xyz/"
                                target="_blank"
                            />
                        </footer>
                    </div>
                </GlobalProvider>
            </body>
        </html>
    )
}
