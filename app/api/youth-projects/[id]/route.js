import { NextResponse } from "next/server";
import { youthProjects, matchFundingOpportunities } from "@/lib/data";

export async function GET(_request, { params }) {
  const project = youthProjects.find((p) => p.id === params.id);
  if (!project) {
    return NextResponse.json({ error: "Youth project not found" }, { status: 404 });
  }
  const matches = matchFundingOpportunities(project);
  return NextResponse.json({ youthProject: project, matchingFunding: matches });
}
