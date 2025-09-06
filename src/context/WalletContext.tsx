'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletState } from '@/types';

interface WalletContextType {
  wallet: WalletState;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    balance: {
      usdc: '0',
      usdt: '0',
      dai: '0'
    }
  });

  const connect = () => {
    // Mock wallet connection with random address and balances
    const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
    const mockBalances = {
      usdc: (Math.random() * 10000).toFixed(2),
      usdt: (Math.random() * 8000).toFixed(2),
      dai: (Math.random() * 5000).toFixed(2)
    };

    setWallet({
      connected: true,
      address: mockAddress,
      balance: mockBalances
    });

    // Store in localStorage to persist
    localStorage.setItem('walletConnected', 'true');
    localStorage.setItem('walletAddress', mockAddress);
    localStorage.setItem('walletBalance', JSON.stringify(mockBalances));
  };

  const disconnect = () => {
    setWallet({
      connected: false,
      balance: {
        usdc: '0',
        usdt: '0',
        dai: '0'
      }
    });

    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
  };

  // Restore wallet state from localStorage on mount
  useEffect(() => {
    const connected = localStorage.getItem('walletConnected') === 'true';
    if (connected) {
      const address = localStorage.getItem('walletAddress');
      const balance = localStorage.getItem('walletBalance');
      
      if (address && balance) {
        setWallet({
          connected: true,
          address,
          balance: JSON.parse(balance)
        });
      }
    }
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect }}>
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