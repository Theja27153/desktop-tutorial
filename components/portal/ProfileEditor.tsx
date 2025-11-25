'use client';

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";

interface ProfileEditorProps {
  initialData: {
    name: string;
    email: string;
    role: string;
    department: string;
    phone?: string;
  };
}

export const ProfileEditor = ({ initialData }: ProfileEditorProps) => {
  const [formData, setFormData] = useState(initialData);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof typeof initialData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setIsSaving(false);
    setMessage(response.ok ? "Profile saved successfully." : "Unable to save profile.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Profile details</h2>
        <p className="text-sm text-slate-500">
          Keep your communication details updated for faster approvals.
        </p>
      </div>
      {message && <p className="text-sm text-[var(--color-green)]">{message}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label="Full name" htmlFor="name" required>
          <input
            id="name"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          />
        </FormField>
        <FormField label="Email" htmlFor="email" required>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          />
        </FormField>
        <FormField label="Role" htmlFor="role" required>
          <input
            id="role"
            value={formData.role}
            onChange={(event) => handleChange("role", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          />
        </FormField>
        <FormField label="Department" htmlFor="department" required>
          <input
            id="department"
            value={formData.department}
            onChange={(event) => handleChange("department", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          />
        </FormField>
        <FormField label="Phone number" htmlFor="phone">
          <input
            id="phone"
            value={formData.phone ?? ""}
            onChange={(event) => handleChange("phone", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          />
        </FormField>
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="lg" isLoading={isSaving}>
          Save profile
        </Button>
      </div>
    </form>
  );
};
