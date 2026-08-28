import { NextResponse } from "next/server";
import { megaProjects } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  let results = megaProjects;
  if (country) results = results.filter((mp) => mp.country === country);
  return NextResponse.json({ megaProjects: results });
}
