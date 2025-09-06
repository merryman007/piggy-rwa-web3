'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Property } from '@/types';
import properties from '@/data/properties.json';

export default function PropertyDetail() {
  const params = useParams();
  const { wallet, connect } = useWallet();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('usdc');

  const property: Property | undefined = properties.find(
    (p) => p.id === parseInt(params.id as string)
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    // Mock purchase logic
    alert(`Successfully contributed $${contributionAmount} ${selectedCoin.toUpperCase()} to ${property.title}!`);
    setShowPurchaseModal(false);
    setContributionAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Property Hero */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="h-96 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-lg opacity-75">Property Image Gallery</p>
              </div>
            </div>
            {property.verified && (
              <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Blockchain Verified
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {property.status}
                </span>
                {property.verified && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
                  <p className="text-lg font-semibold text-gray-900">{property.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Size</h3>
                  <p className="text-lg font-semibold text-gray-900">{property.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Growth Potential</h3>
                  <p className="text-lg font-semibold text-green-600">{property.growthPotential}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Investment</h3>
                  <p className="text-lg font-semibold text-indigo-600">${property.price}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {wallet.connected ? (
                <div className="border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Details (Wallet Connected)</h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800">
                      <strong>Legal Documentation:</strong> This property comes with verified legal titles, 
                      surveyor reports, and government approvals. All documents are stored on IPFS and 
                      verified on-chain.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                      <strong>Investment Terms:</strong> Minimum investment of $1,000. Returns are distributed 
                      quarterly based on rental income and appreciation. Exit liquidity available after 12 months.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      <strong>Connect your wallet</strong> to view additional property details, legal documentation, 
                      and investment terms.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-indigo-600 mb-2">${property.price}</p>
                <p className="text-gray-600">Total Investment Required</p>
              </div>

              {wallet.connected ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPurchaseModal(true)}
                    className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
                  >
                    Pitch In
                  </button>
                  <button
                    onClick={() => setShowPurchaseModal(true)}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                  >
                    Purchase Outright
                  </button>
                  <div className="text-sm text-gray-600 text-center">
                    <p>Your Wallet Balance:</p>
                    <p>USDC: ${wallet.balance.usdc}</p>
                    <p>USDT: ${wallet.balance.usdt}</p>
                    <p>DAI: ${wallet.balance.dai}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={connect}
                    className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors mb-4"
                  >
                    Connect Wallet to Invest
                  </button>
                  <p className="text-sm text-gray-600">
                    Connect your wallet to unlock investment options and detailed property information.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-4">Investment Highlights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Minimum Investment</span>
                    <span className="text-sm font-semibold">$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expected Returns</span>
                    <span className="text-sm font-semibold text-green-600">15-22% annually</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Investment Period</span>
                    <span className="text-sm font-semibold">12+ months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Liquidity</span>
                    <span className="text-sm font-semibold">Quarterly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Modal */}
        {showPurchaseModal && wallet.connected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4">Invest in {property.title}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Stablecoin
                  </label>
                  <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
                    placeholder="Minimum $1,000"
                    min="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    Your investment will be secured by blockchain smart contracts and backed by legal property titles.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Confirm Investment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}