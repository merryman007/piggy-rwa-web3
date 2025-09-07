'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';

export default function Header() {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-white/95 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span>HavenFi</span>
            </Link>
            <nav className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200">
                Vault
              </Link>
              <Link href="/properties" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200">
                Opportunities
              </Link>
              <Link href="/pools" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-200">
                Liquidity Pools
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {wallet.connected ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
                  <div className="text-xs text-gray-500">
                    HAVEN: {wallet.havenTokens} | USDC: ${wallet.balance.usdc}
                  </div>
                </div>
                <button
                  onClick={disconnect}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}