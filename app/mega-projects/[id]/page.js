"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const APPROVAL_PARTIES = ["Government", "Investors", "Project owner", "Independent oversight", "GSDX"];

export default function MegaProjectDetail({ params }) {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState(null);
  const [adults, setAdults] = useState("");
  const [reason, setReason] = useState("other");

  useEffect(() => {
    fetch(`/api/mega-projects/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        if (d.megaProject) setAdults(String(d.megaProject.eligibleAdults));
      });
  }, [params.id]);

  useEffect(() => {
    if (data?.megaProject) {
      fetch("/api/countries")
        .then((r) => r.json())
        .then((d) => setCountry(d.countries.find((c) => c.slug === data.megaProject.country)));
    }
  }, [data]);

  if (!data) return <div className="mx-auto max-w-4xl px-6 py-16 font-body text-sm text-ink/50">Loading…</div>;
  if (data.error) return <div className="mx-auto max-w-4xl px-6 py-16 font-body text-sm text-ink/50">{data.error}</div>;

  const mp = data.megaProject;
  const adultsNum = Number(adults) || 0;
  const livePerAdult = adultsNum > 0 ? mp.citizenPool / adultsNum : 0;
  const weightedAvg = data.distributionReasons.reduce((s, r) => s + r.multiplier * r.populationShare, 0);
  const selectedReason = data.distributionReasons.find((r) => r.key === reason) || data.distributionReasons[4];
  const adjustedPerAdult = (livePerAdult * selectedReason.multiplier) / weightedAvg;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/mega-projects" className="font-body text-sm text-ink/50 hover:text-gold">
        ← Flagship national projects
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
            {mp.sector} · {country?.name} · {mp.status}
          </p>
          <h1 className="mt-2 max-w-xl font-display text-3xl text-ink sm:text-4xl">{mp.name}</h1>
        </div>
        <div className="rounded-sm border border-line p-5 text-center">
          <p className="font-display text-3xl text-gold">{formatCompact(mp.totalCapital)}</p>
          <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">total capital</p>
        </div>
      </div>

      {/* Capital structure */}
      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Project capital structure
        </h2>
        <div className="mt-4 space-y-3">
          {data.capitalStructure.map((c) => (
            <div key={c.key}>
              <div className="flex justify-between font-body text-sm text-ink/70">
                <span>{c.label}</span>
                <span className="font-mono">{c.pct}% · {formatUSD(mp[c.key])}</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-line">
                <div className="h-2 rounded-full bg-gold" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Private sector split */}
      <div className="mt-10 rounded-sm border border-line p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Private-sector development allocation ({formatUSD(mp.privateSector)})
        </p>
        <div className="mt-4 space-y-3">
          {data.privateSectorSplit.map((s) => (
            <div key={s.key}>
              <div className="flex justify-between font-body text-sm text-ink/70">
                <span>{s.label}</span>
                <span className="font-mono">
                  {s.pct}% · {formatUSD(s.key === "citizenPool" ? mp.citizenPool : mp.remainingPrivateSectorFund)}
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-line">
                <div className="h-2 rounded-full bg-inkline" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 font-body text-xs text-ink/50">
          The citizen pool is {formatUSD(mp.citizenPool)} — 1% of the 10% private-sector
          allocation, equal to 0.1% of the total project. The remaining{" "}
          {formatUSD(mp.remainingPrivateSectorFund)} capitalizes local SMEs, startups,
          and suppliers (see the{" "}
          <Link href="/funding" className="text-gold hover:underline">
            funding marketplace
          </Link>
          ).
        </p>
      </div>

      {/* Citizen distribution calculator */}
      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Direct citizen distribution
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-ink/60">
          The 1% pool belongs to the entire eligible adult population collectively —
          GSDX divides it evenly, then reweights by declared need. Adjust the
          eligible-adult count and the reason for funds to see how the per-person
          payment changes.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="w-full sm:w-56">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Eligible adults
            </span>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            />
          </label>
          <label className="w-full sm:w-64">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Reason for funds
            </span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            >
              {data.distributionReasons.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>
          <div className="rounded-sm border border-line px-5 py-3">
            <p className="font-display text-2xl text-gold">{formatUSD2(adjustedPerAdult)}</p>
            <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">
              this person's payment
            </p>
          </div>
        </div>
        <p className="mt-3 font-body text-xs text-ink/50">
          The declared reason never blocks a payment — everyone eligible is paid. It
          only reweights how the shared pool is split, so higher-priority needs (like
          medical expenses) receive a larger share than lower-priority ones, while the
          total paid out across the population stays the same.
        </p>
        <p className="mt-3 font-body text-xs text-ink/50">
          Paid via {mp.mobileMoneyProvider} directly into each person's own mobile-money
          account — GSDX doesn't hold citizen funds itself; a regulated payment provider
          executes the transfer. See the full{" "}
          <Link href="/payment-methods" className="text-gold hover:underline">
            mobile money account types
          </Link>{" "}
          available in {country?.name}.
        </p>
      </div>

      {/* This cycle's distribution success */}
      <div className="mt-10 rounded-sm border border-gold/40 bg-gold/5 p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-gold">
          ✓ {data.distributionStatus.period} — transferred successfully
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Adults enrolled" value={data.distributionStatus.adultsEnrolled.toLocaleString()} />
          <Stat label="Adults paid" value={data.distributionStatus.adultsPaid.toLocaleString()} />
          <Stat label="Success rate" value={`${data.distributionStatus.successRate}%`} />
          <Stat label="Total transferred" value={formatUSD(data.distributionStatus.totalTransferred)} />
        </div>
        <p className="mt-4 font-body text-xs text-ink/50">
          Every eligible adult received a payment this cycle via {data.distributionStatus.provider},
          and this repeats every month.
        </p>
      </div>

      {/* Demo citizen accounts */}
      <div className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Demo citizen accounts
        </h2>
        <p className="mt-2 font-body text-sm text-ink/60">
          Illustrative examples of how three different people in {country?.name} would
          see their own payment — same pool, different declared needs.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {data.demoCitizens.map((c) => (
            <div key={c.id} className="rounded-sm border border-line p-5">
              <p className="font-display text-base text-ink">{c.name}</p>
              <p className="mt-1 font-body text-xs text-ink/50">Reason: {c.reasonLabel}</p>
              <p className="mt-3 font-display text-xl text-gold">{formatUSD2(c.monthlyAmount)}</p>
              <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">per month</p>
              <p className="mt-3 font-body text-xs text-ink/60">
                {c.mobileMoneyProvider} · {c.accountNumber}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase text-gold">{c.status}</p>
              <div className="mt-3 space-y-1 border-t border-line pt-3">
                {c.recentPayments.map((p) => (
                  <div key={p.period} className="flex justify-between font-body text-xs text-ink/50">
                    <span>{p.period}</span>
                    <span>{formatUSD2(p.amount)} · {p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Private-sector fund destinations */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Private-sector development fund — where the money went
        </h2>
        <p className="mt-2 font-body text-sm text-ink/60">
          The remaining {formatUSD(mp.remainingPrivateSectorFund)} is disbursed to
          approved SMEs, startups, and local suppliers in {country?.name}.
        </p>
        <div className="mt-4 space-y-3">
          {data.privateSectorDisbursements.named.map((d) => (
            <div key={d.account} className="flex items-center justify-between rounded-sm border border-line p-4">
              <div>
                {d.linkId ? (
                  <Link href={`/businesses/${d.linkId}`} className="font-display text-sm text-ink hover:text-gold">
                    {d.account}
                  </Link>
                ) : (
                  <p className="font-display text-sm text-ink">{d.account}</p>
                )}
                <p className="mt-1 font-body text-xs text-ink/50">{d.accountType} · {d.purpose}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-gold">{formatUSD(d.amount)}</p>
                <p className="font-mono text-[10px] uppercase text-ink/40">{d.status}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-sm border border-line bg-line/10 p-4">
            <div>
              <p className="font-display text-sm text-ink">{data.privateSectorDisbursements.remainder.account}</p>
              <p className="mt-1 font-body text-xs text-ink/50">{data.privateSectorDisbursements.remainder.purpose}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg text-gold">{formatUSD(data.privateSectorDisbursements.remainder.amount)}</p>
              <p className="font-mono text-[10px] uppercase text-ink/40">{data.privateSectorDisbursements.remainder.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample mobile money distribution record */}
      <div className="mt-10 rounded-sm border border-line p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Sample distribution record — Citizen GSDX Account
        </p>
        <dl className="mt-4 divide-y divide-line font-body text-sm">
          <Row label="Source project" value={mp.name} />
          <Row label="Distribution period" value="Monthly, Distribution #12" />
          <Row label="Payment amount" value={formatUSD2(mp.citizenPool / mp.eligibleAdults)} />
          <Row label="Payment provider" value={mp.mobileMoneyProvider} />
          <Row label="Payment status" value="Completed" />
        </dl>
      </div>

      {/* Impact dashboard */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Project impact dashboard
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <Stat label="Jobs created" value={mp.jobsCreated.toLocaleString()} />
          <Stat label="SMEs supported" value={mp.smesSupported.toLocaleString()} />
          <Stat label="Local suppliers" value={mp.localSuppliers.toLocaleString()} />
          <Stat label="Completion" value={`${mp.completion}%`} />
        </div>
      </div>

      {/* Transaction ledger */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Complete transaction ledger
        </h2>
        <div className="mt-4 space-y-3">
          {data.ledger.map((t) => (
            <div key={t.ref} className="rounded-sm border border-line p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs text-ink/40">{t.ref}</p>
                <p className="font-mono text-lg text-gold">{formatUSD(t.amount)}</p>
              </div>
              <p className="mt-2 font-body text-sm text-ink">
                {t.from} → {t.to}
              </p>
              <p className="mt-1 font-body text-xs text-ink/60">{t.purpose}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-line/50 px-3 py-1 font-mono text-[10px] uppercase text-ink/60">
                  {t.approvals} approvals
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase ${
                    t.status === "Approved" || t.status === "Completed"
                      ? "bg-gold/15 text-gold"
                      : "bg-clay/10 text-clay"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-party approval */}
      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Multi-party approval — most recent transaction
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {APPROVAL_PARTIES.map((party, i) => (
            <span
              key={party}
              className={`rounded-full border px-4 py-2 font-body text-xs ${
                i < 4 ? "border-gold/50 bg-gold/10 text-ink" : "border-line text-ink/40"
              }`}
            >
              {party} {i < 4 ? "✓" : "— pending"}
            </span>
          ))}
        </div>
      </div>

      {/* Change detection */}
      <div className="mt-14 rounded-sm border border-clay/40 bg-clay/5 p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-clay">
          ⚠ Change request pending review
        </p>
        <dl className="mt-4 divide-y divide-line/50 font-body text-sm">
          <Row label="Budget line" value={data.changeRequest.line} />
          <Row label="Original" value={formatUSD(data.changeRequest.original)} />
          <Row label="Proposed" value={formatUSD(data.changeRequest.proposed)} />
          <Row label="Difference" value={`+${formatUSD(data.changeRequest.difference)}`} />
          <Row label="Requested by" value={data.changeRequest.requestedBy} />
        </dl>
        <p className="mt-3 font-body text-xs text-ink/60">{data.changeRequest.reason}</p>
        <p className="mt-3 font-body text-xs text-ink/40">
          Every authorized stakeholder is notified — no material change overwrites the
          historical record silently.
        </p>
      </div>

      {/* AI anomaly flag */}
      <div className="mt-8 rounded-sm border border-clay/40 bg-clay/5 p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-clay">
          {data.anomalyFlag.headline}
        </p>
        <p className="mt-2 font-body text-sm text-ink/70">{data.anomalyFlag.detail}</p>
        <p className="mt-3 font-body text-xs text-ink/40">{data.anomalyFlag.note}</p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2.5">
      <dt className="text-ink/50">{label}</dt>
      <dd className="max-w-xs text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
function Stat({ label, value }) {
  return (
    <div className="rounded-sm border border-line p-4">
      <p className="font-display text-xl text-gold">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink/40">{label}</p>
    </div>
  );
}
function formatUSD(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n || 0);
}
function formatUSD2(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n || 0);
}
function formatCompact(n) {
  return new Intl.NumberFormat("en-US", { notation: "compact", style: "currency", currency: "USD", maximumFractionDigits: 1 }).format(n || 0);
}
