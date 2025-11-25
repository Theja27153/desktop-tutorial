import Link from "next/link";
import { getSession } from "@/lib/auth";
import { getDashboardSummary, listInvoices } from "@/lib/mock-db";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const session = getSession();
  if (!session) return null;

  const summary = getDashboardSummary(session.user.id);
  const invoices = listInvoices(session.user.id).slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total invoices" value={summary.totalInvoices} helper="All-time" />
        <StatCard label="Pending" value={summary.pending} accent="green" />
        <StatCard label="Approved" value={summary.approved} />
        <StatCard label="Paid" value={summary.paid} accent="green" />
      </section>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent invoices</h2>
            <p className="text-sm text-slate-500">Track submissions and statuses in real time.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/portal/invoices/new">
              <Button size="md">Raise invoice</Button>
            </Link>
            <Link href="/portal/invoices">
              <Button variant="secondary" size="md">
                View all
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3">Invoice</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="text-sm text-slate-700">
                  <td className="py-3 font-semibold">{invoice.number}</td>
                  <td className="py-3">{invoice.clientName}</td>
                  <td className="py-3">{invoice.date}</td>
                  <td className="py-3">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="py-3 text-right font-semibold">{formatCurrency(invoice.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
