'use client';

import Link from 'next/link';
import { useWallet } from '@/context/WalletContext';

export default function Header() {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              PiggyRWA
            </Link>
            <nav className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/properties" className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Properties
              </Link>
              <Link href="/pools" className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Community Pools
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {wallet.connected ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
                  <div className="text-xs text-gray-500">
                    USDC: ${wallet.balance.usdc} | USDT: ${wallet.balance.usdt}
                  </div>
                </div>
                <button
                  onClick={disconnect}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
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