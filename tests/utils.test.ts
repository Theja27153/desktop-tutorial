import { describe, expect, it } from "vitest";
import { formatCurrency, generateInvoiceNumber } from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats INR with Indian digit grouping and no decimals", () => {
    const formatted = formatCurrency(1234567.8);
    expect(formatted).toContain("₹");
    expect(formatted).toContain("12,34,568");
  });
});

describe("generateInvoiceNumber", () => {
  it("pads the next sequence number and includes the current year", () => {
    const year = new Date().getFullYear();
    expect(generateInvoiceNumber(0)).toBe(`PC-${year}-001`);
    expect(generateInvoiceNumber(41)).toBe(`PC-${year}-042`);
  });
});
