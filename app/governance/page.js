export const metadata = { title: "Governance — GSDX" };

const council = [
  "Developing countries",
  "International institutions",
  "Private sector",
  "Investors",
  "Development organizations",
  "Civil society",
  "Academia",
  "Citizen representatives",
];

const regionalStructure = [
  "GSDX Africa",
  "GSDX Asia",
  "GSDX Latin America & Caribbean",
  "GSDX Middle East",
  "GSDX Pacific",
];

export default function GovernancePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Governance</p>
      <h1 className="mt-2 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
        No single country controls the system.
      </h1>
      <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
        GSDX seeks to create an interoperable global platform through which existing and
        future development institutions, governments, investors, and private-sector
        participants can coordinate capital and development opportunities more
        efficiently — not to replace institutions like the World Bank or bilateral aid
        agencies, but to connect them.
      </p>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            GSDX Global Council
          </h2>
          <ul className="mt-4 space-y-3">
            {council.map((c) => (
              <li key={c} className="border-b border-line pb-3 font-body text-sm text-ink">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Regional structure
          </h2>
          <ul className="mt-4 space-y-3">
            {regionalStructure.map((r) => (
              <li key={r} className="border-b border-line pb-3 font-body text-sm text-ink">
                {r}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-mono text-xs uppercase tracking-wide text-ink/40">
            Within each country
          </h2>
          <div className="mt-4 rounded-sm border border-line p-6 font-mono text-xs leading-relaxed text-ink/70">
            GSDX Global → GSDX Regional → GSDX Country
            <br />
            &nbsp;&nbsp;→ Government · Projects · Investors
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;→ Development → National Wealth → Citizens
          </div>
        </div>
      </div>
    </div>
  );
}
