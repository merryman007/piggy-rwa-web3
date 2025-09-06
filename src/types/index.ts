export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  growthPotential: string;
  status: string;
  image: string;
  description: string;
  size: string;
  verified: boolean;
  features: string[];
}

export interface Pool {
  id: number;
  title: string;
  targetProperty: string;
  targetAmount: string;
  currentAmount: string;
  participants: number;
  timeRemaining: string;
  minContribution: string;
  description: string;
  progress: number;
  verified: boolean;
  features: string[];
}

export interface SavingsGoal {
  id: number;
  title: string;
  targetAmount: string;
  currentAmount: string;
  targetDate: string;
  propertyId?: number;
  locked: boolean;
  progress: number;
}

export interface WalletState {
  connected: boolean;
  address?: string;
  balance: {
    usdc: string;
    usdt: string;
    dai: string;
  };
}