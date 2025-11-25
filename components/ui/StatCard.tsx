interface StatCardProps {
  label: string;
  value: string | number;
  helper?: string;
  accent?: "burgundy" | "green";
}

export const StatCard = ({
  label,
  value,
  helper,
  accent = "burgundy",
}: StatCardProps) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p
      className={`mt-2 text-3xl font-semibold ${
        accent === "burgundy" ? "text-[var(--color-burgundy)]" : "text-[var(--color-green)]"
      }`}
    >
      {value}
    </p>
    {helper && <p className="mt-2 text-xs text-slate-500">{helper}</p>}
  </div>
);
