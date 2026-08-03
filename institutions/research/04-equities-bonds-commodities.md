# Deep Dive: Tokenized Equities, Bonds & Commodities

---

## Tokenized equities (~$2.4B, +2,164% YoY as of July 2026)

### How the 1:1 model works (all major issuers)
Each token is fully backed by the corresponding stock/ETF held at licensed custodial broker-dealers. Tokens mint/redeem 24/5 against the underlying; most are **total-return trackers** (dividends auto-reinvested net of withholding). Holders generally get economic exposure, **not** shareholder rights (no voting; not direct legal ownership of the share) — a key nuance.

### Issuers compared

| Issuer | Legal setup | Audience | Chains |
|---|---|---|---|
| **Ondo Global Markets** ($1.39B+ TVL, category leader) | U.S.-registered custodial entities; regulatory-alignment-first | non-US (global markets) | Ethereum, Solana, multi-chain |
| **Backed Finance (xStocks)** | Swiss framework, EU custodians; launch partners Kraken/Bybit | non-US retail | Ethereum, Solana |
| **Dinari (dShares)** | US regulated; accredited/institutional | US accredited | EVM chains |
| **Robinhood** | EU-listed tokenized stocks; building an Arbitrum-Orbit RWA L2 | EU retail | Arbitrum stack |
| **Morgan Stanley** (announced) | tokenized blue-chips/ETFs on internal ATS, late 2026 | institutional clients | TBD |

- **What leaks on-chain:** every wallet's equity positions and trade timing — precisely the "portfolio positions and trade information" institutions refuse to broadcast. Retail tolerance is higher, which is why current volume is retail/offshore-led.
- **Sources:** [The Coin Republic — market size](https://www.thecoinrepublic.com/2026/07/29/tokenized-stocks-surge-2164-to-2-4b-ondo-leads/) · [CCN xStocks vs Ondo](https://www.ccn.com/news/crypto/xstocks-vs-ondo-global-markets-tokenized-stocks/) · [Pionex — ownership rights explained](https://www.pionex.com/blog/do-you-own-the-stock-xstocks-ondo-rights/) · [Eco tokenized equities](https://eco.com/support/en/articles/15254023-tokenized-equities-2026-backed-dinari-robinhood) · [BingX comparison](https://bingx.com/en/learn/article/ondo-global-markets-vs-xstocks-which-tokenized-stock-platform-is-better)

## Tokenized bonds ($10B+ cumulative issuance by early 2026)

- **EIB (2021, "Project Mars"):** first digital bond on public Ethereum — €100M 2-year, with Goldman Sachs, Santander, SocGen; registration/settlement on-chain, settled in ~60 seconds vs T+2. Template for sovereign-grade public-chain issuance. [EIB press release](https://www.eib.org/en/press/all/2021-141-european-investment-bank-eib-issues-its-first-ever-digital-bond-on-a-public-blockchain)
- **UBS:** CHF 375M tokenized bond (Nov 2022, dual listing SIX Digital Exchange + traditional); UBS Tokenize platform also issued tokenized MMF **uMINT** on Ethereum (2024).
- **Siemens:** €60M on Polygon (Feb 2023), €300M on SWIAT with near-instant DvP settlement (Sept 2024) under Germany's **eWpG** electronic-securities law — corporates issuing directly, settling in minutes.
- **Société Générale (SG-Forge):** serial issuer of digital bonds and MiCA-regulated stablecoins (EURCV, USDCV) on public Ethereum.
- **What leaks on-chain:** for public-chain issues, allocations and secondary transfers are visible; most bank issuance therefore still lands on private/permissioned rails (SWIAT, SDX) — the clearest evidence of the confidentiality barrier: **the tech works, the transparency is the blocker.**
- **Sources:** [Coinpaprika tokenized bonds](https://coinpaprika.com/education/tokenized-bonds-how-world-bank-and-eib-issue-bonds-on-blockchain/) · [Global Wisdom — tokenising bonds](https://globalwisdom.group/blog/tokenising-bonds-how-blockchain-is-reshaping-global-debt-markets)

## Commodities (~$7.4B, gold-dominated)

- **Paxos PAXG:** 1 token = 1 fine troy oz allocated gold in Brink's vaults (~510k oz), NYDFS trust charter, monthly attestations, Ethereum-native. ~$2.4B.
- **Tether Gold XAUT:** ~$2.7B, multi-chain. Together they're ~74% of the category.
- **Privacy note:** commodity tokens are bearer-style ERC-20s with no whitelist — the *most* permissionless RWA category, but institutional treasury use still exposes position sizes.
- **Sources:** [BeInCrypto tokenized gold](https://beincrypto.com/learn/tokenized-gold/) · https://paxos.com/paxg · https://gold.tether.to

## Real estate (~$200M — the laggard)

- **RealT:** fractionalized US rental homes as LLC-interest tokens (Ethereum + Gnosis Chain), weekly rent in stablecoins. Category stalled by land-registry/recording-office friction — the legal system, not the chain, is the bottleneck.
- **Source:** [MetaMask RWA categories](https://metamask.io/news/types-of-tokenized-real-world-assets-rwa-categories) · https://realt.co
