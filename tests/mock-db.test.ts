import { describe, expect, it } from "vitest";
import { createInvoice, updateWorkerProfile, validateInvoiceInput } from "@/lib/mock-db";

const validPayload = {
  clientName: "Acme Builders",
  projectName: "Warehouse",
  serviceCategory: "construction",
  date: "2026-01-15",
  gstRate: 18,
  items: [
    { description: "Cement", quantity: 10, rate: 400, amount: 1 },
    { description: "Labour", quantity: 2, rate: 1500, amount: 999999 },
  ],
};

describe("validateInvoiceInput + createInvoice", () => {
  it("recomputes line amounts and totals, ignoring client-supplied amounts", () => {
    const result = validateInvoiceInput(validPayload);
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const invoice = createInvoice({ workerId: "worker-001", ...result.value });
    expect(invoice.items.map((i) => i.amount)).toEqual([4000, 3000]);
    expect(invoice.subtotal).toBe(7000);
    expect(invoice.total).toBe(8260);
    expect(invoice.status).toBe("Pending");
  });

  it.each([
    [{ ...validPayload, clientName: "" }, "clientName"],
    [{ ...validPayload, gstRate: 150 }, "gstRate"],
    [{ ...validPayload, items: [] }, "line item"],
    [{ ...validPayload, items: [{ description: "x", quantity: 0, rate: 1 }] }, "quantity"],
    [{ ...validPayload, items: [{ description: "x", quantity: 1, rate: -5 }] }, "rate"],
  ])("rejects invalid payloads (%#)", (payload, message) => {
    const result = validateInvoiceInput(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain(message);
  });
});

describe("updateWorkerProfile", () => {
  it("never returns the stored password", () => {
    const updated = updateWorkerProfile("worker-001", { department: "Site Ops" });
    expect(updated).not.toBeNull();
    expect(updated).not.toHaveProperty("password");
    expect(updated?.department).toBe("Site Ops");
  });
});
