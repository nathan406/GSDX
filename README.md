# GSDX — Global Sustainable Development Exchange

A working Next.js implementation of the GSDX platform structure: country hubs,
a project registry with GSDX Development Readiness scoring, investor capital
matching, governance, and the Universal Development Dividend.

## Stack

- **Next.js 14** (App Router) — both the frontend (React pages) and the
  backend (route handlers under `app/api/*`) live in this one project.
- **Tailwind CSS** for styling.
- An **in-memory data layer** (`lib/data.js`) stands in for a database. Swap
  it for Postgres/Mongo/etc. by replacing the exports in that file — every
  page and API route reads from it, nothing else needs to change.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## What's included

- `/` — landing page, capital flow diagram, pipeline overview, live capital-mobilized stats
- `/countries` and `/countries/[slug]` — 20 country development hubs across Africa, Asia,
  Latin America & the Caribbean, the Middle East, and the Pacific, each with its own
  priorities, projects, and an **invest** section where an investor chooses between
  backing one private-sector project directly or contributing to the country's
  National Wealth Fund
- `/projects` and `/projects/[id]` — 60 projects spanning every GSDX sector, each with
  a funding-progress bar, a "where this money goes" allocation breakdown, and an
  investment form
- `/investors` — capital-matching tool (calls the matching API live)
- `/transparency` — the public investment ledger: every investment recorded on the
  platform, filterable by country, plus platform-wide totals
- `/governance` — GSDX Global Council and regional structure
- `/dividend` — the Universal Development Dividend and citizen wealth flow

### API routes (the "backend")

- `GET  /api/countries` — list all country hubs
- `GET  /api/projects` — list projects, filterable by `?country=`, `?sector=`,
  `?stage=`, `?minAmount=`, `?maxAmount=`
- `POST /api/projects` — register a new project (`name`, `country`, `sector`,
  `amountRequested` required)
- `GET  /api/projects/[id]` — fetch a single project
- `POST /api/match` — rank projects against an investor profile
  (`sectors`, `regions`, `minAmount`, `maxAmount`)
- `GET  /api/investments` — list recorded investments, filterable by `?country=`,
  `?project=`, `?type=project|country-fund`
- `POST /api/investments` — record an investment (`investorName`, `type`, `targetId`,
  `amount`); `type` is `"project"` (targetId = project id) or `"country-fund"`
  (targetId = country slug)

### Transparency model

`PROJECT_FUND_ALLOCATION` and `COUNTRY_FUND_ALLOCATION` in `lib/data.js` are the two
fixed, publicly displayed allocation formulas — every project follows the same split,
and every country's National Wealth Fund follows the same split, so any investor can
verify where their money goes without a case-by-case explanation. `lib/data.js` also
seeds a starter ledger of ~22 investments so the transparency page isn't empty on
first run.

## Youth Project Hub & African Trade features

Built for the AU–EU Youth Action Lab Innovation Grant and the AfCFTA Digital
Innovation Challenge:

- `/youth` and `/youth/submit` and `/youth/[id]` — young people submit development
  ideas (15 seeded, across 9 community sectors and 10 countries), get a live
  **GSDX Project Readiness Score** (0–100 across 10 criteria, with a "what's missing"
  list), see matching funding/partnership opportunities, and community members can
  **support** a project or leave feedback
- `/businesses` and `/businesses/[id]` — African business profiles (12 seeded) with a
  **Trade Readiness Score** (9 criteria) and a **cross-border matcher**: pick a target
  country and GSDX surfaces potential partner businesses there, matching trade
  opportunities, and eligible funding
- `/trade` — the **African Trade Opportunity Marketplace**: country → sector →
  opportunity → capital required → partnership needed (10 seeded listings)
- `/funding` — the **Funding Marketplace**: 8 seeded funders (grants, equity, debt,
  guarantees, concessional financing) plus a matcher that scores any project, youth
  project, or business against every funder
- `/dashboard` — the **Impact Dashboard**: youth pipeline, development pipeline, and
  trade/investment stats, rolled up globally or filtered to one country — the same
  shape of view (e.g. "126 projects verified, $18.4M requested, 12,400 beneficiaries")
  referenced in the AU–EU pitch

### Additional API routes

- `GET/POST /api/youth-projects`, `GET /api/youth-projects/[id]` — youth project CRUD
  and readiness scoring
- `POST /api/youth-projects/[id]/feedback` — record support (`{"type":"support"}`) or
  a comment (`{"type":"comment","name":"...","comment":"..."}`)
- `GET/POST /api/businesses`, `GET /api/businesses/[id]` — business profile CRUD and
  trade-readiness scoring
- `GET /api/trade-opportunities`, `GET /api/funding-opportunities` — marketplace
  listings, filterable by country/sector/type
- `POST /api/match/funding` — `{ kind: "project"|"youth"|"business", id }` → ranked
  funding matches
