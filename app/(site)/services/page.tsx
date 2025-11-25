import Link from "next/link";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import { serviceCategories } from "@/data/services";
import { ServiceEnquiryForm } from "@/components/forms/ServiceEnquiryForm";

export const metadata = {
  title: "Services",
};

export default function ServicesPage({
  searchParams,
}: {
  searchParams?: { service?: string | string[] };
}) {
  const serviceFromQuery = Array.isArray(searchParams?.service)
    ? searchParams?.service[0]
    : searchParams?.service;

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#f9eaea] to-[#eef6ed] py-16">
        <div className="mx-auto max-w-5xl space-y-5 px-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-burgundy)]">
            Services
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Six complementary service lines. One accountable partner.
          </h1>
          <p className="text-base text-slate-600">
            We combine project management rigor with digital command centers to orchestrate complex,
            multi-location operations.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16">
        <SectionIntro
          eyebrow="Service Catalogue"
          title="Detailed scope of work"
          description="Every engagement can be started as a sprint or a managed service retainer."
        />
        <div className="space-y-8">
          {serviceCategories.map((service) => (
            <Card key={service.id} className="border border-slate-200 bg-white" padded>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-green)]">
                    {service.slug.replace("-", " ")}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">{service.name}</h2>
                </div>
                <Link
                  href={`/services?service=${service.id}#service-form`}
                  className="rounded-full border border-[var(--color-burgundy)] px-5 py-2 text-sm font-semibold text-[var(--color-burgundy)]"
                >
                  Enquire for this service
                </Link>
              </div>
              <div className="grid gap-6 pt-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-600">{service.description}</p>
                  <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Typical engagements
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {service.engagements.map((task) => (
                      <li key={task} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-burgundy)]" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {service.highlights.map((highlight) => (
                      <li key={highlight}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <section id="service-form" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl space-y-8 px-4">
          <SectionIntro
            eyebrow="Service Enquiry"
            title="Tell us about your requirement"
            description="Share your context, timeline, and supporting documents. We respond within two business days."
          />
          <ServiceEnquiryForm initialService={serviceFromQuery} />
        </div>
      </section>
    </div>
  );
}
