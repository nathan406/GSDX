import { NextResponse } from "next/server";
import {
  projects,
  youthProjects,
  businesses,
  matchFundingOpportunities,
} from "@/lib/data";

// POST { kind: 'project' | 'youth' | 'business', id: '...' }
export async function POST(request) {
  const { kind, id } = await request.json();

  let target;
  if (kind === "project") target = projects.find((p) => p.id === id);
  else if (kind === "youth") target = youthProjects.find((p) => p.id === id);
  else if (kind === "business") target = businesses.find((b) => b.id === id);

  if (!kind || !id || !["project", "youth", "business"].includes(kind)) {
    return NextResponse.json(
      { error: "kind must be 'project', 'youth', or 'business', and id is required" },
      { status: 400 }
    );
  }
  if (!target) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const matches = matchFundingOpportunities(target);
  return NextResponse.json({ target, matches });
}
