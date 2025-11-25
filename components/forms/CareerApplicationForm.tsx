'use client';

import { useState } from "react";
import { jobPostings } from "@/data/jobs";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";

export const CareerApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    positionId: jobPostings[0].id,
    experienceYears: 1,
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: field === "experienceYears" ? Number(value) : value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({ type: "error", message: "Please fill in the required fields." });
      return;
    }
    setSubmitting(true);
    const response = await fetch("/api/careers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        resume: resume?.name,
      }),
    });
    setSubmitting(false);
    if (response.ok) {
      setStatus({ type: "success", message: "Application submitted successfully!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        positionId: jobPostings[0].id,
        experienceYears: 1,
        message: "",
      });
      setResume(null);
    } else {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-semibold text-slate-900">Apply now</h3>
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
        <FormField label="Full name" htmlFor="career-name" required>
          <input
            id="career-name"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Email" htmlFor="career-email" required>
          <input
            id="career-email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Phone" htmlFor="career-phone" required>
          <input
            id="career-phone"
            value={formData.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Position applying for" htmlFor="career-position" required>
          <select
            id="career-position"
            value={formData.positionId}
            onChange={(event) => handleChange("positionId", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          >
            {jobPostings.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Experience (years)" htmlFor="career-experience" required>
          <input
            id="career-experience"
            type="number"
            min={0}
            value={formData.experienceYears}
            onChange={(event) => handleChange("experienceYears", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
            required
          />
        </FormField>
        <FormField label="Upload CV" htmlFor="career-resume">
          <input
            type="file"
            id="career-resume"
            onChange={(event) => setResume(event.target.files?.[0] ?? null)}
            className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-green)] file:px-5 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </FormField>
      </div>
      <FormField label="Short message" htmlFor="career-message" required>
        <textarea
          id="career-message"
          value={formData.message}
          onChange={(event) => handleChange("message", event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
          required
        />
      </FormField>
      <Button type="submit" size="lg" isLoading={submitting}>
        Submit application
      </Button>
    </form>
  );
};
