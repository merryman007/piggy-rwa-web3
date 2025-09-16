'use client';

import { useState } from 'react';
import { useWeb3 } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, ArrowSquareOut, Copy } from 'phosphor-react';
import { BASE_SEPOLIA_CONTRACTS } from '@/config/contracts';
import { FAUCETS } from '@/config/web3';

export default function TokenFaucet() {
  const { web3State, switchToBaseSepolia } = useWeb3();
  const [isClaimingHaven, setIsClaimingHaven] = useState(false);
  const [isFundingFaucet, setIsFundingFaucet] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const claimHavenTokens = async () => {
    if (!web3State.isConnected || !web3State.isCorrectNetwork || !window.ethereum) {
      return;
    }

    setIsClaimingHaven(true);
    try {
      // Call the faucet function on HAVEN contract
      const claimData = '0xfbbfb782'; // Function selector for claimFromFaucet()
      
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: web3State.address,
          to: BASE_SEPOLIA_CONTRACTS.HAVEN,
          data: claimData,
          gas: '0x186A0', // 100,000 gas
        }],
      });
      
      alert('HAVEN tokens claimed! Transaction submitted.');
    } catch (error) {
      console.error('Error claiming HAVEN tokens:', error);
      alert('Failed to claim HAVEN tokens. Make sure contract is deployed.');
    } finally {
      setIsClaimingHaven(false);
    }
  };

  const fundFaucet = async () => {
    if (!web3State.isConnected || !web3State.isCorrectNetwork || !window.ethereum) {
      return;
    }

    setIsFundingFaucet(true);
    try {
      // Encode fundFaucet(100000 * 10^18) call
      const fundAmount = '0x152d02c7e14af6800000'; // 100,000 tokens in hex
      const fundData = '0xae0140b4' + fundAmount.slice(2).padStart(64, '0'); // fundFaucet function selector + amount
      
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: web3State.address,
          to: BASE_SEPOLIA_CONTRACTS.HAVEN,
          data: fundData,
          gas: '0x186A0', // 100,000 gas
        }],
      });
      
      alert('Faucet funded with 100,000 HAVEN tokens! Transaction submitted.');
    } catch (error) {
      console.error('Error funding faucet:', error);
      alert('Failed to fund faucet. Make sure you own the contract.');
    } finally {
      setIsFundingFaucet(false);
    }
  };

  if (!web3State.isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Coins className="w-5 h-5 mr-2" />
            Testnet Token Faucet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Connect your wallet to claim testnet tokens for testing HavenFi features.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="w-5 h-5 mr-2" />
          Testnet Token Faucet
          {!web3State.isCorrectNetwork && (
            <Badge variant="destructive" className="ml-2">Wrong Network</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {!web3State.isCorrectNetwork && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-orange-800 mb-3">
              Please switch to Base Sepolia network to claim testnet tokens.
            </p>
            <Button onClick={switchToBaseSepolia} size="sm">
              Switch to Base Sepolia
            </Button>
          </div>
        )}

        {/* Base Sepolia ETH */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            Base Sepolia ETH
            <Badge className="ml-2 bg-blue-100 text-blue-800">Required for Gas</Badge>
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Get free Base Sepolia ETH for transaction fees
          </p>
          <div className="flex gap-2">
            <Button 
              asChild 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <a href={FAUCETS.BASE_ETH} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut className="w-4 h-4 mr-2" />
                Coinbase Faucet
              </a>
            </Button>
            <Button
              onClick={() => copyToClipboard(web3State.address || '')}
              variant="outline"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </Button>
          </div>
        </div>

        {/* Test USDC */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            Test USDC
            <Badge className="ml-2 bg-green-100 text-green-800">For Deposits</Badge>
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Get test USDC tokens for making deposits in HavenFi
          </p>
          <div className="text-xs text-gray-500 mb-3 font-mono">
            Contract: {BASE_SEPOLIA_CONTRACTS.USDC}
          </div>
          <div className="flex gap-2">
            <Button 
              asChild 
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <a href={FAUCETS.USDC} target="_blank" rel="noopener noreferrer">
                <ArrowSquareOut className="w-4 h-4 mr-2" />
                Circle Faucet
              </a>
            </Button>
            <Button
              onClick={() => copyToClipboard(BASE_SEPOLIA_CONTRACTS.USDC)}
              variant="outline"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Contract
            </Button>
          </div>
        </div>

        {/* HAVEN Tokens */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            HAVEN Tokens
            <Badge className="ml-2 bg-purple-100 text-purple-800">Access Tiers</Badge>
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Claim 1,000 HAVEN tokens to unlock premium features (24h cooldown)
          </p>
          <div className="text-xs text-gray-500 mb-3">
            <div className="font-mono mb-1">Contract: {BASE_SEPOLIA_CONTRACTS.HAVEN}</div>
            <div>• 999+ HAVEN = Standard Access</div>
            <div>• 4999+ HAVEN = Premium Access</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={claimHavenTokens}
              disabled={!web3State.isCorrectNetwork || isClaimingHaven || BASE_SEPOLIA_CONTRACTS.HAVEN === '0x0000000000000000000000000000000000000000'}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Coins className="w-4 h-4 mr-2" />
              {isClaimingHaven ? 'Claiming...' : 'Claim 1,000 HAVEN'}
            </Button>
            {web3State.isHavenOwner && (
              <Button
                onClick={fundFaucet}
                disabled={!web3State.isCorrectNetwork || isFundingFaucet || BASE_SEPOLIA_CONTRACTS.HAVEN === '0x0000000000000000000000000000000000000000'}
                size="sm"
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                {isFundingFaucet ? 'Funding...' : 'Fund Faucet (Owner)'}
              </Button>
            )}
            {BASE_SEPOLIA_CONTRACTS.HAVEN === '0x0000000000000000000000000000000000000000' && (
              <Badge variant="outline" className="text-orange-600">
                Deploy HAVEN contract first
              </Badge>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Need help? Check our <a href="/docs" className="text-primary hover:underline">documentation</a></p>
        </div>
      </CardContent>
    </Card>
  );
}