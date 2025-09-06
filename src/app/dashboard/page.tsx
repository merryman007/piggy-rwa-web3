'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { SavingsGoal } from '@/types';

export default function Dashboard() {
  const { wallet, connect } = useWallet();
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    stablecoin: 'usdc'
  });

  // Load saved goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('savingsGoals');
    if (savedGoals) {
      setSavingsGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.targetDate) return;

    const goal: SavingsGoal = {
      id: Date.now(),
      title: newGoal.title,
      targetAmount: newGoal.targetAmount,
      currentAmount: '0',
      targetDate: newGoal.targetDate,
      locked: false,
      progress: 0
    };

    setSavingsGoals([...savingsGoals, goal]);
    setNewGoal({ title: '', targetAmount: '', targetDate: '', stablecoin: 'usdc' });
    setShowCreateGoal(false);
  };

  const handleLockFunds = (goalId: number, amount: string) => {
    setSavingsGoals(goals =>
      goals.map(goal => {
        if (goal.id === goalId) {
          const newCurrentAmount = (parseFloat(goal.currentAmount) + parseFloat(amount)).toString();
          const progress = Math.round((parseFloat(newCurrentAmount) / parseFloat(goal.targetAmount)) * 100);
          return {
            ...goal,
            currentAmount: newCurrentAmount,
            locked: true,
            progress: Math.min(progress, 100)
          };
        }
        return goal;
      })
    );
  };

  if (!wallet.connected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-8">
            Connect your wallet to start creating savings goals and tracking your progress.
          </p>
          <button
            onClick={connect}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Savings Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your savings goals and property investments</p>
        </div>

        {/* Wallet Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">USDC Balance</h3>
            <p className="text-3xl font-bold text-blue-600">${wallet.balance.usdc}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">USDT Balance</h3>
            <p className="text-3xl font-bold text-green-600">${wallet.balance.usdt}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">DAI Balance</h3>
            <p className="text-3xl font-bold text-purple-600">${wallet.balance.dai}</p>
          </div>
        </div>

        {/* Savings Goals Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Savings Goals</h2>
          <button
            onClick={() => setShowCreateGoal(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Create New Goal
          </button>
        </div>

        {/* Savings Goals Grid */}
        {savingsGoals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg mb-4">No savings goals yet</p>
            <button
              onClick={() => setShowCreateGoal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onLockFunds={handleLockFunds}
                walletBalance={wallet.balance}
              />
            ))}
          </div>
        )}

        {/* Create Goal Modal */}
        {showCreateGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-2xl font-bold mb-4">Create Savings Goal</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="e.g., Buy Land in Accra"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Amount ($)
                  </label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    placeholder="25000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowCreateGoal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGoal}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface GoalCardProps {
  goal: SavingsGoal;
  onLockFunds: (goalId: number, amount: string) => void;
  walletBalance: { usdc: string; usdt: string; dai: string };
}

function GoalCard({ goal, onLockFunds, walletBalance }: GoalCardProps) {
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockAmount, setLockAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('usdc');

  const handleLockFunds = () => {
    if (!lockAmount) return;
    onLockFunds(goal.id, lockAmount);
    setLockAmount('');
    setShowLockModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{goal.title}</h3>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Current:</span>
            <span className="font-semibold">${goal.currentAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Target:</span>
            <span className="font-semibold">${goal.targetAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Target Date:</span>
            <span className="font-semibold">{new Date(goal.targetDate).toLocaleDateString()}</span>
          </div>
        </div>
        <button
          onClick={() => setShowLockModal(true)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Lock Funds
        </button>
      </div>

      {/* Lock Funds Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-4">Lock Funds for {goal.title}</h3>
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
                  <option value="usdc">USDC (Balance: ${walletBalance.usdc})</option>
                  <option value="usdt">USDT (Balance: ${walletBalance.usdt})</option>
                  <option value="dai">DAI (Balance: ${walletBalance.dai})</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Lock ($)
                </label>
                <input
                  type="number"
                  value={lockAmount}
                  onChange={(e) => setLockAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowLockModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLockFunds}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Lock Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}