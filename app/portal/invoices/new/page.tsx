'use client';

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { serviceCategories } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { formatCurrency } from "@/lib/utils";

interface InvoiceItemInput {
  description: string;
  quantity: number;
  rate: number;
}

const emptyItem: InvoiceItemInput = { description: "", quantity: 1, rate: 0 };

export default function NewInvoicePage() {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [serviceCategory, setServiceCategory] = useState(serviceCategories[0].id);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [gstRate, setGstRate] = useState(18);
  const [items, setItems] = useState<InvoiceItemInput[]>([{ ...emptyItem }]);
  const [supportDocs, setSupportDocs] = useState<FileList | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const financials = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    const total = Math.round(subtotal * (1 + gstRate / 100));
    return { subtotal, total };
  }, [items, gstRate]);

  const handleItemChange = (index: number, key: keyof InvoiceItemInput, value: string) => {
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]: key === "description" ? value : Number(value),
            }
          : item,
      ),
    );
  };

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }]);
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!clientName) nextErrors.clientName = "Client name is required";
    if (!projectName) nextErrors.projectName = "Project or site is required";
    if (!serviceCategory) nextErrors.serviceCategory = "Select a service";
    if (items.some((item) => !item.description)) {
      nextErrors.items = "Provide a description for each line item";
    }
    if (items.some((item) => item.quantity <= 0 || item.rate <= 0)) {
      nextErrors.itemValues = "Quantity and rate must be greater than zero";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");
    if (!validate()) return;
    setLoading(true);

    const payload = {
      clientName,
      projectName,
      serviceCategory,
      date,
      gstRate,
      items: items.map((item, index) => ({
        ...item,
        id: `item-${index + 1}`,
        amount: item.quantity * item.rate,
      })),
      attachments: supportDocs ? Array.from(supportDocs).map((file) => file.name) : [],
    };

    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (response.ok) {
      setSuccessMessage("Invoice submitted successfully. Redirecting to the list...");
      setTimeout(() => router.push("/portal/invoices"), 1500);
    } else {
      setErrors({ form: "Unable to submit invoice. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Raise a new invoice</h1>
        <p className="text-sm text-slate-500">
          Fill in project, service, and line item information. All submissions are routed to finance
          for review.
        </p>
      </div>
      {errors.form && <p className="text-sm text-[var(--color-burgundy)]">{errors.form}</p>}
      {successMessage && <p className="text-sm text-[var(--color-green)]">{successMessage}</p>}
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Client name" htmlFor="clientName" required error={errors.clientName}>
            <input
              id="clientName"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            />
          </FormField>
          <FormField label="Project / Site / Branch" htmlFor="projectName" required error={errors.projectName}>
            <input
              id="projectName"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            />
          </FormField>
          <FormField
            label="Service category"
            htmlFor="serviceCategory"
            required
            error={errors.serviceCategory}
          >
            <select
              id="serviceCategory"
              value={serviceCategory}
              onChange={(event) => setServiceCategory(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            >
              {serviceCategories.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Invoice date" htmlFor="invoiceDate" required>
            <input
              type="date"
              id="invoiceDate"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            />
          </FormField>
          <FormField label="GST (%)" htmlFor="gstRate">
            <input
              type="number"
              id="gstRate"
              value={gstRate}
              min={0}
              onChange={(event) => setGstRate(Number(event.target.value))}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            />
          </FormField>
          <FormField label="Supporting documents" htmlFor="supportingDocs">
            <input
              type="file"
              id="supportingDocs"
              multiple
              onChange={(event) => setSupportDocs(event.target.files)}
              className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-green)] file:px-5 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
          </FormField>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Line items</h2>
            <p className="text-sm text-slate-500">
              Capture description, quantity, and rate for each deliverable.
            </p>
          </div>
          <Button type="button" variant="secondary" onClick={addItem}>
            Add item
          </Button>
        </div>
        {errors.items && <p className="mt-2 text-sm text-[var(--color-burgundy)]">{errors.items}</p>}
        {errors.itemValues && (
          <p className="text-sm text-[var(--color-burgundy)]">{errors.itemValues}</p>
        )}
        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <div
              key={`line-${index}`}
              className="grid gap-3 rounded-2xl border border-slate-100 p-4 md:grid-cols-[3fr,1fr,1fr,auto]"
            >
              <input
                placeholder="Description"
                value={item.description}
                onChange={(event) => handleItemChange(index, "description", event.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
              />
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => handleItemChange(index, "quantity", event.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
              />
              <input
                type="number"
                min={0}
                value={item.rate}
                onChange={(event) => handleItemChange(index, "rate", event.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
              />
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-700">
                  {formatCurrency(item.quantity * item.rate || 0)}
                </p>
                {items.length > 1 && (
                  <button
                    type="button"
                    className="text-xs font-semibold text-[var(--color-burgundy)]"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-right text-sm text-slate-700">
          <p>Subtotal: {formatCurrency(financials.subtotal)}</p>
          <p>GST ({gstRate}%): {formatCurrency(financials.subtotal * (gstRate / 100))}</p>
          <p className="text-lg font-semibold text-slate-900">
            Total due: {formatCurrency(financials.total)}
          </p>
        </div>
      </section>
      <div className="flex justify-end">
        <Button type="submit" size="lg" isLoading={loading}>
          Submit invoice
        </Button>
      </div>
    </form>
  );
}
