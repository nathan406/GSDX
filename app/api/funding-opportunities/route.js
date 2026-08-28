import { NextResponse } from "next/server";
import { fundingOpportunities } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sector = searchParams.get("sector");
  const type = searchParams.get("type");

  let results = fundingOpportunities;
  if (sector) results = results.filter((f) => f.sectors.includes(sector));
  if (type) results = results.filter((f) => f.type === type);

  return NextResponse.json({ fundingOpportunities: results });
}
