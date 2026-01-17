# CryptoFundHub 🪙  
A decentralized crowdfunding platform built on Ethereum using Solidity and thirdweb.

## 📌 Overview
CryptoFundHub is a blockchain-based crowdfunding system that allows users to create and fund campaigns in a decentralized, trustless manner. Each campaign is deployed as a separate smart contract, ensuring transparency, security, and full ownership control for campaign creators.

The platform supports tier-based funding, automatic campaign state management, refunds for failed campaigns, and secure withdrawals for successful ones.

---

## 🚀 Features

### 🔹 Campaign Creation
- Users can create crowdfunding campaigns with:
  - Campaign name and description
  - Funding goal
  - Deadline (in days)
- Each campaign is deployed as an independent smart contract using a factory pattern.

### 🔹 Tier-Based Funding
- Campaign owners can create multiple funding tiers.
- Backers must fund the exact tier amount.
- Tier backer count is tracked on-chain.

### 🔹 Campaign Lifecycle Management
Campaigns automatically transition between states:
- **Active** – Campaign is ongoing
- **Successful** – Funding goal reached
- **Failed** – Deadline passed without reaching goal

### 🔹 Secure Withdrawals
- Campaign owners can withdraw funds **only if the campaign is successful**.
- Withdrawal is protected by ownership and state checks.

### 🔹 Refund Mechanism
- If a campaign fails, backers can securely claim refunds.
- Refunds are calculated based on total contribution per backer.

### 🔹 Emergency Controls
- Campaign owners can pause/unpause campaigns.
- Factory owner can pause campaign creation globally.

---

## 🏗 Smart Contract Architecture

### 📄 CrowdfundingFactory.sol
- Deploys new crowdfunding campaigns.
- Stores:
  - All campaigns
  - User-specific campaigns
- Can be paused by the factory owner.

### 📄 Crowdfunding.sol
Handles:
- Campaign metadata (name, description, goal, deadline)
- Tier creation and removal
- Funding logic
- Campaign state updates
- Withdrawals and refunds
- Emergency pause functionality

---

## 🔐 Security Considerations
- Solidity ^0.8.x (built-in overflow protection)
- Strict access control using `onlyOwner`
- Campaign state validation before withdrawals/refunds
- Refund protection against double withdrawals
- Emergency pause support

---

## 🛠 Tech Stack
- **Solidity** (^0.8.x)
- **Ethereum / EVM-compatible chains**
- **thirdweb SDK**
- **Foundry-compatible structure**

---

## 📦 Installation & Deployment

### Prerequisites
- Node.js
- thirdweb CLI

### Install Dependencies
```bash
npm install
