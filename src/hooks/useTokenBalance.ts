import { useState, useEffect } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { BASE_SEPOLIA_CONTRACTS, ERC20_ABI } from '@/config/contracts';

export function useTokenBalance(tokenAddress: string, tokenSymbol: string) {
  const { web3State } = useWeb3();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!web3State.isConnected || !web3State.address || !web3State.isCorrectNetwork || !window.ethereum) {
      setBalance('0');
      return;
    }

    fetchBalance();
  }, [web3State.isConnected, web3State.address, web3State.isCorrectNetwork, tokenAddress]);

  const fetchBalance = async () => {
    if (!web3State.address || !window.ethereum) return;

    setIsLoading(true);
    try {
      // Create contract call data for balanceOf
      const balanceOfData = encodeFunctionCall('balanceOf', ['address'], [web3State.address]);
      
      const result = await window.ethereum.request({
        method: 'eth_call',
        params: [{
          to: tokenAddress,
          data: balanceOfData
        }, 'latest']
      });

      // Parse the result (it's a hex string representing uint256)
      const balanceWei = BigInt(result);
      const balanceFormatted = (Number(balanceWei) / 1e6).toFixed(2); // USDC has 6 decimals
      
      setBalance(balanceFormatted);
    } catch (error) {
      console.error(`Error fetching ${tokenSymbol} balance:`, error);
      setBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  return { balance, isLoading, refetch: fetchBalance };
}

// Helper function to encode function calls (simplified)
function encodeFunctionCall(functionName: string, types: string[], values: any[]): string {
  // This is a simplified encoder - in production you'd use a proper library
  // For balanceOf(address), the signature is: 0x70a08231
  if (functionName === 'balanceOf') {
    const signature = '0x70a08231';
    const paddedAddress = values[0].toLowerCase().replace('0x', '').padStart(64, '0');
    return signature + paddedAddress;
  }
  return '0x';
}

export function useUSDCBalance() {
  return useTokenBalance(BASE_SEPOLIA_CONTRACTS.USDC, 'USDC');
}

export function useHavenBalance() {
  return useTokenBalance(BASE_SEPOLIA_CONTRACTS.HAVEN, 'HAVEN');
}