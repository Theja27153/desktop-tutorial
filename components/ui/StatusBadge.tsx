import { InvoiceStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

const statusClasses: Record<InvoiceStatus, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-sky-100 text-sky-700",
  Paid: "bg-emerald-100 text-emerald-700",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
      statusClasses[status],
    )}
  >
    {status}
  </span>
);
