import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson } from "@/lib/http";
import { updateWorkerProfile } from "@/lib/mock-db";

const EDITABLE_FIELDS = ["name", "email", "role", "department"] as const;
type EditableField = (typeof EDITABLE_FIELDS)[number];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await readJson<Record<string, unknown>>(request);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  // Only accept whitelisted string fields; ignore everything else (e.g. id, password).
  const updates: Partial<Record<EditableField, string>> = {};
  for (const field of EDITABLE_FIELDS) {
    const value = body[field];
    if (typeof value === "string" && value.trim()) {
      updates[field] = value.trim();
    }
  }

  const updated = updateWorkerProfile(session.user.id, updates);
  if (!updated) {
    return NextResponse.json({ message: "Unable to update profile" }, { status: 400 });
  }

  return NextResponse.json({ user: updated });
}
