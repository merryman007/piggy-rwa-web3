// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title HavenToken
 * @dev Test HAVEN token for Base Sepolia testnet
 * This is a simple ERC-20 token for gating features in the HavenFi platform
 * For testnet use only - production token will be different
 */
contract HavenToken is ERC20, Ownable, Pausable {
    uint256 public constant TOTAL_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public constant FAUCET_AMOUNT = 1000 * 10**18; // 1000 tokens per faucet claim
    
    mapping(address => bool) public hasClaimedFaucet;
    mapping(address => uint256) public lastFaucetClaim;
    uint256 public constant FAUCET_COOLDOWN = 24 hours;
    
    event FaucetClaim(address indexed user, uint256 amount);
    
    constructor() ERC20("Haven Token (Test)", "HAVEN") Ownable(msg.sender) {
        // Mint initial supply to deployer
        _mint(msg.sender, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Faucet function for testnet - allows users to claim test tokens
     */
    function claimFromFaucet() external whenNotPaused {
        require(
            !hasClaimedFaucet[msg.sender] || 
            block.timestamp >= lastFaucetClaim[msg.sender] + FAUCET_COOLDOWN,
            "Faucet cooldown active"
        );
        
        require(balanceOf(address(this)) >= FAUCET_AMOUNT, "Faucet empty");
        
        hasClaimedFaucet[msg.sender] = true;
        lastFaucetClaim[msg.sender] = block.timestamp;
        
        _transfer(address(this), msg.sender, FAUCET_AMOUNT);
        
        emit FaucetClaim(msg.sender, FAUCET_AMOUNT);
    }
    
    /**
     * @dev Owner can fund the faucet
     */
    function fundFaucet(uint256 amount) external onlyOwner {
        _transfer(msg.sender, address(this), amount);
    }
    
    /**
     * @dev Emergency pause function
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause function
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Check if user can claim from faucet
     */
    function canClaimFromFaucet(address user) external view returns (bool) {
        if (!hasClaimedFaucet[user]) return true;
        return block.timestamp >= lastFaucetClaim[user] + FAUCET_COOLDOWN;
    }
    
    /**
     * @dev Get time until next faucet claim
     */
    function timeUntilNextClaim(address user) external view returns (uint256) {
        if (!hasClaimedFaucet[user]) return 0;
        uint256 nextClaim = lastFaucetClaim[user] + FAUCET_COOLDOWN;
        if (block.timestamp >= nextClaim) return 0;
        return nextClaim - block.timestamp;
    }
}