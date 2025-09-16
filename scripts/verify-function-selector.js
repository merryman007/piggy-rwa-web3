const { Web3 } = require('web3');

function getFunctionSelector(signature) {
  const web3 = new Web3();
  const hash = web3.utils.keccak256(signature);
  return hash.substring(0, 10);
}

console.log("=== Function Selectors ===");
console.log("claimFromFaucet():", getFunctionSelector("claimFromFaucet()"));
console.log("fundFaucet(uint256):", getFunctionSelector("fundFaucet(uint256)"));
console.log();
console.log("Current selectors in code:");
console.log("Claim selector: 0x4e71d92d");
console.log("Fund selector: 0xa96a2cca");
console.log();

// Check if they match
const correctClaimSelector = getFunctionSelector("claimFromFaucet()");
const correctFundSelector = getFunctionSelector("fundFaucet(uint256)");

console.log("=== Verification ===");
console.log("Claim selector correct:", "0x4e71d92d" === correctClaimSelector);
console.log("Fund selector correct:", "0xa96a2cca" === correctFundSelector);