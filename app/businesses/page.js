"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({ country: "", sector: "" });
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/countries").then((r) => r.json()).then((d) => setCountries(d.countries));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.country) params.set("country", filters.country);
    if (filters.sector) params.set("sector", filters.sector);
    fetch(`/api/businesses?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setBusinesses(d.businesses);
        if (sectors.length === 0) setSectors([...new Set(d.businesses.map((b) => b.sector))].sort());
        setLoading(false);
      });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
        GSDX African Trade & Investment
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Business profiles</h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        African businesses looking for markets, partners, and capital across borders —
        each with a GSDX Trade Readiness Score.
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

      <div className="mt-8">
        {loading ? (
          <p className="font-body text-sm text-ink/50">Loading…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <Link
                key={b.id}
                href={`/businesses/${b.id}`}
                className="group block rounded-sm border border-line p-6 transition hover:border-gold"
              >
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                  {b.sector} · {countries.find((c) => c.slug === b.country)?.name}
                </p>
                <h3 className="mt-2 font-display text-lg text-ink group-hover:text-gold">
                  {b.name}
                </h3>
                <p className="mt-2 line-clamp-2 font-body text-xs text-ink/50">{b.products}</p>
                <p className="mt-4 font-mono text-xl text-gold">{b.tradeReadiness}</p>
                <p className="font-body text-[10px] uppercase text-ink/40">trade readiness</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
