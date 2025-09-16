const { Web3 } = require('web3');

const HAVEN_ABI = [
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "canClaimFromFaucet",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "timeUntilNextClaim",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "", "type": "address"}],
    "name": "hasClaimedFaucet",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "", "type": "address"}],
    "name": "lastFaucetClaim",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function testClaim() {
  const HAVEN_ADDRESS = "0x221154346A962771A87f7cE83D72A21296E140CA";
  const USER_ADDRESS = "0xE88C79913F82759e72EeA3489F3b5b9dA5C91804";
  const RPC_URL = "https://sepolia.base.org";
  
  try {
    const web3 = new Web3(RPC_URL);
    const havenContract = new web3.eth.Contract(HAVEN_ABI, HAVEN_ADDRESS);

    console.log("=== Checking Claim Eligibility ===");
    console.log("User:", USER_ADDRESS);
    console.log();

    const canClaim = await havenContract.methods.canClaimFromFaucet(USER_ADDRESS).call();
    console.log("Can claim from faucet:", canClaim);

    const hasClaimedBefore = await havenContract.methods.hasClaimedFaucet(USER_ADDRESS).call();
    console.log("Has claimed before:", hasClaimedBefore);

    const lastClaim = await havenContract.methods.lastFaucetClaim(USER_ADDRESS).call();
    console.log("Last claim timestamp:", lastClaim);

    const timeUntilNext = await havenContract.methods.timeUntilNextClaim(USER_ADDRESS).call();
    console.log("Time until next claim (seconds):", timeUntilNext);

    if (timeUntilNext > 0) {
      const hours = Math.floor(Number(timeUntilNext) / 3600);
      const minutes = Math.floor((Number(timeUntilNext) % 3600) / 60);
      console.log(`Time until next claim: ${hours}h ${minutes}m`);
    }

    console.log();
    console.log("=== Diagnosis ===");
    if (!canClaim) {
      if (hasClaimedBefore && timeUntilNext > 0) {
        console.log("❌ COOLDOWN: You must wait 24 hours between claims");
      } else {
        console.log("❌ UNKNOWN: Cannot claim for unknown reason");
      }
    } else {
      console.log("✅ User can claim from faucet");
      console.log("The issue might be:");
      console.log("- Gas limit too low");
      console.log("- Network issues");
      console.log("- Wrong function selector");
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
}

testClaim();