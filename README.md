# CryptoFundHub 🪙
A decentralized crowdfunding platform built on Ethereum using Solidity, Thirdweb, and Next.js.

---

## 📌 Introduction
CryptoFundHub is a decentralized crowdfunding platform designed to provide a transparent, trustless, and secure alternative to traditional fundraising systems. By leveraging Ethereum smart contracts, the platform removes intermediaries and ensures that campaign rules are enforced automatically and immutably on-chain.

Campaign creators can launch funding campaigns directly on the blockchain, while contributors can fund projects using Ether (ETH) via their crypto wallets. All transactions, contributions, and withdrawals are governed by verifiable smart contract logic.

---

## 🎯 Key Goals
- Ensure full transparency in fund collection and distribution
- Enable trustless campaign creation and participation
- Restrict withdrawals strictly to campaign creators
- Allow global participation without centralized intermediaries

---

## 📄 Project Summary
CryptoFundHub is built on the Ethereum Sepolia testnet using Solidity smart contracts and integrates the Thirdweb SDK for Web3 tooling. It enables users to securely contribute ETH to crowdfunding campaigns while enforcing predefined funding rules such as tier-based contributions, deadlines, and campaign states.

Each campaign is deployed as a separate smart contract, ensuring isolation of funds and contributors. The platform automatically manages campaign lifecycles, supports refunds for failed campaigns, and allows withdrawals only when funding goals are met.

The system is modular, extensible, and designed as a foundation for future features such as analytics dashboards, NFT-based rewards, and multi-chain support.

---

## 🚀 Features

### 🔹 Campaign Creation
- Users can create crowdfunding campaigns with:
  - Name and description
  - Funding goal
  - Campaign duration (in days)
- Each campaign is deployed as an independent smart contract via a factory pattern.

### 🔹 Tier-Based Funding
- Campaign owners can define multiple funding tiers.
- Each tier has a fixed ETH contribution amount.
- Backers must fund the exact tier amount.

### 🔹 Campaign Lifecycle Management
Campaigns transition automatically between states:
- **Active** – Campaign is ongoing
- **Successful** – Funding goal reached
- **Failed** – Deadline passed without reaching goal

### 🔹 Secure Withdrawals
- Only campaign creators can withdraw funds.
- Withdrawals are allowed only after a campaign is marked successful.

### 🔹 Refund System
- If a campaign fails, contributors can claim refunds.
- Refunds are calculated based on total contributions per backer.

### 🔹 Emergency Controls
- Campaign owners can pause or resume campaigns.
- Factory owner can pause campaign creation globally.

---

## 🏗 Smart Contract Architecture

### 📄 CrowdfundingFactory.sol
- Deploys new crowdfunding campaigns.
- Stores all campaigns and user-specific campaigns.
- Supports global pause functionality.

### 📄 Crowdfunding.sol
Handles:
- Campaign metadata (name, description, goal, deadline)
- Tier management (add/remove tiers)
- Funding logic and backer tracking
- Campaign state updates
- Secure withdrawals and refunds
- Emergency pause and deadline extension

Each campaign is deployed as an isolated contract, ensuring separation of funds and contributors.

---

## 🔐 Security Considerations
- Solidity ^0.8.x with built-in overflow protection
- Strict access control using `onlyOwner`
- Campaign state validation before withdrawals and refunds
- Emergency pause functionality for risk mitigation
- On-chain enforcement of funding rules

---

## 🖥 Frontend Overview
The frontend is built using **Next.js** and **React**, styled with **Tailwind CSS** and **DaisyUI**, and integrated with the blockchain via the **Thirdweb SDK**.

Key frontend features:
- Wallet connection using MetaMask (Thirdweb ConnectButton)
- Campaign dashboard and cards with real-time blockchain data
- Modal-based campaign creation
- Tier-based donation UI
- Owner-specific withdrawal controls

The frontend abstracts complex blockchain interactions into a simple, user-friendly interface while maintaining full decentralization.

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- DaisyUI

### Blockchain
- Solidity
- Ethereum Sepolia Testnet

### Web3 & Tooling
- Thirdweb SDK (React, Deploy, Contract Calls)
- MetaMask

### Development Tools
- Foundry (Forge)
- Hardhat (optional)
- Git & GitHub

---

## 📦 Installation & Deployment

### Prerequisites
- Node.js
- Thirdweb CLI

### Install Dependencies
```bash
npm install

### 📈 Future Enhancements

- ERC20-based funding

- NFT or tokenized reward tiers

- Campaign analytics dashboard

- Multi-chain deployment

- Donor history and profile pages