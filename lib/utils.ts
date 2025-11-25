import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const generateInvoiceNumber = (currentCount: number) => {
  const padded = (currentCount + 1).toString().padStart(3, "0");
  const year = new Date().getFullYear();
  return `PC-${year}-${padded}`;
};
