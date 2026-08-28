import { NextResponse } from "next/server";
import { businesses, sectors, computeTradeReadiness, countries } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const sector = searchParams.get("sector");

  let results = businesses;
  if (country) results = results.filter((b) => b.country === country);
  if (sector) results = results.filter((b) => b.sector === sector);

  return NextResponse.json({ businesses: results });
}

export async function POST(request) {
  const body = await request.json();
  const { name, country, sector, products, criteria } = body;

  if (!name || !country || !sector || !products) {
    return NextResponse.json(
      { error: "name, country, sector, and products are required" },
      { status: 400 }
    );
  }
  if (!countries.some((c) => c.slug === country)) {
    return NextResponse.json({ error: "Unknown country" }, { status: 404 });
  }
  if (!sectors.includes(sector)) {
    return NextResponse.json({ error: "Unknown sector" }, { status: 400 });
  }

  const { score, missing } = computeTradeReadiness(criteria || {});

  const business = {
    id: `biz-${Date.now()}`,
    name,
    country,
    sector,
    products,
    productionCapacity: body.productionCapacity || "",
    targetMarkets: body.targetMarkets || [],
    currentMarkets: body.currentMarkets || [],
    fundingRequired: body.fundingRequired ? Number(body.fundingRequired) : 0,
    expansionPlans: body.expansionPlans || "",
    certifications: body.certifications || "",
    contact: body.contact || "",
    partnershipRequirements: body.partnershipRequirements || "",
    criteria: criteria || {},
    tradeReadiness: score,
    missing,
  };

  businesses.push(business);

  return NextResponse.json({ business }, { status: 201 });
}
