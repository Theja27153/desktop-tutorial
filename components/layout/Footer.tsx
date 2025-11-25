import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Worker Login", href: "/login" },
];

export const Footer = () => (
  <footer className="mt-24 border-t border-slate-200 bg-slate-50">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[2fr,1fr,1fr]">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Padmavathi logo" width={48} height={48} />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Padmavathi</p>
            <p className="text-xl font-semibold text-slate-900">Constructions</p>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Building, managing, and scaling multi-sector businesses with trust and technology since
          2018.
        </p>
        <p className="text-xs text-slate-500">
          Plot 14, Housing Board, Karimnagar, Telangana, India • +91 90000 12345 •
          hello@padmavathi.co
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">Navigate</h4>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          {quickLinks.map((item) => (
            <Link key={item.label} href={item.href} className="block hover:text-[var(--color-burgundy)]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">Stay informed</h4>
        <p className="mt-3 text-sm text-slate-600">
          Subscribe for project updates, career opportunities, and technology launches.
        </p>
        <form className="mt-4 flex gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-[var(--color-burgundy)]"
            aria-label="Email address"
          />
          <button className="rounded-full bg-[var(--color-burgundy)] px-4 py-2 text-sm font-semibold text-white">
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div className="border-t border-white/60 bg-white py-4 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} Padmavathi Constructions. All rights reserved.
    </div>
  </footer>
);
