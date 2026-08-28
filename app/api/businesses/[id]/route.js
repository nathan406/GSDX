import { NextResponse } from "next/server";
import { businesses, matchFundingOpportunities } from "@/lib/data";

export async function GET(_request, { params }) {
  const business = businesses.find((b) => b.id === params.id);
  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }
  const matches = matchFundingOpportunities(business);
  return NextResponse.json({ business, matchingFunding: matches });
}
