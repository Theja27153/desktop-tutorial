import { SectionIntro } from "@/components/ui/SectionIntro";
import { Card } from "@/components/ui/Card";
import { companyTimeline, leadershipTeam, valuePropositions } from "@/data/company";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-5xl space-y-4 px-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/80">Since 2018</p>
          <h1 className="text-4xl font-semibold">Born in Karimnagar. Built for modern operators.</h1>
          <p className="text-base text-white/70">
            Padmavathi Constructions started as a site-readiness partner and evolved into a
            diversified commercial services company spanning construction, consulting, technology,
            hospitality, franchise management, and media.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-6 px-4 py-16">
        <SectionIntro
          eyebrow="Mission & Vision"
          title="We create resilient operating systems for ambitious businesses."
          description="Our teams combine engineering discipline, human-centered design, and data-backed governance."
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Mission",
              content:
                "Deliver dependable operations and decision intelligence so our clients can scale faster.",
            },
            {
              title: "Vision",
              content:
                "Be the most trusted commercial services partner for multi-sector businesses in South India.",
            },
            {
              title: "Values",
              content:
                "Integrity, transparency, disciplined execution, people-first leadership, and measurable impact.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.content}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <SectionIntro
            eyebrow="Timeline"
            title="A deliberate expansion into adjacent services"
            description="Each milestone reflects a real client need that shaped our multi-sector model."
          />
          <div className="space-y-4">
            {companyTimeline.map((event) => (
              <div
                key={event.year}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-green)]">
                    {event.year}
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 md:mt-0 md:max-w-lg">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16">
        <SectionIntro
          eyebrow="Leadership"
          title="Hands-on leaders with deep operational experience"
          description="The leadership collective spends time on-site, in franchise kitchens, and inside data rooms to stay close to execution."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {leadershipTeam.map((leader) => (
            <Card key={leader.id}>
              <h3 className="text-xl font-semibold text-slate-900">{leader.name}</h3>
              <p className="text-sm text-slate-500">{leader.title}</p>
              <p className="mt-3 text-sm text-slate-600">{leader.bio}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-burgundy)]">
                {leader.focus}
              </p>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#fbe9e9] to-[#f1f7ef] py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          <SectionIntro
            eyebrow="Operating Principles"
            title="Every engagement is anchored on four commitments"
            description="Our delivery promise extends across sectors because the underlying systems are universal."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {valuePropositions.map((value) => (
              <div key={value.id} className="rounded-3xl border border-white/70 bg-white/80 p-6">
                <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
