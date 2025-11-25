import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import { valuePropositions, caseStudies } from "@/data/company";
import { serviceCategories } from "@/data/services";

export default function HomePage() {
  return (
    <div className="space-y-20 bg-white">
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-green)]">
              Karimnagar · Telangana
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Building, managing, and scaling multi-sector businesses with trust and technology.
            </h1>
            <p className="text-base text-slate-600">
              Padmavathi Constructions partners with infrastructure owners, franchise groups, F&B
              brands, and digital ventures to deliver reliable operations, data intelligence, and
              media experiences.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services">
                <Button size="lg">View Services</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Card>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Image src="/logo.svg" alt="Padmavathi logo" width={60} height={60} />
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                      Since 2018
                    </p>
                    <p className="text-2xl font-semibold text-slate-900">Trusted operator</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Sectors managed", value: "6+" },
                    { label: "Active experts", value: "120+" },
                    { label: "Projects delivered", value: "75+" },
                    { label: "Cities supported", value: "18" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-slate-50 p-4 text-sm">
                      <p className="text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <div className="absolute -right-6 -top-6 hidden rounded-2xl bg-white/90 p-4 shadow-lg md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-burgundy)]">
                24/7
              </p>
              <p className="text-lg font-semibold text-slate-900">Command Center</p>
              <p className="text-xs text-slate-500">Ops desk for escalations & reporting</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionIntro
          eyebrow="Our Verticals"
          title="Cross-industry specialists with one accountable partner"
          description="Modular services that cover ground operations, strategy, data, hospitality, franchise management, and media execution."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {serviceCategories.map((service) => (
            <div key={service.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[var(--color-green)]">{service.name}</p>
              <p className="mt-3 text-base text-slate-600">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {service.engagements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-burgundy)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionIntro
          eyebrow="Why Padmavathi"
          title="Engineered for reliability, governed for trust"
          description="Our delivery playbooks combine on-ground expertise with data-backed decision-making."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {valuePropositions.map((value) => (
            <Card key={value.id}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                {value.id}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-2 text-base text-slate-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <SectionIntro
            eyebrow="Case Studies"
            title="Measurable impact across sectors"
            description="Representative highlights from recent engagements."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((project) => (
              <div key={project.id} className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">{project.sector}</p>
                <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-white/80">{project.summary}</p>
                <p className="mt-3 text-sm font-semibold text-white/90">{project.outcome}</p>
                <ul className="mt-3 space-y-1 text-xs text-white/70">
                  {project.metrics.map((metric) => (
                    <li key={metric}>• {metric}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-10 px-4">
        <SectionIntro
          eyebrow="Karimnagar Roots"
          title="Based in Telangana, serving projects nationwide"
          description="Visit us or schedule an on-site review."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Head Office</h3>
            <p className="mt-2 text-sm text-slate-600">
              Plot 14, Housing Board Colony
              <br />
              Karimnagar, Telangana 505001
            </p>
            <p className="mt-4 text-sm text-slate-600">
              +91 90000 12345
              <br />
              hello@padmavathi.co
            </p>
            <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-[var(--color-burgundy)]">
              Arrange a visit →
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Work with us</h3>
            <p className="mt-2 text-sm text-slate-600">
              Looking for a partner to run multi-city operations or join our team? Share your brief
              and we will respond within two business days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/careers">
                <Button size="md">View Careers</Button>
              </Link>
              <Link href="/contact">
                <Button size="md" variant="secondary">
                  Business Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
