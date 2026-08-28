"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function YouthProjectDetail({ params }) {
  const [data, setData] = useState(null);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [supportSubmitting, setSupportSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, [params.id]);

  function load() {
    fetch(`/api/youth-projects/${params.id}`)
      .then((r) => r.json())
      .then((d) => setData(d));
  }

  async function support() {
    setSupportSubmitting(true);
    await fetch(`/api/youth-projects/${params.id}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "support" }),
    });
    setSupportSubmitting(false);
    load();
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!commentName || !commentText) return;
    await fetch(`/api/youth-projects/${params.id}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "comment", name: commentName, comment: commentText }),
    });
    setCommentName("");
    setCommentText("");
    load();
  }

  if (!data) return <div className="mx-auto max-w-4xl px-6 py-16 font-body text-sm text-ink/50">Loading…</div>;
  if (data.error) return <div className="mx-auto max-w-4xl px-6 py-16 font-body text-sm text-ink/50">{data.error}</div>;

  const p = data.youthProject;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/youth" className="font-body text-sm text-ink/50 hover:text-gold">
        ← Youth project hub
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay">
            {p.sector} · {p.status}
          </p>
          <h1 className="mt-2 max-w-xl font-display text-3xl text-ink sm:text-4xl">{p.name}</h1>
          <p className="mt-3 font-body text-sm text-ink/60">
            Submitted by {p.submitterName}
            {p.ageRange ? ` (age ${p.ageRange})` : ""}
          </p>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-ink/70">{p.summary}</p>
        </div>
        <div className="rounded-sm border border-line p-5 text-center">
          <p className="font-mono text-4xl text-gold">{p.readinessScore}</p>
          <p className="font-body text-[10px] uppercase tracking-wide text-ink/40">
            GSDX readiness / 100
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-4">
        <Fact label="Young people reached" value={p.youngPeopleReached?.toLocaleString() ?? "—"} />
        <Fact label="Jobs expected" value={p.jobsExpected?.toLocaleString() ?? "—"} />
        <Fact label="Beneficiaries" value={p.beneficiaries?.toLocaleString() ?? "—"} />
        <Fact label="Funding required" value={formatUSD(p.fundingRequired)} />
      </div>

      {p.sdgs?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {p.sdgs.map((n) => (
            <span key={n} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink/60">
              SDG {n}
            </span>
          ))}
        </div>
      )}

      {p.missing?.length > 0 && (
        <div className="mt-10 rounded-sm border border-clay/40 bg-clay/5 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-clay">
            What's missing before this is fundable
          </p>
          <ul className="mt-3 space-y-1 font-body text-sm text-ink/70">
            {p.missing.map((m) => (
              <li key={m}>— {m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Matched funding */}
      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Matching funding & partnership opportunities
        </h2>
        <p className="mt-2 font-body text-sm text-ink/60">
          {data.matchingFunding.length} potential funding/partnership{" "}
          {data.matchingFunding.length === 1 ? "opportunity" : "opportunities"} found.
        </p>
        <div className="mt-4 space-y-3">
          {data.matchingFunding.map(({ funder, matchScore }) => (
            <div key={funder.id} className="flex items-center justify-between rounded-sm border border-line p-4">
              <div>
                <p className="font-display text-base text-ink">{funder.funder}</p>
                <p className="mt-1 font-body text-xs text-ink/50">
                  {funder.type} · {funder.amount}
                </p>
              </div>
              <p className="font-mono text-lg text-gold">{matchScore}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community participation */}
      <div className="mt-14 border-t border-line pt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink/40">
          Community participation
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={support}
            disabled={supportSubmitting}
            className="rounded-sm bg-gold px-5 py-2.5 font-body text-sm font-medium text-paper transition hover:bg-gold/90 disabled:opacity-50"
          >
            Support this project
          </button>
          <p className="font-body text-sm text-ink/60">{p.supporters} people support this</p>
        </div>

        <form onSubmit={submitComment} className="mt-8 flex flex-wrap items-end gap-4">
          <label className="w-full sm:w-56">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">Your name</span>
            <input
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            />
          </label>
          <label className="w-full flex-1">
            <span className="font-mono text-xs uppercase tracking-wide text-ink/40">
              Feedback or a problem you'd like this project to address
            </span>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2 font-body text-sm text-ink"
            />
          </label>
          <button
            type="submit"
            className="rounded-sm border border-ink/20 px-5 py-2.5 font-body text-sm font-medium text-ink transition hover:border-gold hover:text-gold"
          >
            Add feedback
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {p.comments.length === 0 && (
            <p className="font-body text-sm text-ink/50">No community feedback yet.</p>
          )}
          {p.comments.map((c, i) => (
            <div key={i} className="border-b border-line pb-4">
              <p className="font-body text-sm text-ink">
                <span className="font-medium">{c.name}</span>{" "}
                <span className="text-ink/40">· {c.date}</span>
              </p>
              <p className="mt-1 font-body text-sm text-ink/70">{c.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }) {
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
