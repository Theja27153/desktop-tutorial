import Link from "next/link";
import { getSession } from "@/lib/auth";
import { listInvoices } from "@/lib/mock-db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function InvoiceListPage() {
  const session = getSession();
  if (!session) return null;
  const invoices = listInvoices(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">My invoices</h1>
          <p className="text-sm text-slate-500">
            Access every invoice submitted through the Padmavathi portal.
          </p>
        </div>
        <Link href="/portal/invoices/new">
          <Button>Raise invoice</Button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-4 py-3 font-semibold">{invoice.number}</td>
                <td className="px-4 py-3">{invoice.clientName}</td>
                <td className="px-4 py-3 capitalize">{invoice.serviceCategory.replace("-", " ")}</td>
                <td className="px-4 py-3">{invoice.date}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {formatCurrency(invoice.total)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/portal/invoices/${invoice.id}`}>
                    <Button variant="secondary" size="md">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
