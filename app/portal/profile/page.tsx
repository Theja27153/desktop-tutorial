import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateWorkerProfile } from "@/lib/mock-db";

export async function POST(request: Request) {
  const session = await getSession();   // ✅ FIX: await added

  if (!session || !session.user) {      // ✅ FIX: safe check
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const updated = updateWorkerProfile(session.user.id, body);

  if (!updated) {
    return NextResponse.json(
      { message: "Unable to update profile" },
      { status: 400 }
    );
  }

  return NextResponse.json({ user: updated });
}
