import { NextResponse } from "next/server";
import { projects, scoreMatch } from "@/lib/data";

// POST an investor profile, get back ranked matching projects.
// Body: { capital, sectors: [], regions: [], minAmount, maxAmount }
export async function POST(request) {
  const profile = await request.json();

  if (!profile.sectors?.length && !profile.regions?.length) {
    return NextResponse.json(
      { error: "Provide at least one sector or region to match against." },
      { status: 400 }
    );
  }

  const ranked = projects
    .map((project) => ({
      project,
      matchScore: scoreMatch(profile, project),
    }))
    .filter((r) => r.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  return NextResponse.json({ matches: ranked });
}
