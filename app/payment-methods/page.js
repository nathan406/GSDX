"use client";

import { useEffect, useState } from "react";

export default function PaymentMethodsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/payment-methods").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <div className="mx-auto max-w-6xl px-6 py-16 font-body text-sm text-ink/50">Loading…</div>;

  const africa = data.byCountry.filter((c) => c.region === "Africa");
  const others = data.byCountry.filter((c) => c.region !== "Africa");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">Payment infrastructure</p>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
        Mobile money & digital payment methods
      </h1>
      <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
        GSDX's citizen distributions and private-sector disbursements are paid through
        each country's existing mobile money or digital wallet infrastructure — GSDX
        never holds citizen funds itself. This is a reference list of the account types
        already in wide use, by country.
      </p>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Africa</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {africa.map((c) => (
            <div key={c.country} className="rounded-sm border border-line p-5">
              <p className="font-display text-base text-ink">{c.countryName}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.providers.map((p) => (
                  <span key={p} className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink/70">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-sm border border-line bg-line/10 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
            Also widely used elsewhere across Africa
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.otherAfricaProviders.map((p) => (
              <span key={p.provider} className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink/70">
                {p.provider} <span className="text-ink/40">— {p.country}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-xl text-ink">Other GSDX countries</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c) => (
            <div key={c.country} className="rounded-sm border border-line p-5">
              <p className="font-display text-base text-ink">{c.countryName}</p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40 mt-1">{c.region}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.providers.map((p) => (
                  <span key={p} className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink/70">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 max-w-2xl font-body text-xs text-ink/40">
        Provider names are shown for reference only — this is a demo simulation, and
        GSDX does not claim any real partnership, integration, or endorsement with any
        listed provider. A real deployment would integrate with each provider directly
        through their published payment APIs, under the applicable licensing and
        regulatory requirements in that country.
      </p>
    </div>
  );
}
