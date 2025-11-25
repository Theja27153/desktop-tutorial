import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createInvoice, listInvoices } from "@/lib/mock-db";

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const invoices = listInvoices(session.user.id);
  return NextResponse.json({ invoices });
}

export async function POST(request: Request) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const payload = await request.json();
  const invoice = createInvoice({
    workerId: session.user.id,
    clientName: payload.clientName,
    projectName: payload.projectName,
    serviceCategory: payload.serviceCategory,
    date: payload.date,
    gstRate: payload.gstRate ?? 18,
    items: payload.items ?? [],
    attachments: payload.attachments ?? [],
  });
  return NextResponse.json({ invoice }, { status: 201 });
}
