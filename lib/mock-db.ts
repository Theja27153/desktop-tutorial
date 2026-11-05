import crypto from "crypto";
import { invoices as seedInvoices } from "@/data/invoices";
import { users } from "@/data/users";
import { DashboardSummary, Invoice, InvoiceItem, User } from "@/types";
import { generateInvoiceNumber } from "./utils";

let invoicesStore = [...seedInvoices];

export const listInvoices = (workerId?: string) =>
  workerId
    ? invoicesStore.filter((invoice) => invoice.workerId === workerId)
    : invoicesStore;

export const getInvoiceById = (id: string) =>
  invoicesStore.find((invoice) => invoice.id === id);

export type InvoiceInput = {
  clientName: string;
  projectName: string;
  serviceCategory: string;
  date: string;
  gstRate: number;
  items: InvoiceItem[];
  attachments: string[];
};

type ValidationResult = { ok: true; value: InvoiceInput } | { ok: false; error: string };

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Validate an untrusted invoice payload. Line amounts and totals from the client are ignored. */
export const validateInvoiceInput = (payload: unknown): ValidationResult => {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invoice payload must be an object." };
  }
  const p = payload as Record<string, unknown>;

  for (const field of ["clientName", "projectName", "serviceCategory", "date"] as const) {
    if (!isNonEmptyString(p[field])) {
      return { ok: false, error: `${field} is required.` };
    }
  }

  const gstRate = p.gstRate === undefined ? 18 : Number(p.gstRate);
  if (!Number.isFinite(gstRate) || gstRate < 0 || gstRate > 100) {
    return { ok: false, error: "gstRate must be between 0 and 100." };
  }

  if (!Array.isArray(p.items) || p.items.length === 0) {
    return { ok: false, error: "At least one line item is required." };
  }

  const items: InvoiceItem[] = [];
  for (const [index, raw] of p.items.entries()) {
    const item = (raw ?? {}) as Record<string, unknown>;
    const quantity = Number(item.quantity);
    const rate = Number(item.rate);
    if (!isNonEmptyString(item.description)) {
      return { ok: false, error: `Item ${index + 1}: description is required.` };
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return { ok: false, error: `Item ${index + 1}: quantity must be greater than 0.` };
    }
    if (!Number.isFinite(rate) || rate < 0) {
      return { ok: false, error: `Item ${index + 1}: rate must be 0 or more.` };
    }
    items.push({
      id: isNonEmptyString(item.id) ? item.id : crypto.randomUUID(),
      description: item.description.trim(),
      quantity,
      rate,
      amount: 0, // recomputed in createInvoice
    });
  }

  const attachments = Array.isArray(p.attachments)
    ? p.attachments.filter((a): a is string => typeof a === "string")
    : [];

  return {
    ok: true,
    value: {
      clientName: (p.clientName as string).trim(),
      projectName: (p.projectName as string).trim(),
      serviceCategory: (p.serviceCategory as string).trim(),
      date: (p.date as string).trim(),
      gstRate,
      items,
      attachments,
    },
  };
};

export const createInvoice = (payload: InvoiceInput & { workerId: string }) => {
  // Never trust client-supplied amounts: recompute every line and the totals server-side.
  const items = payload.items.map((item) => ({ ...item, amount: item.quantity * item.rate }));
  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const total = Math.round(subtotal * (1 + payload.gstRate / 100));
  const invoice: Invoice = {
    id: crypto.randomUUID(),
    number: generateInvoiceNumber(invoicesStore.length),
    status: "Pending",
    notes: "Submitted via worker portal",
    ...payload,
    items,
    subtotal,
    total,
  };

  invoicesStore = [invoice, ...invoicesStore];
  return invoice;
};

export const getDashboardSummary = (workerId: string): DashboardSummary => {
  const workerInvoices = listInvoices(workerId);
  return {
    totalInvoices: workerInvoices.length,
    pending: workerInvoices.filter((i) => i.status === "Pending").length,
    approved: workerInvoices.filter((i) => i.status === "Approved").length,
    paid: workerInvoices.filter((i) => i.status === "Paid").length,
  };
};

type ProfileUpdate = Partial<Pick<User, "name" | "email" | "role" | "department">>;

/** Update a worker's editable profile fields. Never returns the stored password. */
export const updateWorkerProfile = (userId: string, data: ProfileUpdate) => {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) return null;
  const { name, email, role, department } = { ...users[userIndex], ...data };
  users[userIndex] = { ...users[userIndex], name, email, role, department };
  return { id: userId, name, email, role, department };
};
