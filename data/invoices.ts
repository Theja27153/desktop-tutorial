import { Invoice, InvoiceItem } from "@/types";
import { defaultWorkerId } from "./users";

const items = (rows: Array<Omit<InvoiceItem, "id" | "amount">>) =>
  rows.map((row, index) => ({
    ...row,
    id: `item-${index + 1}`,
    amount: row.quantity * row.rate,
  }));

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    number: "PC-2025-001",
    workerId: defaultWorkerId,
    clientName: "Sunrise Industrial Estates",
    projectName: "Logistics Hub",
    serviceCategory: "construction-support",
    date: "2025-01-14",
    status: "Pending",
    items: items([
      {
        description: "On-site coordination (month)",
        quantity: 1,
        rate: 185000,
      },
      {
        description: "Safety and compliance audits",
        quantity: 2,
        rate: 28000,
      },
    ]),
    gstRate: 18,
    subtotal: 185000 + 56000,
    total: Math.round((185000 + 56000) * 1.18),
    notes: "Awaiting client signature on MOM.",
  },
  {
    id: "inv-002",
    number: "PC-2025-002",
    workerId: defaultWorkerId,
    clientName: "Urban Bites Collective",
    projectName: "Cloud Kitchen Wave 2",
    serviceCategory: "restaurant-operations",
    date: "2025-02-02",
    status: "Approved",
    items: items([
      {
        description: "Launch readiness crew",
        quantity: 3,
        rate: 45000,
      },
      {
        description: "Vendor onboarding sprint",
        quantity: 1,
        rate: 60000,
      },
    ]),
    gstRate: 18,
    subtotal: 195000,
    total: Math.round(195000 * 1.18),
  },
  {
    id: "inv-003",
    number: "PC-2025-003",
    workerId: "worker-002",
    clientName: "Northstar Franchise Group",
    projectName: "Analytics Pod Setup",
    serviceCategory: "data-services",
    date: "2025-02-18",
    status: "Paid",
    items: items([
      {
        description: "Data audit & blueprint",
        quantity: 1,
        rate: 75000,
      },
      {
        description: "Dashboard development",
        quantity: 1,
        rate: 95000,
      },
    ]),
    gstRate: 18,
    subtotal: 170000,
    total: Math.round(170000 * 1.18),
  },
];
