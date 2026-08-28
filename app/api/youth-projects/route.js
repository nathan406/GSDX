import { NextResponse } from "next/server";
import { youthProjects, youthSectors, computeYouthReadiness, countries } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const sector = searchParams.get("sector");
  const status = searchParams.get("status");

  let results = youthProjects;
  if (country) results = results.filter((p) => p.country === country);
  if (sector) results = results.filter((p) => p.sector === sector);
  if (status) results = results.filter((p) => p.status === status);

  return NextResponse.json({ youthProjects: results });
}

export async function POST(request) {
  const body = await request.json();
  const { name, country, sector, submitterName, summary, fundingRequired, criteria } = body;

  if (!name || !country || !sector || !submitterName) {
    return NextResponse.json(
      { error: "name, country, sector, and submitterName are required" },
      { status: 400 }
    );
  }
  if (!countries.some((c) => c.slug === country)) {
    return NextResponse.json({ error: "Unknown country" }, { status: 404 });
  }
  if (!youthSectors.includes(sector)) {
    return NextResponse.json({ error: "Unknown sector" }, { status: 400 });
  }

  const { score, missing } = computeYouthReadiness(criteria || {});

  const project = {
    id: `yp-${Date.now()}`,
    name,
    country,
    sector,
    submitterName,
    ageRange: body.ageRange || "",
    summary: summary || "",
    fundingRequired: fundingRequired ? Number(fundingRequired) : 0,
    youngPeopleReached: body.youngPeopleReached ? Number(body.youngPeopleReached) : 0,
    jobsExpected: body.jobsExpected ? Number(body.jobsExpected) : 0,
    beneficiaries: body.beneficiaries ? Number(body.beneficiaries) : 0,
    sdgs: body.sdgs || [],
    status: "Idea",
    criteria: criteria || {},
    readinessScore: score,
    missing,
    supporters: 0,
    comments: [],
  };

  youthProjects.push(project);

  return NextResponse.json({ youthProject: project }, { status: 201 });
}
