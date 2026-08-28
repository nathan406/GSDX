import { NextResponse } from "next/server";
import { addYouthSupport, addYouthComment, youthProjects } from "@/lib/data";

export async function POST(request, { params }) {
  const body = await request.json();
  const project = youthProjects.find((p) => p.id === params.id);
  if (!project) {
    return NextResponse.json({ error: "Youth project not found" }, { status: 404 });
  }

  if (body.type === "support") {
    const updated = addYouthSupport(params.id);
    return NextResponse.json({ supporters: updated.supporters });
  }

  if (body.type === "comment") {
    if (!body.name || !body.comment) {
      return NextResponse.json({ error: "name and comment are required" }, { status: 400 });
    }
    const entry = addYouthComment(params.id, body.name, body.comment);
    return NextResponse.json({ comment: entry }, { status: 201 });
  }

  return NextResponse.json({ error: "type must be 'support' or 'comment'" }, { status: 400 });
}
