'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard" },
  { href: "/portal/invoices/new", label: "Raise Invoice" },
  { href: "/portal/invoices", label: "My Invoices" },
  { href: "/portal/profile", label: "Profile" },
];

export const PortalNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {navItems.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              active
                ? "border-[var(--color-burgundy)] bg-[var(--color-burgundy)] text-white"
                : "border-slate-200 text-slate-600 hover:border-[var(--color-burgundy)] hover:text-[var(--color-burgundy)]",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
