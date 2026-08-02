# Deep Dive: Private Credit & Structured Credit

The second-largest RWA category and the one with the most intricate legal/on-chain plumbing.

---

## Centrifuge

- **Model:** multichain protocol (Ethereum, Base, Arbitrum) where institutions issue on-chain **pools** backed by off-chain assets: invoices, freight receivables, mortgages, T-bills, consumer loans, credit portfolios.
- **Mechanics:**
  - Real-world assets are tokenized as **NFTs**, structured into asset pools, financed through **ERC-4626 vaults**.
  - **Tranching:** senior tranche (historically "DROP") takes fixed yield; junior tranche ("TIN") takes first loss — replicating securitization waterfalls on-chain.
  - **Legal wrapper:** each pool is backed by an SPV; token holders' claims run against the SPV, making tokens redeemable for underlying value.
- **Institutional ties:** long-standing MakerDAO/Sky collateral partner (BlockTower pools etc.); tokenized **Janus Henderson** products (e.g. JAAA — CLO AAA fund) are launch collateral on Aave Horizon; $300M+ tokenized (historical), top-6 RWA platform by TVL 2026.
- **What leaks on-chain:** pool TVLs, tranche balances, investor addresses, repayment cadence — a lender's whole book trajectory is public. Borrower identities are semi-off-chain (in pool docs) but flows are visible.
- **Sources:** [Chainlink — tokenized private credit](https://chain.link/article/tokenized-private-credit) · [Eco private-credit comparison](https://eco.com/support/en/articles/15254025-tokenized-private-credit-2026-maple-centrifuge-goldfinch-compared) · [DEXTools Centrifuge guide](https://www.dextools.io/tutorials/what-is-centrifuge-cfg-rwa-tokenization-protocol-guide-2026) · https://centrifuge.io

## Maple Finance

- **Model:** institutional credit marketplace. **Pool delegates** — credentialed credit professionals — underwrite loans to institutional borrowers; lenders deposit USDC/USDT into pools and hold pool tokens representing claims on the loan book.
- **Risk record:** post-2022 restructuring, zero losses since 2023; loans now >150% collateralized (a shift from the earlier unsecured model that took FTX-era losses). Also runs Maple Cash (T-bill product) and syrupUSDC (permissionless yield).
- **Chains:** Ethereum, Base, Solana, Arbitrum, Plasma.
- **What leaks on-chain:** pool sizes, lender addresses/positions, loan drawdowns and repayments. Borrower-level terms live off-chain with the delegate, but institutional borrowing patterns are inferable from flows.
- **Sources:** [Eco comparison](https://eco.com/support/en/articles/15254025-tokenized-private-credit-2026-maple-centrifuge-goldfinch-compared) · [AltStreet Maple review](https://altstreet.investments/platforms/reviews/maplefinance) · https://maple.finance

## Goldfinch

- **Model:** early undercollateralized-lending protocol (emerging-market fintech loans), pivoted to **Goldfinch Prime**: on-chain access to private-credit funds from managers like **Apollo and Ares** for qualified investors — an aggregator of blue-chip private credit rather than a direct originator.
- **Source:** [Clapp Finance RWA overview](https://clapp.finance/blog/rwa-gold-rush-10-platforms-tokenizing-real-world-assets-in-2026) · https://goldfinch.finance

## Apollo ACRED (via Securitize)

- **Model:** tokenized feeder fund into Apollo's diversified credit strategy; the marquee example of a mega alternative-asset manager ($700B+ AUM) issuing on-chain. Distributed via Securitize to qualified investors; used in leveraged "looping" strategies via DeFi integrations.
- **Source:** [FluidRWA top tokenization companies](https://www.fluidrwa.com/blog/top-tokenization-companies-2026) · https://securitize.io

## Standard legal pattern (applies across the category)

Investor → KYC/accreditation → token (fund interest or SPV claim) → **SPV / Reg D fund / 1940-Act fund** holds the actual loans → servicer/delegate manages collections → repayments flow back through the vault. The token is a wrapper around a bankruptcy-remote legal claim; the chain adds settlement, composability — and total transparency.

- **Source:** [DeFi-Intel — RWA credit fund legal structures](https://defi-intel.com/guides/rwa-credit-tokenized-fund-structure-2026-guide/)

## Takeaway for EthSystems prep

Private credit is *the* category where transparency bites hardest: lenders reveal book composition, borrowers reveal financing needs, and competitors can front-run distress (visible missed repayments). It's also Sky's largest revenue source ($1.5B+ RWA holdings), so confidential-but-compliant credit rails have both issuer demand and DeFi demand. Strong interview angle: "public repayment data is a feature for DeFi risk monitoring but a bug for institutional borrowers — how do you keep verifiable solvency while hiding the book?" (Answer shape: selective disclosure / ZK attestations over private state.)
