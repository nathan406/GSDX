"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BusinessDetail({ params }) {
  const [data, setData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [targetCountry, setTargetCountry] = useState("");
  const [crossBorder, setCrossBorder] = useState(null);
  const [matching, setMatching] = useState(false);

  useEffect(() => {
    fetch(`/api/businesses/${params.id}`).then((r) => r.json()).then(setData);
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
  }, [params.id]);

  async function findMatches(e) {
    e.preventDefault();
    if (!targetCountry) return;
    setMatching(true);
    const res = await fetch("/api/match/cross-border", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId: params.id, targetCountry }),
    });
    const d = await res.json();
    setCrossBorder(d);
    setMatching(false);
  }

  if (!data) return <div className="mx-auto max-w-4xl px-6 py-16 font-body text-sm text-ink/50">Loading…</div>;
  if (data.error) return <div className="mx-auto max-w-4xl px-6 py-16 font-body text-sm text-ink/50">{data.error}</div>;

  const b = data.business;
  const country = countries.find((c) => c.slug === b.country);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/businesses" className="font-body text-sm text-ink/50 hover:text-gold">
        ← All business profiles
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
            {b.sector} · {country?.name}
          </p>
          <h1 className="mt-2 max-w-xl font-display text-3xl text-ink sm:text-4xl">{b.name}</h1>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-ink/70">{b.products}</p>
        </div>
        <div className="rounded-sm border border-line p-5 text-center">
          <p className="font-mono text-4xl text-gold">{b.tradeReadiness}</p>
          <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">
            Trade readiness / 100
          </p>
        </div>
      </div>

      <dl className="mt-10 divide-y divide-line border-y border-line font-body text-sm">
        <Fact label="Production capacity" value={b.productionCapacity || "—"} />
        <Fact label="Current markets" value={b.currentMarkets?.join(", ") || "—"} />
        <Fact label="Target markets" value={b.targetMarkets?.join(", ") || "—"} />
        <Fact label="Funding required" value={formatUSD(b.fundingRequired)} />
        <Fact label="Certifications" value={b.certifications || "—"} />
        <Fact label="Partnership needed" value={b.partnershipRequirements || "—"} />
        <Fact label="Contact" value={b.contact || "—"} />
      </dl>

      <div className="mt-8">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">Expansion plans</h2>
        <p className="mt-2 font-body text-sm text-ink/70">{b.expansionPlans}</p>
      </div>

      {b.missing?.length > 0 && (
        <div className="mt-10 rounded-sm border border-clay/40 bg-clay/5 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-clay">
            What's missing for full trade readiness
          </p>
          <ul className="mt-3 space-y-1 font-body text-sm text-ink/70">
            {b.missing.map((m) => (
              <li key={m}>— {m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Matching funding */}
      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Matching funding opportunities
        </h2>
        <div className="mt-4 space-y-3">
          {data.matchingFunding.map(({ funder, matchScore }) => (
            <div key={funder.id} className="flex items-center justify-between rounded-sm border border-line p-4">
              <div>
                <p className="font-display text-base text-ink">{funder.funder}</p>
                <p className="mt-1 font-body text-xs text-ink/50">{funder.type} · {funder.amount}</p>
              </div>
              <p className="font-mono text-lg text-gold">{matchScore}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-border matching */}
      <div className="mt-14 border-t border-line pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Find cross-border partners
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink/60">
          Choose a country {b.name} wants to expand into — GSDX searches its network for
          potential partners, trade opportunities, and eligible funding there.
        </p>
        <form onSubmit={findMatches} className="mt-4 flex flex-wrap items-end gap-4">
          <label className="w-full sm:w-64">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Target country
            </span>
            <select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            >
              <option value="">Select a country</option>
              {countries.filter((c) => c.slug !== b.country).map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={matching}
            className="rounded-sm bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition hover:bg-inkline disabled:opacity-50"
          >
            {matching ? "Searching…" : "Find matches"}
          </button>
        </form>

        {crossBorder && (
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Potential partners in {countries.find((c) => c.slug === targetCountry)?.name}
              </h3>
              {crossBorder.partnerBusinesses.length === 0 ? (
                <p className="mt-2 font-body text-sm text-ink/50">No business profiles registered there yet.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {crossBorder.partnerBusinesses.map(({ business, reason }) => (
                    <Link
                      key={business.id}
                      href={`/businesses/${business.id}`}
                      className="block rounded-sm border border-line p-4 hover:border-gold"
                    >
                      <p className="font-display text-sm text-ink">{business.name}</p>
                      <p className="mt-1 font-body text-xs text-ink/50">{reason}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Matching trade opportunities
              </h3>
              {crossBorder.matchingTrade.length === 0 ? (
                <p className="mt-2 font-body text-sm text-ink/50">None in this sector yet.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {crossBorder.matchingTrade.map((t) => (
                    <div key={t.id} className="rounded-sm border border-line p-4">
                      <p className="font-body text-sm text-ink">{t.flag} {t.headline}</p>
                      <p className="mt-1 font-mono text-xs text-gold">{formatUSD(t.capitalRequired)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wide text-ink/40">
                Eligible funding there
              </h3>
              {crossBorder.matchingFunding.length === 0 ? (
                <p className="mt-2 font-body text-sm text-ink/50">None found for this sector/country.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {crossBorder.matchingFunding.map((f) => (
                    <div key={f.id} className="rounded-sm border border-line p-4">
                      <p className="font-display text-sm text-ink">{f.funder}</p>
                      <p className="mt-1 font-body text-xs text-ink/50">{f.type} · {f.amount}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div className="flex justify-between py-3">
      <dt className="text-ink/50">{label}</dt>
      <dd className="max-w-xs text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function formatUSD(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);
}
