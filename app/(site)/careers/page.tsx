import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import { jobPostings } from "@/data/jobs";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";

export const metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl space-y-4 px-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">Careers at Padmavathi</p>
          <h1 className="text-4xl font-semibold">Build multi-sector expertise with us.</h1>
          <p className="text-base text-white/70">
            We are a people-first company investing in engineers, analysts, culinary experts, and
            storytellers who love operating in high-trust environments.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16">
        <SectionIntro
          eyebrow="Work Culture"
          title="Structured, transparent, growth-minded"
          description="We combine field exposure with modern tooling, mentorship, and rotational programs."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {jobPostings.map((job) => (
            <Card key={job.id}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {job.location}
                </span>
              </div>
              <p className="text-sm text-slate-500">{job.department}</p>
              <p className="mt-3 text-sm text-slate-600">{job.description}</p>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Responsibilities
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-green)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-burgundy)]">
                Experience: {job.experience}
              </p>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl space-y-8 px-4">
          <SectionIntro
            eyebrow="Apply"
            title="Send us your profile"
            description="Fill the form and upload your CV. We acknowledge every application."
          />
          <CareerApplicationForm />
        </div>
      </section>
    </div>
  );
}
