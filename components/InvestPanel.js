"use client";

import { useState } from "react";

export default function InvestPanel({ type, targetId, targetLabel }) {
  const [investorName, setInvestorName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ investorName, type, targetId, amount: Number(amount) }),
    });
    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setError(data.error || "Something went wrong.");
      return;
    }

    setConfirmed(data.investment);
    setStatus("done");
  }

  if (status === "done" && confirmed) {
    return (
      <div className="mt-4 rounded-sm border border-gold/50 bg-gold/10 p-6">
        <p className="font-body text-sm text-ink">
          Recorded: <strong>{formatUSD(confirmed.amount)}</strong> from{" "}
          <strong>{confirmed.investorName}</strong> into {targetLabel}.
        </p>
        <p className="mt-2 font-body text-xs text-ink/50">
          This commitment now appears on the public transparency ledger.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setInvestorName("");
            setAmount("");
          }}
          className="mt-4 font-body text-xs text-gold hover:underline"
        >
          Record another investment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 flex flex-wrap items-end gap-4">
      <label className="w-full sm:w-auto sm:flex-1">
        <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Investor / institution name
        </span>
        <input
          required
          value={investorName}
          onChange={(e) => setInvestorName(e.target.value)}
          placeholder="e.g. Meridian Pension Partners"
          className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
        />
      </label>
      <label className="w-full sm:w-48">
        <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Amount (USD)
        </span>
        <input
          required
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1,000,000"
          className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition hover:bg-inkline disabled:opacity-50"
      >
        {status === "loading" ? "Recording…" : "Invest"}
      </button>
      {error && <p className="w-full font-body text-sm text-clay">{error}</p>}
    </form>
  );
}

function formatUSD(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
