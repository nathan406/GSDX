"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TradePage() {
  const [opportunities, setOpportunities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({ country: "", sector: "" });
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.country) params.set("country", filters.country);
    if (filters.sector) params.set("sector", filters.sector);
    fetch(`/api/trade-opportunities?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setOpportunities(d.tradeOpportunities);
        if (sectors.length === 0) setSectors([...new Set(d.tradeOpportunities.map((t) => t.sector))].sort());
      });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        AfCFTA digital trade facilitation
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        African Trade Opportunities
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        Country → sector → opportunity → capital required → partnership needed. Every
        listing here is a business ready to trade across a border, right now.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <select
          value={filters.country}
          onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
          className="rounded-sm border border-line bg-paper px-4 py-2 font-body text-sm text-ink"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={filters.sector}
          onChange={(e) => setFilters((f) => ({ ...f, sector: e.target.value }))}
          className="rounded-sm border border-line bg-paper px-4 py-2 font-body text-sm text-ink"
        >
          <option value="">All sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 space-y-4">
        {opportunities.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-line p-6">
            <div>
              <p className="font-body text-lg">
                {t.flag} <span className="font-display">{countries.find((c) => c.slug === t.country)?.name}</span>
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink/40">{t.sector}</p>
              <p className="mt-2 font-body text-sm text-ink/70">{t.headline}</p>
              {t.business && (
                <Link href={`/businesses/${t.business.id}`} className="mt-2 inline-block font-body text-xs text-gold hover:underline">
                  View business profile: {t.business.name} →
                </Link>
              )}
            </div>
            <div className="text-right">
              <p className="font-mono text-xl text-gold">{formatUSD(t.capitalRequired)}</p>
              <p className="font-body text-[10px] uppercase text-ink/40">capital required</p>
            </div>
          </div>
        ))}
        {opportunities.length === 0 && (
          <p className="font-body text-sm text-ink/50">No opportunities match those filters yet.</p>
        )}
      </div>
    </div>
  );
}

function formatUSD(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);
}
