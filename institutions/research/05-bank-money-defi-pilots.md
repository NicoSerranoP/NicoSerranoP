# Deep Dive: Bank Money, Institutional DeFi & Regulatory Pilots

---

## Kinexys by J.P. Morgan — JPMD on Base

The most consequential bank deployment on public Ethereum rails.

- **What it is:** JPMD (JPM Coin), a USD **deposit token** — backed 1:1 by J.P. Morgan deposits — live for institutional clients on **Base** (Coinbase's Ethereum L2). Deposit tokens differ from stablecoins: the holder has a claim on a bank deposit (inside the regulated banking perimeter, potentially deposit-insured and interest-bearing) rather than on a reserve fund.
- **Mechanics:** permissioned framework on a public chain — **whitelisted addresses, full KYC**, institutional clients only (no retail). Near-real-time P2P transfers, sub-second/sub-cent 24/7 settlement.
- **Use cases:** cross-border payments, intraday liquidity, **on-chain collateral posting for securities transactions**, programmable payments.
- **Trajectory:** Kinexys ran a private permissioned chain since 2015 (Onyx); JPMD is the deliberate step onto public rails. $2–5B daily volume by early 2026, payments 10x YoY; also deployed JPM Coin to Canton. Kinexys is a Project Guardian participant.
- **Privacy angle:** J.P. Morgan solved compliance with whitelists but every institutional client's payment flows on Base are publicly observable — bank clients' treasury operations exposed to chain analytics. The strongest single proof point for EthSystems' thesis: a tier-one bank chose public Ethereum rails *despite* the leakage, and the leakage caps how much activity can move.
- **Sources:** [J.P. Morgan — JPMD launch](https://www.jpmorgan.com/payments/newsroom/jpm-coin-usd-deposit-token-institutional-clients) · [Base blog](https://blog.base.org/jpmorgan-is-moving-onchain-on-base) · [Kinexys 2026 milestones](https://www.jpmorgan.com/payments/newsroom/kinexys-milestones-2026) · [The Block](https://www.theblock.co/post/378493/jpmorgan-deposit-token-jpm-coin)

## Other bank money

- **Citi Token Services** — institutional payments/liquidity tokenization.
- **SG-Forge (Société Générale)** — EURCV/USDCV MiCA-regulated stablecoins on public Ethereum.
- **Source:** [Spark — TradFi/DeFi convergence](https://www.spark.money/research/tradfi-defi-convergence-2026)

## Aave Horizon — institutional DeFi credit against RWAs

- **Architecture:** a **permissioned instance of Aave V3** with a deliberately split design:
  - **Collateral side (permissioned):** only verified institutions can supply tokenized collateral — launch assets: **Centrifuge JAAA** (Janus Henderson AAA CLO), **Circle USYC**, **Superstate USTB**; per-asset LTVs.
  - **Liquidity side (permissionless):** anyone can supply **USDC, RLUSD, GHO** for institutions to borrow.
- **Partners at launch:** Circle, Ripple, Centrifuge, VanEck, WisdomTree.
- **Why it matters:** first scaled bridge where regulated funds meet open DeFi liquidity — the "permissioned collateral / permissionless liquidity" split is likely the template for institutional DeFi. Borrowing demand gives tokenized funds a *reason* to exist on-chain beyond distribution.
- **Privacy angle:** institutional borrowers' collateral positions, leverage, and liquidation thresholds are public — front-runnable. Confidential collateral positions with provable solvency is a natural EthSystems product surface.
- **Sources:** [Aave Horizon launch blog](https://aave.com/blog/horizon-launch) · [BeInCrypto](https://beincrypto.com/aave-unveils-horizon-permissioned-rwa-market-for-institutions/) · [CoinDesk](https://www.coindesk.com/business/2025/08/25/aave-labs-debuts-horizon-to-let-institutions-borrow-stablecoins-against-tokenized-assets)

## Sky (formerly MakerDAO)

- DAI/USDS issuer, ~$5.4B TVL on Ethereum; **RWA holdings crossed $1.5B in early 2026 and are the protocol's largest revenue source**, allocated via Centrifuge, BlockTower, and other tokenization partners. USDS designed for institutional integration with optional KYC features. The original proof that DeFi-native balance sheets want RWA yield.
- **Sources:** [Eco — Sky architecture](https://eco.com/support/en/articles/14796323-inside-sky-dai-and-usds-architecture) · https://sky.money

## Project Guardian (MAS) — the regulatory sandbox that matters

- **Structure:** MAS + 24+ financial institutions (asset managers, market operators, custodians, banks); an Industry Group of 11 institutions leads workstreams in **asset & wealth management, fixed income, and FX**.
- **Outputs:** the **Guardian Fixed Income Framework** (with ICMA, building on ICMA's Bond Data Taxonomy — protocols, data specs, disclosure requirements for tokenized bonds); common tokenization standards; **Global Layer One (GL1)** initiative for a shared institutional-grade ledger layer.
- **Live pilots:** Ant Group, Apollo, DBS, Franklin Templeton, Hamilton Lane, OCBC, UBS; J.P. Morgan/Kinexys ran tokenized-portfolio pilots. Japan's FSA and other regulators joined as observers/participants.
- **Sources:** [MAS Project Guardian](https://www.mas.gov.sg/schemes-and-initiatives/project-guardian) · [Guardian Fixed Income Framework (PDF)](https://www.mas.gov.sg/-/media/mas-media-library/development/fintech/guardian/guardian-fixed-income-framework.pdf) · [ICMA workstream](https://www.icmagroup.org/News/news-in-brief/icma-to-lead-project-guardian-fixed-income-workstream/) · [Kinexys on Guardian](https://www.jpmorgan.com/kinexys/content-hub/project-guardian)

## DTCC pilot (recap)

Three-year tokenization pilot under SEC no-action letter (Dec 2025); DTC-custodied assets tokenizable on approved blockchains; rollout from H2 2026. See [`02-compliance-standards.md`](./02-compliance-standards.md).
