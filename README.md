# Strimz Payroll - Web3 Native Payroll Automation

[![Strimz Banner](https://strimz-payroll.vercel.app/favicon-32x32.png)](https://strimz-payroll.vercel.app)


**Enterprise-grade DeFi payroll solution with automated crypto disbursements and seamless web2 onboarding**

> "Financial operations reimagined for the blockchain era"

## 🌟 Features

### Core Capabilities

- 🧑💻 **Web2-style UX** with Web3 power (Account Abstraction powered)
- 💸 **Crypto(stablecoins) payroll** (USDC/USDT on Celo)
- 📦 **Diamond Standard Proxy** for seamless contract upgrades
- 📈 **Progressive fee structure** (Pay-per-use model)
- 🔄 **Bulk payment processing** (CSV or manual entry)
- ⚡ **Gas-optimized transactions**

## 🛠 Tech Stack

| Layer                | Technologies                                                                 |
|----------------------|------------------------------------------------------------------------------|
| **Frontend**         | Next.js 14, TypeScript, Wagmi, Shadcn UI, Radix UI                           |
| **Backend**          | Node.js, Express, PostgreSQL, Redis (Session Management)                     |
| **Blockchain**       | Celo, USDC/USDT Token Standards                                      |
| **Smart Contracts**  | Solidity 0.8.20, Diamond Standard (ERC-2535), Foundry, OpenZeppelin          |

## 📦 Contract Architecture

```mermaid
graph TD
    A[Diamond Proxy] --> B[DiamondCutFacet]
    A --> C[DiamondLoupeFacet]
    A --> D[OwnershipFacet]
    A --> E[PayrollFacet]
    A --> F[PayrollFactoryFacet]
    
    B --> G[Upgrade Management]
    C --> H[Introspection Functions]
    D --> I[Ownership & Access Control]
    E --> J[Payment Processing]
    E --> K[Fee Calculations]
    F --> L[Payroll Deployment]
    F --> M[Template Management]
    
    style A fill:#4CAF50,stroke:#388E3C
    style B fill:#2196F3,stroke:#1976D2
    style C fill:#2196F3,stroke:#1976D2
    style D fill:#9C27B0,stroke:#7B1FA2
    style E fill:#FF9800,stroke:#F57C00
    style F fill:#FF9800,stroke:#F57C00
    
    classDef standard fill:#2196F3,stroke:#1976D2;
    classDef security fill:#9C27B0,stroke:#7B1FA2;
    classDef payroll fill:#FF9800,stroke:#F57C00;
    
    class B,C standard
    class D security
    class E,F payroll
```

## 💸 Fee Structure Model

**Mathematical Model:**

```math
Total Fee = Base Fee (0.30 USD) + Variable Fee (0.15 × √N)
```

**Example Calculations:**

| Addresses | Calculation         | Total Fee |
|-----------|---------------------|-----------|
| 1         | 0.30 + (0.15 × 1)   | $0.45     |
| 5         | 0.30 + (0.15 × 2.24)| $0.64     |
| 20        | 0.30 + (0.15 × 4.47)| $0.97     |
| 100       | 0.30 + (0.15 × 10)  | $1.80     |

*Economies of scale: 2× addresses = ~40% fee increase*

## 🔗 Smart Contract Verification

- **Diamond Proxy:** [0xF61F...b7ae](https://louper.dev/diamond/0xf61f16ec212c7d7fd08c0776d0429477a235b7ae?network=baseSepolia)
- **USDC Contract:** Celo Network
- **USDT Contract:** Celo Network

## 🌐 API Documentation

[![Postman Docs](https://img.shields.io/badge/Postman-API_Docs-orange)](https://documenter.getpostman.com/view/17877618/2sAYQZGrQc#intro)

## 🔄 Workflow Process

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Blockchain

    User->>Frontend: 1. Register/Login (AA)
    Frontend->>Backend: 2. Create Web3 Account
    Backend->>Blockchain: 3. Deploy AA Wallet
    User->>Frontend: 4. Fund Account (USDC/USDT)
    User->>Frontend: 5. Create Payroll (CSV/Manual)
    Frontend->>Backend: 6. Validate Entries
    Backend->>Blockchain: 7. Calculate Fees
    Blockchain->>Backend: 8. Fee Estimate
    Backend->>User: 9. Payment Approval
    User->>Blockchain: 10. Confirm Transaction
    Blockchain->>All: 11. Distribute Funds
```

## 🙏 Acknowledgements

- **Celo Network** for EVM-optimized infrastructure
- **OpenZeppelin** for battle-tested contract libraries
- **EIP-2535** Diamond Standard community
- **AA Community** for account abstraction pioneers
