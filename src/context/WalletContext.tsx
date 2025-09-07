'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletState } from '@/types';

interface WalletContextType {
  wallet: WalletState;
  connect: () => void;
  disconnect: () => void;
  hasHavenAccess: (level: string) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    balance: {
      usdc: '0',
      usdt: '0',
      dai: '0'
    },
    havenTokens: '0'
  });

  const connect = () => {
    // Mock wallet connection with random address and balances
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    const mockBalances = {
      usdc: (Math.random() * 10000).toFixed(2),
      usdt: (Math.random() * 8000).toFixed(2),
      dai: (Math.random() * 5000).toFixed(2)
    };
    // Generate random HAVEN tokens with different access levels for testing
    const rand = Math.random();
    let mockHavenTokens;
    if (rand < 0.3) {
      // 30% chance: Low tokens (0-99) - No access
      mockHavenTokens = (Math.random() * 99).toFixed(0);
    } else if (rand < 0.7) {
      // 40% chance: Standard tokens (100-999) - HAVEN Standard access only
      mockHavenTokens = (Math.random() * 899 + 100).toFixed(0);
    } else {
      // 30% chance: Premium tokens (1000+) - HAVEN Premium access
      mockHavenTokens = (Math.random() * 1000 + 1000).toFixed(0);
    }

    setWallet({
      connected: true,
      address: mockAddress,
      balance: mockBalances,
      havenTokens: mockHavenTokens
    });

    // Store in localStorage to persist
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('walletAddress', mockAddress);
    localStorage.setItem('walletBalance', JSON.stringify(mockBalances));
    localStorage.setItem('havenTokens', mockHavenTokens);
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      balance: {
        usdc: '0',
        usdt: '0',
        dai: '0'
      },
      havenTokens: '0'
    });

    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('havenTokens');
  };

  // Restore wallet state from localStorage on mount
  useEffect(() => {
    const connected = localStorage.getItem('walletConnected') === 'true';
    if (connected) {
      const address = localStorage.getItem('walletAddress');
      const balance = localStorage.getItem('walletBalance');
      const havenTokens = localStorage.getItem('havenTokens') || '0';
      
      if (address && balance) {
        setWallet({
          connected: true,
          address,
          balance: JSON.parse(balance),
          havenTokens
        });
      }
    }
  }, []);

  const hasHavenAccess = (level: string) => {
    const havenBalance = parseFloat(wallet.havenTokens);
    switch (level) {
      case 'HAVEN Standard':
        return havenBalance >= 100;
      case 'HAVEN Premium':
        return havenBalance >= 1000;
      default:
        return true;
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, hasHavenAccess }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}