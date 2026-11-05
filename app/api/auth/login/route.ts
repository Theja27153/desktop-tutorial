import { NextResponse } from "next/server";
import { createSession, verifyCredentials } from "@/lib/auth";
import { readJson } from "@/lib/http";

export async function POST(request: Request) {
  const body = await readJson<{ email?: unknown; password?: unknown }>(request);
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const { email, password } = body;
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  const user = verifyCredentials(email, password);
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const session = await createSession(user);
  return NextResponse.json({ user: session.user });
}
