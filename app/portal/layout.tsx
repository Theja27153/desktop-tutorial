import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PortalNav } from "@/components/layout/PortalNav";
import { LogoutButton } from "@/components/layout/LogoutButton";

export default function PortalLayout({ children }: { children: ReactNode }) {
  const session = getSession();
  if (!session) {
    redirect("/login?reason=unauthorized");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Worker Portal
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Welcome back, {session.user.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-slate-500">
              {session.user.role} · {session.user.department}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <PortalNav />
            <LogoutButton />
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}
