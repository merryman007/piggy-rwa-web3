# PiggyRWA - Web3 Savings and Real Estate Platform

A prototype Web3 application that allows users to save in stablecoins and invest in real estate assets across African markets.

## Features

- **Landing Page**: Clean hero section with "Save in Stablecoins. Own Real Assets." headline
- **Savings Dashboard**: Create and manage savings goals with stablecoin locking
- **Property Listings**: Browse verified real estate opportunities in developing countries
- **Property Details**: Detailed property information with blockchain verification badges
- **Community Pools**: Join group investments to collectively purchase properties
- **Mock Wallet Integration**: Simulated Web3 wallet connection with USDC, USDT, and DAI balances

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API
- **Data**: Static JSON files for properties and pools
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd piggy-rwa-web3
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Savings dashboard
│   ├── properties/        # Property listings and details
│   ├── pools/            # Community pools
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/            # Reusable components
│   └── Header.tsx        # Navigation header
├── context/              # React context providers
│   └── WalletContext.tsx # Mock wallet state management
├── data/                 # Static data files
│   ├── properties.json  # Property listings data
│   └── pools.json       # Community pools data
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types
```

## Key Features

### Savings Dashboard
- Create savings goals with target amounts and dates
- Lock stablecoins (USDC, USDT, DAI) toward goals
- Track progress with visual progress bars
- Persistent storage using localStorage

### Property Listings
- Grid view of available properties across African markets
- Filter by location, price, type, and status
- Blockchain verification badges
- Growth potential indicators

### Property Details
- Comprehensive property information
- Investment terms and legal documentation (wallet-gated)
- Direct investment and "Pitch In" options
- Mock blockchain verification status

### Community Pools
- Group savings pools for high-value properties
- Real-time progress tracking
- Minimum contribution requirements
- Participant count and time remaining

### Mock Wallet Integration
- Simulated Web3 wallet connection
- Mock stablecoin balances (USDC, USDT, DAI)
- Persistent wallet state
- Connect/disconnect functionality

## Sample Data

The application includes sample data for:
- 6 verified properties across Ghana, Nigeria, Kenya, Uganda, and Rwanda
- 5 community investment pools
- Mock wallet balances and transactions

## Deployment

This project is configured for easy deployment on Vercel:

1. Push to GitHub repository
2. Connect repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. No environment variables required for basic functionality

## Future Enhancements

- Real blockchain integration (Ethereum, Polygon)
- Actual stablecoin transactions
- IPFS document storage
- Smart contract integration
- KYC/AML compliance
- Multi-signature wallet support
- Real property management integration

## License

MIT License - see LICENSE file for details
