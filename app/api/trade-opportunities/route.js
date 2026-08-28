import { NextResponse } from "next/server";
import { tradeOpportunities, businesses } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const sector = searchParams.get("sector");

  let results = tradeOpportunities;
  if (country) results = results.filter((t) => t.country === country);
  if (sector) results = results.filter((t) => t.sector === sector);

  const withBusiness = results.map((t) => ({
    ...t,
    business: businesses.find((b) => b.id === t.relatedBusiness) || null,
  }));

  return NextResponse.json({ tradeOpportunities: withBusiness });
}
