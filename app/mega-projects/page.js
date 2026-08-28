"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MegaProjectsPage() {
  const [megaProjects, setMegaProjects] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("/api/mega-projects").then((r) => r.json()).then((d) => setMegaProjects(d.megaProjects));
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        National capital structure
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        Flagship national projects & citizen distribution
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        On these projects, capital splits 60% to investors, 30% to government, and 10%
        to private-sector development. Of that 10%, 1% — a fixed 0.1% of the total
        project — is distributed directly to eligible adults nationwide through mobile
        money. The remaining 99% capitalizes a fund for local SMEs, startups, and
        suppliers.
      </p>
      <p className="mt-4 max-w-2xl font-body text-xs text-ink/40">
        Figures below are illustrative demo data, not verified national statistics. A
        real deployment of this model would need ownership, securities, tax, AML/KYC,
        mobile-money, and public-finance rules designed with regulators and legal/financial
        experts in each country.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {megaProjects.map((mp) => {
          const country = countries.find((c) => c.slug === mp.country);
          return (
            <Link
              key={mp.id}
              href={`/mega-projects/${mp.id}`}
              className="group block rounded-sm border border-line p-6 transition hover:border-gold"
            >
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                {country?.name} · {mp.sector}
              </p>
              <h3 className="mt-2 font-display text-lg text-ink group-hover:text-gold">
                {mp.name}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-lg text-gold">{formatCompact(mp.totalCapital)}</p>
                  <p className="font-body text-[10px] uppercase text-ink/40">total capital</p>
                </div>
                <div>
                  <p className="font-mono text-lg text-gold">{formatUSD2(mp.perAdultPayment)}</p>
                  <p className="font-body text-[10px] uppercase text-ink/40">per adult / period</p>
                </div>
              </div>
              <p className="mt-4 font-body text-xs text-ink/50">
                {mp.eligibleAdults.toLocaleString()} eligible adults · {mp.status}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function formatCompact(n) {
  return new Intl.NumberFormat("en-US", { notation: "compact", style: "currency", currency: "USD", maximumFractionDigits: 1 }).format(n);
}
function formatUSD2(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
}
