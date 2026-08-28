import { NextResponse } from "next/server";
import { crossBorderMatch, countries } from "@/lib/data";

// POST { businessId, targetCountry }
export async function POST(request) {
  const { businessId, targetCountry } = await request.json();

  if (!businessId || !targetCountry) {
    return NextResponse.json(
      { error: "businessId and targetCountry are required" },
      { status: 400 }
    );
  }
  if (!countries.some((c) => c.slug === targetCountry)) {
    return NextResponse.json({ error: "Unknown target country" }, { status: 404 });
  }

  const result = crossBorderMatch(businessId, targetCountry);
  if (!result) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}
