# Deep Dive: The Institutional Privacy Landscape (EthSystems' Arena)

The category the whole catalog converges on: RWAs prove demand; confidentiality is the acknowledged blocker; this is the competitive/technology map.

---

## EthSystems (the target organization)

- **Origin:** for-profit spinout of the **Ethereum Foundation's Institutional Privacy Task Force (IPTF)** — the EF unit that "advises, designs, and ships vendor-neutral privacy solutions on Ethereum." Announced July 14, 2026. Part of the broader EF restructuring alongside EthLabs and Ethereum Institutional. The IPTF site (iptf.ethereum.org) now presents as "EthSystems · Confidential Systems for Institutional Ethereum."
- **Founders:** Mo Jalil (CEO, ex-Goldman Sachs), Oskar Thorén (~decade in crypto privacy; built Waku P2P messaging protocols, now part of Logos), Aaryamann Challani.
- **Funding:** anchor investment from Bitmine Immersion Technologies (NYSE: BMNR), SharpLink (Nasdaq: SBET), and Joe Lubin (Ethereum co-founder, ConsenSys).
- **Thesis:** *confidentiality, not scalability*, is the biggest barrier to institutional activity on public Ethereum — trade information, client identities, and portfolio positions cannot be broadcast.
- **Approach:** primarily **zero-knowledge cryptography** — e.g., prove a transaction satisfies AML threshold checks and isn't addressed to a sanctioned entity *without* revealing amount or counterparty; compliance enforced at the cryptographic level rather than via public whitelists.
- **Assets:** a year of open-source work public at ethsystems.org; relationships with central banks, regulators, tier-one banks, asset managers. Product areas named publicly: **private transfers, private bonds, confidential settlement, privacy-preserving identity**.
- **Sources:** [CoinDesk — launch](https://www.coindesk.com/tech/2026/07/14/ethereum-foundation-spinout-ethsystems-targets-banks-with-blockchain-privacy-technology) · [CoinDesk — thesis interview](https://www.coindesk.com/tech/2026/07/28/ethereum-startup-ethsystems-bets-privacy-is-key-to-getting-banks-on-public-blockchains) · [PR Newswire launch release](https://www.prnewswire.com/news-releases/ethsystems-launches-to-build-privacy-solutions-for-institutions-on-ethereum-302824593.html) · [Decrypt](https://decrypt.co/373523/team-behind-ethereums-institutional-privacy-push-spins-out-for-profit-firm-ethsystems) · [Bankless](https://www.bankless.com/read/news/ethereum-foundation-privacy-team-spins-out-as-ethsystems) · [IPTF site](https://iptf.ethereum.org/) · [ethereum.org institutional privacy page](https://institutions.ethereum.org/privacy)

## Ethereum Foundation privacy context

- **Privacy Cluster** (Oct 2025): dedicated EF engineering team consolidating privacy work toward end-to-end native encryption on Ethereum.
- **PSE (Privacy & Scaling Explorations):** EF's ZK research team, contributor to the mainnet privacy roadmap.
- **EEA Privacy Working Group:** Enterprise Ethereum Alliance vendor group (includes Applied Blockchain/Silent Data — TEE-based confidential computing; Consensys/Linea — enterprise L2).
- **Sources:** [The Block — pragmatic privacy year](https://www.theblock.co/post/383680/aztec-zcash-year-pragmatic-privacy-root) · [EEA Privacy WG](https://entethalliance.org/the-eea-launches-its-privacy-working-group/)

## Technology approaches (know the trade-offs)

| Approach | How it works | Exemplars | Trade-offs |
|---|---|---|---|
| **ZK shielded pools / proofs** | balances/transfers hidden in commitments; ZK proofs enforce validity + compliance predicates | EthSystems, Privacy Pools (0xbow), Railgun, Aztec | mature cryptography; compliance predicates must be designed carefully; proving cost |
| **ZK L2 with private state** | full programmable privacy at the execution layer | **Aztec** (Ignition mainnet, Nov 2025) | new chain/liquidity; strongest programmability of private state |
| **FHE (fully homomorphic encryption)** | computation directly on encrypted state inside EVM contracts | **Zama** (fhEVM; $1B+ valuation; first confidential institutional OTC trade on encrypted Ethereum, 2026) | elegant model; heavy compute, trust in threshold decryption networks |
| **TEE / confidential computing** | hardware enclaves process private data, attest results | Applied Blockchain Silent Data | fast/cheap; hardware trust assumptions (SGX-class attacks) |
| **Permissioned L2 / validium** | enterprise chains anchored to Ethereum, data kept off public DA | Linea enterprise, Kinexys private rails | pragmatic today; weaker "public network" benefits — this is the camp EthSystems wants to migrate onto mainnet |

- **Compliance-privacy synthesis patterns:**
  - **Privacy Pools** (from Buterin et al.'s 2023 paper, built by 0xbow): association sets — prove your deposit is *not* from a flagged source without revealing which deposit is yours.
  - **Railgun "proof of innocence":** ZK proof that shielded funds aren't on a bad-address list.
  - These retail-grade patterns generalize to the institutional predicates EthSystems describes (AML thresholds, sanctions screening) — same cryptographic shape, different claim sets and identity anchors.
- **Sources:** [ChainSafe 2026 blockchain privacy guide](https://blog.chainsafe.io/2026-guide-to-blockchain-privacy/) · [BlockEden — ZK/FHE/TEE infrastructure](https://blockeden.xyz/blog/2026/02/04/web3-privacy-infrastructure-zk-fhe-tee-reshaping-blockchain/) · [BlockEden — Zama confidential OTC trade](https://blockeden.xyz/blog/2026/03/13/zama-fhe-protocol-first-confidential-institutional-otc-trade-encrypted-ethereum/) · [MEXC — Zama fhEVM](https://blog.mexc.com/news/what-is-zama-fhe-the-1b-unicorn-bringing-private-smart-contracts-to-ethereum-and-shibarium-2026/) · [Bitrue — Ethereum privacy projects](https://www.bitrue.com/blog/get-to-know-privacy-projects-on-ethereum)

## The leakage map (tying the whole catalog together)

What each RWA category exposes on public Ethereum today — the demand map for confidential systems:

| Category | Who is exposed | What leaks | Severity for institutions |
|---|---|---|---|
| Tokenized treasuries (BUIDL, BENJI…) | fund holders (KYC'd, small set → deanonymizable) | positions, subscriptions/redemptions, reserve flows | High — treasury operations visible |
| Private credit (Centrifuge, Maple) | lenders & (inferable) borrowers | book composition, repayment health, distress signals | Very high — competitors can front-run distress |
| Tokenized equities (Ondo GM, Backed) | traders | portfolio positions, trade timing | Very high — strategy leakage; blocks institutional flow |
| Bank deposit tokens (JPMD) | bank clients | payment flows, counterparty graph, intraday liquidity patterns | Very high — why most bank activity stays private-chain |
| Bonds (EIB, UBS, Siemens) | allocants | allocations, secondary transfers | High — hence issuance retreats to SWIAT/SDX |
| DeFi credit (Aave Horizon) | institutional borrowers | collateral, leverage, liquidation levels | High — front-runnable |
| Commodities (PAXG) | treasury holders | position sizes | Medium |

## Interview synthesis

1. **The market pull:** ~$30B RWAs on-chain grew 400%+ in 18 months *with zero privacy* — because early adopters were crypto-native. The next 10–100x (bank client money, asset-manager portfolios, corporate treasuries — the "$100T institutional gap") requires confidentiality. Every initiative in this catalog is either exposed (public rails) or exiled (private rails); EthSystems' product is the migration path.
2. **The regulatory unlock:** compliance-by-cryptography inverts the current model — instead of trusting a transfer agent's whitelist and accepting public data, regulators get *provable* rule enforcement (sanctions, AML thresholds) with *less* public data. ERC-3643's identity-claim architecture is the natural integration point.
3. **The competitive frame:** vs. Aztec (new L2, full programmability), Zama (FHE, encrypted EVM), TEE vendors (hardware trust), private chains (status quo). EthSystems' differentiators: EF lineage/neutrality, regulator and tier-one-bank relationships, mainnet-first vendor-neutral posture, open-source base.
4. **Questions worth asking them:** where do they sit in the stack (protocol, middleware, or application)? How do they handle viewing keys/selective disclosure for auditors? What's the interop story with ERC-3643 registries and Securitize-style transfer agents? How does private state compose with public DeFi liquidity (the Aave Horizon problem)?
