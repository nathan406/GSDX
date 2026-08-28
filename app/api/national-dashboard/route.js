import { NextResponse } from "next/server";
import { nationalDashboard, countries } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const data = nationalDashboard(country || undefined);
  return NextResponse.json({
    country: country || "all",
    countryName: country ? countries.find((c) => c.slug === country)?.name : "All countries",
    ...data,
  });
}
