# Research Plan: Real-World Assets (RWA) on Ethereum

**Purpose:** Preparation for an application to **EthSystems** — the Ethereum Foundation spinout (launched July 14, 2026) building confidential and privacy-related systems for institutions in the Ethereum ecosystem. To be a strong candidate, I need a working map of every major initiative bringing real-world assets on-chain, since these are precisely the institutions and asset flows that EthSystems' privacy infrastructure is meant to serve.

**Last updated:** 2026-07-31

---

## 1. Research goals

1. **Map the landscape**: identify every significant initiative tokenizing real-world assets on Ethereum (and its L2s), with source, description, and URL for each.
2. **Understand the categories**: tokenized treasuries/money-market funds, private credit, tokenized equities, bonds, commodities, real estate, bank deposit tokens, and the compliance/infrastructure layer underneath them.
3. **Connect to privacy**: for each category, understand *why confidentiality is the blocker* to institutional adoption on public Ethereum — trade sizes, counterparties, client identities, and portfolio positions are all public today. This is EthSystems' core thesis.
4. **Know the numbers**: total RWA market ≈ $30B on-chain by mid-2026 (up from ~$5.5B at the start of 2025), with Ethereum holding a leading share (~51–65% depending on the tracker).

## 2. Research questions to answer per initiative

For every entry in [`rwa-initiatives.md`](./rwa-initiatives.md):

- What asset class does it tokenize, and on which chain(s)?
- Who is the issuer / legal wrapper (regulated fund, SPV, trust charter, bank)?
- What token standard does it use (ERC-20, ERC-1400, ERC-3643, custom)?
- How does it handle compliance today (whitelists, transfer restrictions, KYC oracles)?
- **What information leaks on-chain?** (positions, flows, counterparties) — this is the question an EthSystems interviewer will care about.
- What is its AUM/TVL and trajectory?

## 3. Method

1. **Start from trackers** (see the Data & Trackers section of the catalog): RWA.xyz, DeFiLlama RWA category, Dune dashboards — establish the ranked list by AUM.
2. **Go to primary sources**: issuer websites, fund prospectuses, press releases (linked per entry in the catalog).
3. **Read the standards**: ERC-3643 (T-REX), ERC-1400, ERC-4626 vault wrappers — how compliance is enforced at the contract layer.
4. **Follow institutional pilots**: Project Guardian (MAS), DTCC's tokenization pilot (SEC no-action letter, Dec 2025, rollout H2 2026), Kinexys by J.P. Morgan.
5. **Track the privacy angle**: EthSystems' public statements, the EF Institutional Privacy Task Force's prior work, zero-knowledge compliance proofs (proving AML/sanctions checks without revealing amounts or counterparties).
6. **Keep the catalog current**: re-check AUM figures and new entrants monthly; the space moved 400%+ in eighteen months.

## 4. Deliverables in this folder

| File | Contents |
|---|---|
| `README.md` | This research plan |
| `rwa-initiatives.md` | Full catalog of initiatives — name, category, description, source, URL |

## 5. Interview-preparation angles (EthSystems specific)

- **The thesis**: EthSystems (founders Mo Jalil, Oskar Thorén, Aaryamann Challani, ex-EF Institutional Privacy Task Force; anchor funding from Bitmine Immersion, SharpLink, and Joe Lubin) argues that *confidentiality, not scalability*, is the biggest barrier to institutional activity on public Ethereum.
- **Why RWA issuers matter to them**: every initiative in the catalog either (a) already accepts full transparency (tokenized treasuries — positions are public), (b) retreated to private/permissioned chains (early bank pilots), or (c) is waiting for privacy rails. Being able to name which camp each player is in demonstrates real landscape knowledge.
- **The technical direction**: zero-knowledge proofs that enforce compliance rules (AML thresholds, sanctions screening) cryptographically while keeping amounts and counterparties confidential — the bridge between camp (b) and public Ethereum.
- **Adjacent EF restructuring**: EthSystems sits alongside other spinouts (EthLabs, Ethereum Institutional) — know this org context.
