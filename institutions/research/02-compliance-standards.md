# Deep Dive: Compliance Standards & Tokenization Infrastructure

How compliance is enforced at the contract layer — the substrate every RWA initiative builds on, and the layer EthSystems must interoperate with (compliance rules enforced cryptographically instead of via public whitelists).

---

## ERC-3643 (T-REX) — the dominant permissioned-token standard

**What it is:** an extension of ERC-20 for permissioned security tokens, originated by Tokeny as the T-REX protocol (Token for Regulated EXchanges). $32B+ tokenized with it across 180+ jurisdictions.

**Architecture (four moving parts):**

1. **ONCHAINID** — decentralized on-chain identities for investors, holding cryptographic **claims** issued by trusted parties (KYC providers, regulators). The identity, not the wallet, is the unit of compliance.
2. **Identity Registry** — maps wallets to ONCHAINIDs and verifies participants; only verified identities can hold/transfer the token.
3. **Compliance contract with modular rules** — composable modules restricting transfers by country, investor type, holding period, max holder count, or custom conditions.
4. **Transfer flow** — on every `transfer`, the token queries the compliance manager, which inspects claims and rules; non-compliant transfers **revert**. Issuers retain recovery/freeze powers.

**Institutional traction:** DTCC joined the ERC3643 Association (March 2025) and is integrating the standard into its **ComposerX** platform; members include Apex Group, Invesco, Franklin Templeton, Fasanara. SEC Chairman Paul Atkins cited ERC-3643 by name (July 2025) in the context of an innovation-exemption framework. ISO standardization is underway.

**Privacy relevance:** ERC-3643 puts identity claims and eligibility **on-chain in the clear** — the registry reveals who is allowed to hold what, and all balances/transfers remain public. A ZK-native equivalent (prove "I hold a valid KYC claim from an approved issuer and am not sanctioned" without revealing which identity) is the obvious evolution and squarely in EthSystems' territory.

- **Sources:** [ERC3643 docs — Identity Registry](https://docs.erc3643.org/erc-3643/smart-contracts-library/onchain-identities/identity-registry) · [Tokeny ERC3643](https://tokeny.com/erc3643/) · [Chainalysis intro](https://www.chainalysis.com/blog/introduction-to-erc-3643-ethereum-rwa-token-standard/) · [QuillAudits explainer](https://www.quillaudits.com/blog/rwa/erc-3643-explained) · [Ledger Insights — DTCC joins](https://www.ledgerinsights.com/dtcc-joins-rwa-tokenization-body-erc3643/) · [ERC3643 Association](https://www.erc3643.org)

## Other standards in use

| Standard | Model | Used by |
|---|---|---|
| Permissioned ERC-20 + off-chain registry | transfer-agent-controlled whitelist; simplest | Securitize (BUIDL), most treasury products |
| ERC-1400 | partitioned security tokens with transfer restrictions | Polymath lineage |
| ERC-4626 | tokenized vault shares (yield-bearing wrapper) | Centrifuge pools, DeFi integrations |
| ERC-3643 | identity-registry + modular compliance | Tokeny issuances, DTCC ComposerX, 100+ issuers |

## Securitize — the incumbent full-stack model

- SEC-registered **transfer agent + broker-dealer** under one roof; issuance platform for BlackRock (BUIDL), Apollo (ACRED), Hamilton Lane, KKR.
- $4B+ tokenized, 580k investor accounts; chains: Ethereum, Base, Arbitrum, Avalanche, Plume, BNB, Optimism.
- Compliance model: off-chain KYC → on-chain whitelist administration; Securitize signs cross-chain share movements.
- **Privacy relevance:** the transfer agent sees everything and the chain publishes everything; institutional clients accept this today because volumes are still "crypto-adjacent" capital.
- **Sources:** [Eco platform comparison](https://eco.com/support/en/articles/15254028-best-tokenized-rwa-platforms-2026-securitize-ondo-backed-centrifuge-compared) · [Securitize](https://securitize.io)

## DTCC — ComposerX and the SEC no-action pilot

- The largest US clearinghouse (quadrillions in annual settlement). Two tracks:
  1. **ComposerX** — its tokenization platform, integrating ERC-3643 (ComposerX Factory = tokenization engine).
  2. **Tokenization pilot** — three-year program under an **SEC no-action letter (Dec 2025)** allowing DTC-custodied assets to be tokenized on approved blockchains; rollout began H2 2026. This is the bridge for the entire US securities complex to touch public chains.
- **Sources:** [crypto.news — DTCC joins ERC-3643](https://crypto.news/dtcc-joins-erc-3643-association-to-advance-ethereum-based-tokenized-securities/) · [InvesTax Q1 2026 report](https://investax.io/blog/q1-2026-real-world-asset-tokenization-market-report) · [CoinsPaid Media](https://coinspaidmedia.com/news/dtcc-supports-development-erc-3643-tokenization-standard/)

## Takeaway for EthSystems prep

Today's compliance stack = **public whitelists + off-chain trust in a transfer agent**. It works, but (a) reveals holder sets and eligibility, (b) doesn't scale to open DeFi composability without leaking institutional positions, and (c) forces every issuer to run its own registry. The pitch EthSystems makes — compliance enforced *inside* zero-knowledge proofs (AML thresholds, sanctions screening) with amounts/counterparties hidden — is the direct successor to this architecture. Knowing ERC-3643's exact flow (identity registry → compliance module → revert) lets you articulate precisely where a ZK claim-verification would slot in.
