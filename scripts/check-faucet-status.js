const { Web3 } = require('web3');

const HAVEN_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function checkFaucetStatus() {
  const HAVEN_ADDRESS = "0x221154346A962771A87f7cE83D72A21296E140CA";
  const DEPLOYER_ADDRESS = "0xE88C79913F82759e72EeA3489F3b5b9dA5C91804";
  const RPC_URL = "https://sepolia.base.org";
  
  try {
    const web3 = new Web3(RPC_URL);
    const havenContract = new web3.eth.Contract(HAVEN_ABI, HAVEN_ADDRESS);

    console.log("=== HAVEN Token Faucet Status ===");
    console.log("Contract:", HAVEN_ADDRESS);
    console.log("Deployer:", DEPLOYER_ADDRESS);
    console.log();

    // Check deployer balance
    const deployerBalance = await havenContract.methods.balanceOf(DEPLOYER_ADDRESS).call();
    console.log(`Deployer balance: ${web3.utils.fromWei(deployerBalance, 'ether')} HAVEN`);

    // Check contract balance (faucet balance)
    const contractBalance = await havenContract.methods.balanceOf(HAVEN_ADDRESS).call();
    console.log(`Contract balance: ${web3.utils.fromWei(contractBalance, 'ether')} HAVEN`);

    // Check contract owner
    const owner = await havenContract.methods.owner().call();
    console.log(`Contract owner: ${owner}`);
    console.log(`Is deployer the owner? ${owner.toLowerCase() === DEPLOYER_ADDRESS.toLowerCase()}`);

    // Check if contract is paused
    const isPaused = await havenContract.methods.paused().call();
    console.log(`Contract paused: ${isPaused}`);

    console.log();
    console.log("=== Diagnosis ===");
    
    if (deployerBalance === '0') {
      console.log("❌ PROBLEM: Deployer has 0 HAVEN tokens!");
      console.log("   Solution: The contract minted all tokens to the deployer initially.");
      console.log("   Check if tokens were transferred elsewhere or if deployment failed.");
    } else {
      console.log(`✅ Deployer has ${web3.utils.fromWei(deployerBalance, 'ether')} HAVEN tokens`);
    }

    if (owner.toLowerCase() !== DEPLOYER_ADDRESS.toLowerCase()) {
      console.log("❌ PROBLEM: Deployer is not the contract owner!");
      console.log(`   Only the owner (${owner}) can fund the faucet.`);
    } else {
      console.log("✅ Deployer is the contract owner");
    }

    if (isPaused) {
      console.log("❌ PROBLEM: Contract is paused!");
      console.log("   Unpause the contract first.");
    } else {
      console.log("✅ Contract is not paused");
    }

    if (contractBalance === '0') {
      console.log("⚠️  Contract faucet balance is 0 - needs funding");
    } else {
      console.log(`✅ Contract has ${web3.utils.fromWei(contractBalance, 'ether')} HAVEN for faucet`);
    }

  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkFaucetStatus();