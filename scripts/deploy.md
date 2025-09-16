# Base Sepolia Deployment Guide

## Prerequisites

1. **Get Base Sepolia ETH**
   - Visit: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
   - Connect your wallet and claim testnet ETH for gas fees

2. **Get Test USDC**
   - Use Circle's testnet faucet: https://faucet.circle.com/
   - Or use the Base Sepolia USDC contract: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

## Deployment Steps

### 1. Deploy HAVEN Token

**Option A: Using Remix IDE**
1. Go to https://remix.ethereum.org/
2. Upload the `HavenToken.sol` file
3. Install OpenZeppelin dependencies:
   ```
   npm install @openzeppelin/contracts
   ```
4. Compile the contract
5. Switch to Base Sepolia network in MetaMask
6. Deploy using the "Deploy & Run Transactions" tab

**Option B: Using Hardhat (Advanced)**
```bash
# Install dependencies
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

# Create hardhat.config.js
# Add Base Sepolia network configuration
# Deploy script would go here
```

### 2. Update Contract Addresses

After deployment, update the addresses in:
- `src/config/contracts.ts`
- Update the `HAVEN` address with your deployed contract

### 3. Fund the Faucet

1. Call `fundFaucet(amount)` on your deployed HAVEN contract
2. Transfer some HAVEN tokens to the contract for the faucet

### 4. Test Integration

1. Connect wallet to your app
2. Switch to Base Sepolia network
3. Test token balance fetching
4. Test faucet functionality

## Contract Addresses (Update After Deployment)

- **HAVEN Token**: `0x0000000000000000000000000000000000000000` (Update me!)
- **Base Sepolia USDC**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e` (Verified)

## Testing Commands

```bash
# Start development server
npm run dev

# Test Web3 connection
# 1. Open browser dev console
# 2. Connect wallet
# 3. Switch to Base Sepolia
# 4. Check console for connection logs
```

## Next Steps

1. Deploy HAVEN token contract
2. Create community pools contract
3. Add stablecoin deposit/withdraw functionality
4. Implement savings vault mechanics