'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { baseSepolia } from '@/config/chains';
import { BASE_SEPOLIA_CONTRACTS } from '@/config/contracts';

// Extend Window interface for ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

interface Web3State {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  balance?: {
    eth: string;
    usdc: string;
    haven: string;
  };
  isCorrectNetwork: boolean;
  isHavenOwner?: boolean;
}

interface Web3ContextType {
  web3State: Web3State;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchToBaseSepolia: () => Promise<void>;
  refreshBalances: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    isCorrectNetwork: false,
  });

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      if (accounts.length > 0) {
        const address = accounts[0];
        const isCorrectNetwork = parseInt(chainId, 16) === baseSepolia.id;
        
        setWeb3State(prev => ({
          ...prev,
          isConnected: true,
          address,
          chainId: parseInt(chainId, 16),
          isCorrectNetwork,
        }));

        // Fetch balances if connected to correct network
        if (isCorrectNetwork) {
          await fetchBalances(address);
          await checkOwnership(address);
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const connect = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask to connect your wallet!');
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const address = accounts[0];
      const isCorrectNetwork = parseInt(chainId, 16) === baseSepolia.id;

      setWeb3State(prev => ({
        ...prev,
        isConnected: true,
        address,
        chainId: parseInt(chainId, 16),
        isCorrectNetwork,
      }));

      // If not on Base Sepolia, prompt to switch
      if (!isCorrectNetwork) {
        await switchToBaseSepolia();
      } else {
        await fetchBalances(address);
        await checkOwnership(address);
      }

      // Listen for account and network changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = () => {
    setWeb3State({
      isConnected: false,
      isCorrectNetwork: false,
    });

    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const switchToBaseSepolia = async () => {
    if (!window.ethereum) return;

    try {
      // Try to switch to Base Sepolia
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${baseSepolia.id.toString(16)}` }],
      });
    } catch (switchError: any) {
      // If Base Sepolia is not added to wallet, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${baseSepolia.id.toString(16)}`,
                chainName: baseSepolia.name,
                nativeCurrency: baseSepolia.nativeCurrency,
                rpcUrls: baseSepolia.rpcUrls.default.http,
                blockExplorerUrls: [baseSepolia.blockExplorers.default.url],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Base Sepolia network:', addError);
        }
      } else {
        console.error('Error switching to Base Sepolia:', switchError);
      }
    }
  };

  const fetchBalances = async (address: string) => {
    if (!window.ethereum) return;

    try {
      // Fetch ETH balance
      const ethBalance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      
      const ethBalanceFormatted = (parseInt(ethBalance, 16) / 1e18).toFixed(4);

      // Fetch HAVEN token balance
      let havenBalance = '0';
      try {
        const havenBalanceData = encodeFunctionCall('balanceOf', address);
        const havenResult = await window.ethereum.request({
          method: 'eth_call',
          params: [{
            to: BASE_SEPOLIA_CONTRACTS.HAVEN,
            data: havenBalanceData
          }, 'latest']
        });
        
        const havenBalanceWei = BigInt(havenResult);
        havenBalance = (Number(havenBalanceWei) / 1e18).toFixed(0); // HAVEN has 18 decimals, show as whole number
      } catch (havenError) {
        console.warn('Could not fetch HAVEN balance:', havenError);
      }

      // Fetch USDC balance
      let usdcBalance = '0.00';
      try {
        const usdcBalanceData = encodeFunctionCall('balanceOf', address);
        const usdcResult = await window.ethereum.request({
          method: 'eth_call',
          params: [{
            to: BASE_SEPOLIA_CONTRACTS.USDC,
            data: usdcBalanceData
          }, 'latest']
        });
        
        const usdcBalanceWei = BigInt(usdcResult);
        usdcBalance = (Number(usdcBalanceWei) / 1e6).toFixed(2); // USDC has 6 decimals
      } catch (usdcError) {
        console.warn('Could not fetch USDC balance:', usdcError);
      }

      setWeb3State(prev => ({
        ...prev,
        balance: {
          eth: ethBalanceFormatted,
          usdc: usdcBalance,
          haven: havenBalance,
        },
      }));
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  // Helper function to encode ERC-20 balanceOf calls
  const checkOwnership = async (address: string) => {
    if (!window.ethereum) return;

    try {
      // Call owner() function on HAVEN contract
      const ownerData = '0x8da5cb5b'; // owner() function signature
      const ownerResult = await window.ethereum.request({
        method: 'eth_call',
        params: [{
          to: BASE_SEPOLIA_CONTRACTS.HAVEN,
          data: ownerData
        }, 'latest']
      });

      // Decode the owner address from the result
      const ownerAddress = '0x' + ownerResult.slice(-40);
      const isOwner = ownerAddress.toLowerCase() === address.toLowerCase();

      setWeb3State(prev => ({
        ...prev,
        isHavenOwner: isOwner,
      }));
    } catch (error) {
      console.warn('Could not check HAVEN ownership:', error);
      setWeb3State(prev => ({
        ...prev,
        isHavenOwner: false,
      }));
    }
  };

  const encodeFunctionCall = (functionName: string, address: string): string => {
    if (functionName === 'balanceOf') {
      const signature = '0x70a08231'; // balanceOf(address) function signature
      const paddedAddress = address.toLowerCase().replace('0x', '').padStart(64, '0');
      return signature + paddedAddress;
    }
    return '0x';
  };

  const refreshBalances = async () => {
    if (web3State.address) {
      await fetchBalances(web3State.address);
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnect();
    } else {
      setWeb3State(prev => ({
        ...prev,
        address: accounts[0],
      }));
      fetchBalances(accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    const newChainId = parseInt(chainId, 16);
    const isCorrectNetwork = newChainId === baseSepolia.id;
    
    setWeb3State(prev => ({
      ...prev,
      chainId: newChainId,
      isCorrectNetwork,
    }));

    if (isCorrectNetwork && web3State.address) {
      fetchBalances(web3State.address);
      checkOwnership(web3State.address);
    }
  };

  return (
    <Web3Context.Provider value={{ 
      web3State, 
      connect, 
      disconnect, 
      switchToBaseSepolia, 
      refreshBalances 
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}