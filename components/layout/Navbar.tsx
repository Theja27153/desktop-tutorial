import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => (
  <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.svg" alt="Padmavathi Constructions" width={42} height={42} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Padmavathi
          </p>
          <p className="text-lg font-semibold text-slate-900">Constructions</p>
        </div>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-[var(--color-burgundy)]">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/services" className="hidden text-sm font-semibold text-slate-600 md:block">
          View Services
        </Link>
        <Link href="/login">
          <Button size="md">Worker Login</Button>
        </Link>
      </div>
    </div>
  </header>
);
