const { ethers } = require("hardhat");

async function main() {
  const havenAddress = "0x221154346A962771A87f7cE83D72A21296E140CA";
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Funding faucet with account:", deployer.address);

  // Get the HAVEN token contract
  const HavenToken = await ethers.getContractFactory("HavenToken");
  const haven = HavenToken.attach(havenAddress);

  // Amount to fund (100,000 tokens = 100,000 * 10^18)
  const fundAmount = ethers.parseEther("100000");

  console.log(`Funding faucet with ${ethers.formatEther(fundAmount)} HAVEN tokens...`);

  try {
    // Check deployer balance first
    const deployerBalance = await haven.balanceOf(deployer.address);
    console.log(`Deployer balance: ${ethers.formatEther(deployerBalance)} HAVEN`);

    if (deployerBalance < fundAmount) {
      console.error("Insufficient balance to fund faucet");
      return;
    }

    // Call fundFaucet function
    const tx = await haven.fundFaucet(fundAmount);
    console.log("Transaction hash:", tx.hash);
    
    // Wait for transaction confirmation
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);

    // Check contract balance after funding
    const contractBalance = await haven.balanceOf(havenAddress);
    console.log(`Contract balance after funding: ${ethers.formatEther(contractBalance)} HAVEN`);
    
    console.log("✅ Faucet funded successfully!");
  } catch (error) {
    console.error("Error funding faucet:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });