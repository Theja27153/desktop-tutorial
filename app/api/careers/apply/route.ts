import { NextResponse } from "next/server";
import { readJson } from "@/lib/http";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }
  // Demo only: avoid logging the body, which contains applicant personal data.
  console.info("Career application received");
  return NextResponse.json({
    success: true,
    message: "Application submitted. Our talent team will connect within two business days.",
  });
}
