import { NextResponse } from "next/server";
import {
  youthDashboard,
  youthProjects,
  businesses,
  tradeOpportunities,
  projects,
  countries,
  projectFundedAmount,
  nationalDashboard,
} from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  const youth = youthDashboard(country || undefined);
  const national = nationalDashboard(country || undefined);

  const scopedProjects = country ? projects.filter((p) => p.country === country) : projects;
  const scopedBusinesses = country ? businesses.filter((b) => b.country === country) : businesses;
  const scopedTrade = country ? tradeOpportunities.filter((t) => t.country === country) : tradeOpportunities;

  const capitalMobilized = scopedProjects.reduce((s, p) => s + projectFundedAmount(p.id), 0);

  return NextResponse.json({
    country: country || "all",
    countryName: country ? countries.find((c) => c.slug === country)?.name : "All countries",
    youth,
    national,
    projects: {
      total: scopedProjects.length,
      investmentReady: scopedProjects.filter((p) =>
        ["Investment ready", "Capital matching", "Financing", "Implementation"].includes(p.stage)
      ).length,
      capitalMobilized,
    },
    businesses: {
      total: scopedBusinesses.length,
      tradeReady: scopedBusinesses.filter((b) => b.tradeReadiness >= 70).length,
    },
    trade: {
      openOpportunities: scopedTrade.length,
      capitalSought: scopedTrade.reduce((s, t) => s + t.capitalRequired, 0),
    },
  });
}