- `POST /api/match/cross-border` — `{ businessId, targetCountry }` → partner
  businesses, trade opportunities, and funding in the target country
- `GET /api/dashboard` — aggregated impact stats, optional `?country=`

## National capital structure & direct citizen distribution

Modeled on the flagship-project structure: capital splits 60% investors / 30%
government / 10% private-sector development. Of that 10%, 1% (0.1% of the total
project) funds a direct citizen distribution paid via mobile money, and the
remaining 99% capitalizes a private-sector development fund for SMEs, startups,
and local suppliers.

Eight flagship "mega-projects" are seeded — one per African country already in the
platform (Zambia, Malawi, Kenya, Ghana, Tanzania, Uganda, Rwanda, Senegal) — each
with its own total capital, eligible-adult count, and mobile-money provider. Figures
are illustrative demo data, not verified national statistics.

- `/mega-projects` and `/mega-projects/[id]` — capital-structure breakdown, a live
  citizen-distribution calculator (adjust eligible adults, see the per-person payment
  recompute), a sample mobile-money distribution record, a project impact dashboard,
  a complete transaction ledger with multi-party approval status, a sample pending
  change request (original vs. proposed budget), and a sample AI anomaly flag
- `/dashboard` now includes a **National GSDX Dashboard** section rolling up flagship
  projects, capital mobilized, citizens reached, citizen distributions paid, SMEs
  supported, and jobs created — globally or filtered to one country
- Each mega-project's private-sector development fund is also listed in
  `/funding` as a normal funding opportunity, so it surfaces in matching alongside
  every other funder

### Further API routes

- `GET /api/mega-projects` — list flagship projects, filterable by `?country=`
- `GET /api/mega-projects/[id]` — capital structure, private-sector split, ledger,
  change request, and anomaly flag for one project
- `GET /api/national-dashboard` — the national rollup used by `/dashboard`, optional
  `?country=`

One caution carried over from the source concept: before this becomes an actual
financial product, the ownership, citizen-distribution, securities, tax, AML/KYC,
mobile-money, and public-finance mechanics would need to be designed with regulators
and legal/financial experts in each country. The percentages here (`CAPITAL_STRUCTURE`
and `PRIVATE_SECTOR_SPLIT` in `lib/data.js`) are GSDX's default configuration, not a
fixed rule — a real deployment would make them configurable per government.

## Monthly distribution tracking, need-based weighting & payment methods

Each mega-project page (`/mega-projects/[id]`) now also shows:

- **This cycle's distribution success** — adults enrolled, adults paid, success rate,
  and total transferred, confirming every eligible adult was paid this month via the
  project's mobile-money rail (`megaDistributionStatus()` in `lib/data.js`)
- **A reason-for-funds selector** on the citizen calculator — business, school/
  education, career, medical expenses, or other essential expenses. The declared
  reason never blocks a payment; it reweights the shared pool so higher-priority needs
  (medical, then education) receive a larger share while the total paid out is
  unchanged (`DISTRIBUTION_REASONS` and `computeAdjustedPayment()`)
- **Three demo citizen accounts per country** — illustrative people with a name,
  declared reason, monthly payment amount, a real mobile-money account type for their
  country, and a 3-month payment history, all showing "Payment successful"
  (`demoCitizens` in `lib/data.js`)
- **Private-sector fund destinations** — named recipient accounts (existing GSDX
  business profiles where one exists for the country) plus a pooled rollup of the
  remaining approved SMEs, each showing amount transferred and status
  (`megaPrivateSectorDisbursements()`)

`/payment-methods` is a new reference page listing real mobile money and digital
wallet account types for every GSDX country — grouped Africa vs. other regions, plus
a bonus list of providers used elsewhere across Africa. Every mega-project's
`mobileMoneyProvider` field (in `lib/data.js`) is now set to that country's real,
commonly-used mobile money service (e.g. M-Pesa for Kenya, MTN Mobile Money for
Zambia, Orange Money for Senegal) rather than a fictional brand — the demo simulates
a payment going out through the actual account type someone in that country would
recognize. This remains a simulation: no real transaction, integration, or
partnership with any named provider exists.

### Further API routes

- `GET /api/mega-projects/[id]` now also returns `distributionStatus`,
  `privateSectorDisbursements`, `distributionReasons`, and `demoCitizens`
- `GET /api/payment-methods` — mobile money / digital payment providers by country,
  plus the "other Africa" reference list

## Next steps for a production deployment

1. Replace `lib/data.js` with a real database and an ORM (Prisma is a
   natural fit for Next.js).
2. Add authentication (NextAuth.js) for governments, investors, and citizens
   to have distinct accounts and permissions.
3. Add write-protection / review workflow on `POST /api/projects` so new
   projects go through country review before appearing publicly.
4. Deploy to Vercel, or any Node host that supports Next.js.
