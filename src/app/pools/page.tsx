'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Pool } from '@/types';
import pools from '@/data/pools.json';

export default function LiquidityPools() {
  const { wallet, connect, hasHavenAccess } = useWallet();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('usdc');

  const typedPools: Pool[] = pools;

  const handleJoinPool = (pool: Pool) => {
    setSelectedPool(pool);
    setShowJoinModal(true);
  };

  const confirmJoinPool = () => {
    if (!selectedPool || !contributionAmount) return;
    
    // Mock join pool logic
    alert(`Successfully accessed ${selectedPool.title} with $${contributionAmount} ${selectedCoin.toUpperCase()}!`);
    setShowJoinModal(false);
    setContributionAmount('');
    setSelectedPool(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Liquidity Pools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access shared liquidity opportunities for tokenized real estate assets. 
            Participate in collective access to verified property opportunities.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">5</div>
              <div className="text-gray-600">Active Pools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">137</div>
              <div className="text-gray-600">Total Participants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$534K</div>
              <div className="text-gray-600">Total Pooled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">19%</div>
              <div className="text-gray-600">Avg Pool Growth</div>
            </div>
          </div>
        </div>

        {/* Pools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {typedPools.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              onJoin={() => handleJoinPool(pool)}
              isWalletConnected={wallet.connected}
              onConnect={connect}
            />
          ))}
        </div>

        {/* Access Pool Modal */}
        {showJoinModal && selectedPool && wallet.connected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Access {selectedPool.title}</h3>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Pool Progress</span>
                  <span className="text-sm font-semibold">{selectedPool.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${selectedPool.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>${selectedPool.currentAmount} raised</span>
                  <span>${selectedPool.targetAmount} goal</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Stablecoin
                  </label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  >
                    <option value="usdc">USDC (Balance: ${wallet.balance.usdc})</option>
                    <option value="usdt">USDT (Balance: ${wallet.balance.usdt})</option>
                    <option value="dai">DAI (Balance: ${wallet.balance.dai})</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contribution Amount ($)
                  </label>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    placeholder={`Minimum $${selectedPool.minContribution}`}
                    min={selectedPool.minContribution}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum contribution: ${selectedPool.minContribution}
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    You'll own a proportional share of {selectedPool.targetProperty} 
                    based on your contribution percentage.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmJoinPool}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Access Pool
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PoolCardProps {
  pool: Pool;
  onJoin: () => void;
  isWalletConnected: boolean;
  onConnect: () => void;
}

function PoolCard({ pool, onJoin, isWalletConnected, onConnect }: PoolCardProps) {
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getTimeRemainingColor = (days: string) => {
    const numDays = parseInt(days);
    if (numDays <= 7) return 'text-red-600';
    if (numDays <= 14) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{pool.title}</h3>
            <p className="text-sm text-gray-600">{pool.targetProperty}</p>
          </div>
          {pool.verified && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Pool Progress</span>
            <span className="text-sm font-semibold">{pool.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${getProgressColor(pool.progress)}`}
              style={{ width: `${pool.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${pool.currentAmount} raised</span>
            <span>${pool.targetAmount} goal</span>
          </div>
        </div>

        {/* Pool Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-600">{pool.participants}</div>
            <div className="text-xs text-gray-600">Participants</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getTimeRemainingColor(pool.timeRemaining)}`}>
              {pool.timeRemaining}
            </div>
            <div className="text-xs text-gray-600">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">${pool.minContribution}</div>
            <div className="text-xs text-gray-600">Min Entry</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pool.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pool.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
          {pool.features.length > 3 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              +{pool.features.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        {isWalletConnected ? (
          <button
            onClick={onJoin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Access Pool
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Connect Wallet to Access
          </button>
        )}
      </div>
    </div>
  );
}