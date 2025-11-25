import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // In production, forward to CRM or ticketing system.
  console.info("Business enquiry received", body);
  return NextResponse.json({ success: true, message: "Thanks, we will get back to you shortly." });
}
