import { NextResponse } from "next/server";
import { projects } from "@/lib/data";

export async function GET(_request, { params }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  return NextResponse.json({ project });
}
