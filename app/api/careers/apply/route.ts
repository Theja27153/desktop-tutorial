import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.info("Career application received", body);
  return NextResponse.json({
    success: true,
    message: "Application submitted. Our talent team will connect within two business days.",
  });
}
