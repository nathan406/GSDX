export const metadata = { title: "Development dividend — GSDX" };

const flow = [
  "National investment",
  "Productive assets",
  "Economic returns",
  "National wealth fund",
];

const opportunities = [
  "Jobs",
  "Skills training",
  "Entrepreneurship",
  "Business financing",
  "Scholarships",
  "Investment opportunities",
  "Development programs",
  "Universal Development Dividend",
];

export default function DividendPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        Citizen wealth
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-3xl text-ink sm:text-4xl">
        The Universal Development Dividend
      </h1>
      <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink/70">
        Citizens receive a share of sustainably generated national wealth once a
        participating country's wealth system has reached the financial capacity to
        support such distributions. The dividend is connected to wealth creation, not
        continuous external donations.
      </p>

      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          How national wealth is built
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {flow.map((f, i) => (
            <div key={f} className="flex items-center gap-3">
              <span className="rounded-sm border border-line bg-paper px-4 py-3 font-body text-sm text-ink">
                {f}
              </span>
              {i < flow.length - 1 && <span className="text-ink/20">→</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-3">
          <span className="text-ink/20">↓</span>
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-gold/40 bg-gold/10 p-5">
            <p className="font-display text-base text-ink">Reinvestment</p>
            <p className="mt-1 font-body text-xs text-ink/60">
              Compounds national wealth for future generations.
            </p>
          </div>
          <div className="rounded-sm border border-gold/40 bg-gold/10 p-5">
            <p className="font-display text-base text-ink">Citizen benefit</p>
            <p className="mt-1 font-body text-xs text-ink/60">
              Distributed once the wealth fund can sustainably support it.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          The citizen opportunity platform
        </h2>
        <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
          The dividend is one part of a larger system — citizens become participants in
          development, not just recipients of it.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {opportunities.map((o) => (
            <span
              key={o}
              className="rounded-full border border-line px-4 py-2 font-body text-xs text-ink/70"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
