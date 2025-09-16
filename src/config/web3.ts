import { baseSepolia } from './chains'

// Web3 Configuration for Base Sepolia
export const web3Config = {
  chains: [baseSepolia],
  defaultChain: baseSepolia,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '', // Optional for now
} as const

// Faucet URLs for testnet tokens
export const FAUCETS = {
  BASE_ETH: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet',
  USDC: 'https://faucet.circle.com/', // Circle's USDC faucet
} as const

export const EXPLORERS = {
  BASE_SEPOLIA: 'https://sepolia-explorer.base.org',
} as const