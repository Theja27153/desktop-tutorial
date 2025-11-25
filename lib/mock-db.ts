import crypto from "crypto";
import { invoices as seedInvoices } from "@/data/invoices";
import { users } from "@/data/users";
import { DashboardSummary, Invoice, InvoiceItem } from "@/types";
import { generateInvoiceNumber } from "./utils";

let invoicesStore = [...seedInvoices];

export const listInvoices = (workerId?: string) =>
  workerId
    ? invoicesStore.filter((invoice) => invoice.workerId === workerId)
    : invoicesStore;

export const getInvoiceById = (id: string) =>
  invoicesStore.find((invoice) => invoice.id === id);

export const createInvoice = (payload: {
  workerId: string;
  clientName: string;
  projectName: string;
  serviceCategory: string;
  date: string;
  gstRate: number;
  items: InvoiceItem[];
  attachments?: string[];
}) => {
  const subtotal = payload.items.reduce((acc, item) => acc + item.amount, 0);
  const total = Math.round(subtotal * (1 + payload.gstRate / 100));
  const invoice: Invoice = {
    id: crypto.randomUUID(),
    number: generateInvoiceNumber(invoicesStore.length),
    status: "Pending",
    notes: "Submitted via worker portal",
    ...payload,
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

export const updateWorkerProfile = (userId: string, data: Partial<typeof users[number]>) => {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) return null;
  users[userIndex] = { ...users[userIndex], ...data };
  return users[userIndex];
};
