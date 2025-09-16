const { Web3 } = require('web3');

// HAVEN token contract ABI (just the functions we need)
const HAVEN_ABI = [
  {
    "inputs": [{"name": "amount", "type": "uint256"}],
    "name": "fundFaucet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function fundFaucet() {
  const HAVEN_ADDRESS = "0x221154346A962771A87f7cE83D72A21296E140CA";
  const RPC_URL = "https://sepolia.base.org"; // Base Sepolia RPC
  
  // You'll need to set your private key as environment variable or enter it here
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  
  if (!PRIVATE_KEY) {
    console.error("Please set PRIVATE_KEY environment variable");
    console.log("Example: set PRIVATE_KEY=your_private_key_here");
    return;
  }

  try {
    const web3 = new Web3(RPC_URL);
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);

    console.log("Funding faucet from address:", account.address);

    const havenContract = new web3.eth.Contract(HAVEN_ABI, HAVEN_ADDRESS);

    // Check current balance
    const balance = await havenContract.methods.balanceOf(account.address).call();
    console.log(`Current balance: ${web3.utils.fromWei(balance, 'ether')} HAVEN`);

    // Amount to fund: 100,000 tokens (100000 * 10^18)
    const fundAmount = web3.utils.toWei('100000', 'ether');

    console.log(`Funding faucet with ${web3.utils.fromWei(fundAmount, 'ether')} HAVEN tokens...`);

    // Send transaction
    const tx = await havenContract.methods.fundFaucet(fundAmount).send({
      from: account.address,
      gas: 100000,
    });

    console.log("✅ Transaction successful!");
    console.log("Transaction hash:", tx.transactionHash);
    console.log("Block number:", tx.blockNumber);

    // Check contract balance
    const contractBalance = await havenContract.methods.balanceOf(HAVEN_ADDRESS).call();
    console.log(`Contract balance after funding: ${web3.utils.fromWei(contractBalance, 'ether')} HAVEN`);

  } catch (error) {
    console.error("Error:", error.message);
  }
}

fundFaucet();