import { NextResponse } from "next/server";
import { MOBILE_MONEY_PROVIDERS, OTHER_AFRICA_MOBILE_MONEY, countries } from "@/lib/data";

export async function GET() {
  const byCountry = countries.map((c) => ({
    country: c.slug,
    countryName: c.name,
    region: c.region,
    providers: MOBILE_MONEY_PROVIDERS[c.slug] || [],
  }));

  return NextResponse.json({
    byCountry,
    otherAfricaProviders: OTHER_AFRICA_MOBILE_MONEY,
  });
}
