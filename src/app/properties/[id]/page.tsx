'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useWallet } from '@/context/WalletContext';
import { Property } from '@/types';
import properties from '@/data/properties.json';

export default function PropertyDetail() {
  const params = useParams();
  const { wallet, connect, hasHavenAccess } = useWallet();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('usdc');

  const property: Property | undefined = properties.find(
    (p) => p.id === parseInt(params.id as string)
  );

  // Debug logging
  if (property && wallet.connected) {
    console.log('🏠 Property:', property.title);
    console.log('🔒 Property Access Level:', property.accessLevel);
    console.log('💰 User HAVEN Tokens:', wallet.havenTokens);
    console.log('✅ Has Access:', hasHavenAccess(property.accessLevel));
  }

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
          <div className="h-96 relative overflow-hidden">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
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
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Access Level</h3>
                  <p className="text-lg font-semibold text-blue-600">{property.accessLevel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Investment</h3>
                  <p className="text-lg font-semibold text-blue-600">${property.price}</p>
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
                      <strong>Access Terms:</strong> Verified access to tokenized asset opportunities. 
                      Full transparency with on-chain documentation and legal compliance.
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
                <p className="text-3xl font-bold text-blue-600 mb-2">${property.price}</p>
                <p className="text-gray-600">Asset Value</p>
                {!hasHavenAccess(property.accessLevel) && (
                  <div className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                    🔒 Requires {property.accessLevel} access
                  </div>
                )}
              </div>

              {wallet.connected ? (
                <div className="space-y-4">
                  {hasHavenAccess(property.accessLevel) ? (
                    <>
                      <button
                        onClick={() => setShowPurchaseModal(true)}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                      >
                        Add to Vault
                      </button>
                      <button
                        onClick={() => setShowPurchaseModal(true)}
                        className="w-full bg-slate-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-colors"
                      >
                        Full Access
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800 text-sm font-medium mb-2">🔒 Access Restricted</p>
                        <p className="text-amber-700 text-sm">You need {property.accessLevel} to access this opportunity</p>
                      </div>
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-semibold text-lg cursor-not-allowed"
                      >
                        Requires HAVEN Tokens
                      </button>
                    </div>
                  )}
                  <div className="text-sm text-gray-600 text-center">
                    <p>Your Wallet Balance:</p>
                    <p>HAVEN: {wallet.havenTokens}</p>
                    <p>USDC: ${wallet.balance.usdc}</p>
                    <p>USDT: ${wallet.balance.usdt}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={connect}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
                  >
                    Connect Wallet to Access
                  </button>
                  <p className="text-sm text-gray-600">
                    Connect your wallet to unlock access options and detailed asset information.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-4">Access Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Minimum Access</span>
                    <span className="text-sm font-semibold text-gray-900">$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Asset Transparency</span>
                    <span className="text-sm font-semibold text-green-600">100% Verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Access Period</span>
                    <span className="text-sm font-semibold text-gray-900">Flexible</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Documentation</span>
                    <span className="text-sm font-semibold text-gray-900">On-Chain</span>
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
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Access {property.title}</h3>
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
                    placeholder="Enter amount" style={{color: 'rgb(17, 24, 39)'}}
                    min="1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
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
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Confirm Access
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}