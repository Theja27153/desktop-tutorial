import { NextResponse } from "next/server";
import { readJson } from "@/lib/http";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }
  // Demo only: in production, forward to a CRM or ticketing system.
  // Avoid logging the body, which contains personal contact details.
  console.info("Business enquiry received");
  return NextResponse.json({ success: true, message: "Thanks, we will get back to you shortly." });
}
