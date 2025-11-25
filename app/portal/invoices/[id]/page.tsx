import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvoiceById } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const invoice = getInvoiceById(params.id);
  if (!invoice) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Invoice</p>
          <h1 className="text-3xl font-semibold text-slate-900">{invoice.number}</h1>
          <p className="text-sm text-slate-500">{invoice.clientName}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="md" disabled>
            Download as PDF (soon)
          </Button>
          <Link href="/portal/invoices">
            <Button size="md">Back to list</Button>
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <p className="text-sm font-semibold text-slate-500">Client</p>
            <p className="text-lg text-slate-900">{invoice.clientName}</p>
            <p className="text-sm text-slate-500">{invoice.projectName}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Date</p>
            <p className="text-lg text-slate-900">{invoice.date}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Status</p>
            <StatusBadge status={invoice.status} />
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-3">Description</th>
                <th className="py-3">Qty</th>
                <th className="py-3">Rate</th>
                <th className="py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-semibold text-slate-800">{item.description}</td>
                  <td className="py-3">{item.quantity}</td>
                  <td className="py-3">{formatCurrency(item.rate)}</td>
                  <td className="py-3 text-right">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600 md:items-end">
          <p>Subtotal: {formatCurrency(invoice.subtotal)}</p>
          <p>
            GST ({invoice.gstRate}%): {formatCurrency(invoice.subtotal * (invoice.gstRate / 100))}
          </p>
          <p className="text-lg font-semibold text-slate-900">
            Total: {formatCurrency(invoice.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
