'use client';

import { useState } from "react";
import { serviceCategories } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";

interface ServiceEnquiryFormProps {
  initialService?: string;
}

export const ServiceEnquiryForm = ({ initialService }: ServiceEnquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceId: initialService ?? serviceCategories[0].id,
    message: "",
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({ type: "error", message: "Please complete the required fields." });
      return;
    }
    setIsSubmitting(true);
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        attachment: attachment?.name,
      }),
    });
    setIsSubmitting(false);
    if (response.ok) {
      setStatus({ type: "success", message: "Thank you. Our team will connect shortly." });
      setFormData({ ...formData, name: "", email: "", phone: "", company: "", message: "" });
      setAttachment(null);
    } else {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-slate-900">Enquire about a service</h3>
      {status && (
        <p
          className={`text-sm ${
            status.type === "success" ? "text-[var(--color-green)]" : "text-[var(--color-burgundy)]"
          }`}
        >
          {status.message}
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Full name" htmlFor="service-name" required>
          <input
            id="service-name"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Company (optional)" htmlFor="service-company">
          <input
            id="service-company"
            value={formData.company}
            onChange={(event) => handleChange("company", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          />
        </FormField>
        <FormField label="Email" htmlFor="service-email" required>
          <input
            id="service-email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Phone" htmlFor="service-phone" required>
          <input
            id="service-phone"
            value={formData.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Service interested in" htmlFor="service-id" required>
          <select
            id="service-id"
            value={formData.serviceId}
            onChange={(event) => handleChange("serviceId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          >
            {serviceCategories.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Attachment (optional)" htmlFor="service-attachment">
          <input
            type="file"
            id="service-attachment"
            onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
            className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-green)] file:px-5 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </FormField>
      </div>
      <FormField label="How can we help?" htmlFor="service-message" required>
        <textarea
          id="service-message"
          value={formData.message}
          onChange={(event) => handleChange("message", event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          required
        />
      </FormField>
      <Button type="submit" size="lg" isLoading={isSubmitting}>
        Enquire now
      </Button>
    </form>
  );
};
