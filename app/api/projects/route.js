import { NextResponse } from "next/server";
import { projects, stages } from "@/lib/data";

// NOTE: this mutates the in-memory array for demo purposes only.
// Restart the server to reset. Swap for a real database in production.

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const sector = searchParams.get("sector");
  const stage = searchParams.get("stage");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");

  let results = projects;

  if (country) results = results.filter((p) => p.country === country);
  if (sector) results = results.filter((p) => p.sector === sector);
  if (stage) results = results.filter((p) => p.stage === stage);
  if (minAmount) results = results.filter((p) => p.amountRequested >= Number(minAmount));
  if (maxAmount) results = results.filter((p) => p.amountRequested <= Number(maxAmount));

  return NextResponse.json({ projects: results });
}

export async function POST(request) {
  const body = await request.json();

  if (!body.name || !body.country || !body.sector || !body.amountRequested) {
    return NextResponse.json(
      { error: "name, country, sector, and amountRequested are required" },
      { status: 400 }
    );
  }

  const newProject = {
    id: `${body.country}-${Date.now()}`,
    name: body.name,
    country: body.country,
    sector: body.sector,
    stage: stages[0],
    amountRequested: Number(body.amountRequested),
    currency: body.currency || "USD",
    readiness: 0,
    readinessBreakdown: {
      financial: 0,
      technical: 0,
      legal: 0,
      government: 0,
      market: 0,
      execution: 0,
      impact: 0,
      environmental: 0,
    },
    jobsExpected: body.jobsExpected ? Number(body.jobsExpected) : 0,
    completion: 0,
    summary: body.summary || "",
  };

  projects.push(newProject);

  return NextResponse.json({ project: newProject }, { status: 201 });
}
