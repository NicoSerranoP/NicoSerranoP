# Deep Dive: Tokenized Treasuries & Money-Market Funds

Answers to the research questions in [`../README.md`](../README.md) for the flagship category (~$7B+ on-chain AUM, early 2026).

---

## BlackRock BUIDL (via Securitize)

- **Asset / chains:** Short-duration T-bills, repo, cash. Ethereum mainnet (March 20, 2024), expanded Nov 2024 to Aptos, Arbitrum, Avalanche, Optimism, Polygon. Each deployment is a separate Securitize-controlled ERC-20 tied to the same fund; cross-chain movement is intermediated by Securitize, not an open bridge.
- **Legal wrapper:** BVI fund; investors must be **qualified purchasers** under U.S. securities law; Securitize is SEC-registered transfer agent.
- **Token standard / compliance:** Permissioned ERC-20 — transfers restricted to wallets Securitize has KYC'd and added to an on-chain **whitelist**. Transfers to non-whitelisted addresses revert. Whitelisted smart contracts can also hold BUIDL (this is how it "entered DeFi rails" in 2026).
- **Yield mechanics:** Targets stable $1.00 NAV; daily dividends accrued and paid monthly as new tokens.
- **Liquidity innovation:** Circle operates a smart-contract **instant USDC redemption channel** — 1 BUIDL → 1 USDC, 24/7 — solving the mismatch between TradFi settlement (3pm ET cutoffs, T+0/T+1) and crypto's always-on liquidity expectations. Zero Hash integration enables purchase via USDC conversion.
- **What leaks on-chain:** every holder's address, balance, and every transfer amount is public on Etherscan (the [token contract](https://etherscan.io/token/0x7712c34205737192402172409a8f7ccef8aa2aec) is fully inspectable). Since holders are a small set of KYC'd institutions, position sizes and flows of identifiable firms (e.g., Ondo's OUSG reserve wallet) are effectively public — the canonical example of the confidentiality gap EthSystems targets.
- **AUM:** ~$2.4–3.0B (2026) — category leader.
- **Sources:** [Eco BUIDL explainer](https://eco.com/support/en/articles/15483226-what-is-buidl-blackrock-s-tokenized-treasury-fund) · [Gate Learn structure analysis](https://www.gate.com/learn/articles/in-depth-analysis-of-black-rock-s-buidl-fund-how-it-reshapes-the-rwa-landscape/10202) · [Securitize/Zero Hash press](https://securitize.io/learn/press/securitize-integrates-with-zero-hash-enables-purchase-of-buidl-fund-via-USDC-conversion) · [Stablewatch spotlight](https://www.stablewatch.io/research/project-spotlight-buidl)

## Franklin Templeton BENJI / FOBXX

- **Asset / chains:** U.S. government money fund (Treasuries, repo, cash). Eight chains as of Q1 2026: Stellar (first), Ethereum, Polygon, Arbitrum, Aptos, Avalanche, Base, Solana; later BNB Chain.
- **Legal wrapper:** **1940 Act US-registered mutual fund** (FOBXX) — the first US-registered fund to use a public blockchain as its official share register. This is a stronger regulatory statement than BUIDL's private-fund wrapper.
- **Token standard / compliance:** Proprietary Benji platform; the fund's own transfer agent maintains the official record via a blockchain-integrated system. Tokens live in **allowlisted wallets**; peer-to-peer transfers between shareholders were enabled in 2025 (a milestone — previously buy/sell only against the fund).
- **Yield mechanics:** daily dividends **minted as new BENJI tokens** directly into holders' wallets, prorated by balance.
- **What leaks on-chain:** balances and transfers of allowlisted wallets are public per chain; retail-friendly (lower minimums than BUIDL) so individual holders' positions are visible too.
- **AUM:** ~$828M (Q1 2026).
- **Sources:** [Eco BENJI deep dive](https://eco.com/support/en/articles/15254016-benji-deep-dive-2026-franklin-templeton-s-tokenized-money-market) · [Blockworks Ethereum launch](https://blockworks.com/news/franklin-templeton-launches-benji-on-ethereum) · [BeInCrypto P2P transfers](https://beincrypto.com/franklin-templeton-benji-token-transfer/) · [Benji platform](https://digitalassets.franklintempleton.com/benji/)

## Ondo OUSG & USDY

Two products, two deliberately distinct legal frameworks — a great case study in compliance segmentation:

### OUSG (institutional)
- **Legal wrapper:** investors become **limited partners in a Delaware vehicle** managed by Ondo Capital Management; exempt under **Reg D 506(c)** (Securities Act) and **Section 3(c)(7)** (Investment Company Act) — hence restricted to **qualified purchasers** ($5M investments individual / $25M institutional), US and non-US, with KYC/AML.
- **Portfolio:** migrated 2024 from iShares ETF holdings to mostly **BUIDL + USYC + Superstate USTB** — i.e., a tokenized fund-of-tokenized-funds with instant liquidity legs.
- **Compliance mechanics:** smart contracts verify wallet eligibility (KYC status, jurisdiction) before allowing purchase/transfer.

### USDY (global retail)
- **Legal wrapper:** holders are **secured creditors of a bankruptcy-remote SPV** backed by Treasuries + bank deposits; offered to **non-US persons under Reg S**. Onboarding = non-US attestation, identity verification, sanctions screening.
- **What leaks on-chain (both):** holder addresses, balances, subscription/redemption flows. Ondo's own reserve management (e.g., OUSG's BUIDL position) is publicly traceable.
- **Scale:** Ondo is a top-2 RWA platform by TVL; OUSG+USDY are the anchor products.
- **Sources:** [Blockonomi legal-framework analysis](https://blockonomi.com/inside-ondo-finance-how-ousg-and-usdy-tokenize-us-treasuries-through-distinct-legal-frameworks) · [Ondo compliance docs](https://docs.ondo.finance/qualified-access-products/ousg/regulatory-compliance) · [Eco OUSG deep dive](https://eco.com/support/en/articles/15254014-ousg-deep-dive-2026-ondo-s-short-treasury-fund) · [Coinpaprika USDY vs OUSG](https://coinpaprika.com/education/ondo-usdy-vs-ousg-two-tokenized-treasury-yields-explained/)

## Others (summary)

| Product | Wrapper / access | Note | URL |
|---|---|---|---|
| Superstate USTB | US fund, qualified purchasers | Aave Horizon launch collateral | https://superstate.co |
| Hashnote USYC | Cayman fund; acquired by Circle | liquidity leg in OUSG; exchange collateral | https://usyc.hashnote.com |
| WisdomTree WTGXX | US-registered fund, retail via WisdomTree Prime | 13+ tokenized funds | https://www.wisdomtree.com |
| Spiko | EU MMF (French regulated) | leading EUR-denominated product | https://www.spiko.io |
| BNP Paribas AM | tokenized MMF share class via AssetFoundry™ | European bank issuing directly on public Ethereum | https://investax.io/blog/q1-2026-real-world-asset-tokenization-market-report |
| Maple Cash | crypto-native treasury product | see private-credit deep dive | https://maple.finance |

## Category-level takeaway for EthSystems prep

Tokenized treasuries prove product-market fit for RWAs **despite** full transparency — issuers accepted public positions because early holders are crypto-native (DAOs, stablecoin issuers, funds needing on-chain collateral). The next wave (corporate treasurers, banks' client money, asset-manager portfolio allocations) is precisely the demographic that **cannot** accept public balances and flows. Expect interviewers to ask: "why did BUIDL succeed without privacy, and what breaks at the next stage of adoption?"
