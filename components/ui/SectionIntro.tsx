interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export const SectionIntro = ({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionIntroProps) => (
  <div className={`space-y-3 ${align === "center" ? "text-center" : "text-left"}`}>
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-green)]">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h2>
    {description && <p className="text-base text-slate-600">{description}</p>}
  </div>
);
