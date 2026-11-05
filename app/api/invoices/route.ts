import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJson } from "@/lib/http";
import { createInvoice, listInvoices, validateInvoiceInput } from "@/lib/mock-db";

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const invoices = listInvoices(session.user.id);
  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await readJson(request);
  if (!payload) {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateInvoiceInput(payload);
  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  const invoice = createInvoice({ workerId: session.user.id, ...result.value });
  return NextResponse.json({ invoice }, { status: 201 });
}
