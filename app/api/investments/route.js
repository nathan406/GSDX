import { NextResponse } from "next/server";
import {
  investments,
  recordInvestment,
  countries,
  projects,
} from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const project = searchParams.get("project");
  const type = searchParams.get("type");

  let results = investments;
  if (type) results = results.filter((i) => i.type === type);
  if (project) results = results.filter((i) => i.type === "project" && i.targetId === project);
  if (country) {
    results = results.filter((i) => {
      if (i.type === "country-fund") return i.targetId === country;
      const p = projects.find((pr) => pr.id === i.targetId);
      return p?.country === country;
    });
  }

  return NextResponse.json({ investments: results });
}

export async function POST(request) {
  const body = await request.json();
  const { investorName, type, targetId, amount } = body;

  if (!investorName || !type || !targetId || !amount) {
    return NextResponse.json(
      { error: "investorName, type, targetId, and amount are required" },
      { status: 400 }
    );
  }
  if (!["project", "country-fund"].includes(type)) {
    return NextResponse.json(
      { error: "type must be 'project' or 'country-fund'" },
      { status: 400 }
    );
  }
  if (Number(amount) <= 0) {
    return NextResponse.json({ error: "amount must be greater than 0" }, { status: 400 });
  }
  if (type === "project" && !projects.some((p) => p.id === targetId)) {
    return NextResponse.json({ error: "Unknown project" }, { status: 404 });
  }
  if (type === "country-fund" && !countries.some((c) => c.slug === targetId)) {
    return NextResponse.json({ error: "Unknown country" }, { status: 404 });
  }

  const record = recordInvestment({
    investorName,
    type,
    targetId,
    amount: Number(amount),
  });

  return NextResponse.json({ investment: record }, { status: 201 });
}
