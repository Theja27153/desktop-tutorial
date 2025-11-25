import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
}

export const FormField = ({
  label,
  htmlFor,
  children,
  required,
  description,
  error,
  className,
}: FormFieldProps) => (
  <div className={cn("space-y-2", className)}>
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-2 text-sm font-semibold text-slate-800"
    >
      {label}
      {required && <span className="text-[var(--color-burgundy)]">*</span>}
    </label>
    {description && <p className="text-xs text-slate-500">{description}</p>}
    {children}
    {error && <p className="text-xs text-[var(--color-burgundy)]">{error}</p>}
  </div>
);
