import { FaqsTypes } from "@/types/guestpage";

export const allfaqs: FaqsTypes[] = [
  {
    question: "What is Strimz, and how does it work?",
    answer:
      "Strimz is a decentralized finance (DeFi) payroll solution that automates crypto-based salary disbursements. It allows businesses and individuals to stream salaries directly to recipients' wallets on a set schedule (daily, weekly, or monthly). You simply upload a CSV file with wallet addresses and amounts, and Strimz handles the rest using smart contracts and decentralized relayers for secure, automated transactions.",
  },
  {
    question: "Who can use Strimz for payroll automation?",
    answer:
      "Strimz is designed for startups, DAOs, freelancers, and any organization or individual looking to pay their team in cryptocurrency. Whether you're a small business owner or managing a decentralized team across the globe, Strimz simplifies payroll with crypto.",
  },
  {
    question: "How secure is Strimz for handling payroll?",
    answer:
      "Strimz leverages blockchain technology and audited smart contracts to ensure secure transactions. User data, such as CSV files, is stored on decentralized storage solutions like IPFS or Arweave, making it tamper-proof and highly available. Additionally, Web3 authentication ensures only authorized users can access the platform.",
  },
  {
    question: "What cryptocurrencies does Strimz support for payroll?",
    answer:
      "Strimz supports a variety of cryptocurrencies for payroll, including popular stablecoins like USDC and USDT, as well as other tokens on supported blockchains. Check our documentation for the full list of supported tokens and networks.",
  },
  {
    question: "Can I pay multiple recipients at once with Strimz?",
    answer:
      "Yes! Strimz allows you to upload a CSV file with multiple wallet addresses and amounts, enabling you to pay your entire team in one go. The Free Plan supports streaming to one recipient, while paid plans (Bronze, Silver, and Gold) unlock higher recipient limits and additional features.",
  },
  {
    question: "What are the different subscription plans offered by Strimz?",
    answer:
      "Strimz offers four plans: a Free Plan (stream to one recipient), Bronze Plan (increased recipient limit and basic analytics), Silver Plan (advanced analytics and priority support), and Gold Plan (unlimited streaming, premium support, and full access to all features). You can upgrade your plan at any time to unlock more functionality.",
  },
  {
    question: "Is Strimz easy to use for people new to Web3?",
    answer:
      "Absolutely! Strimz implements account abstraction to simplify wallet management, making it easy for Web2 users to onboard. You can authenticate using popular wallet providers, and our intuitive interface guides you through the payroll setup process step-by-step.",
  },
];
