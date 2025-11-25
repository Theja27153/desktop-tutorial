'use client';

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("harsha@padmavathi.co");
  const [password, setPassword] = useState("build@123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setIsSubmitting(false);
    if (response.ok) {
      router.push("/portal/dashboard");
      router.refresh();
    } else {
      const payload = await response.json();
      setError(payload.message ?? "Invalid credentials");
    }
  };

  const reason = searchParams.get("reason");

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-[var(--color-burgundy)] p-10 text-white md:flex">
        <div>
          <Image src="/logo.svg" width={64} height={64} alt="Padmavathi logo" />
          <p className="mt-6 text-3xl font-semibold leading-snug">
            “Building, managing, and scaling multi-sector businesses with trust and technology.”
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white/80">Padmavathi Constructions</p>
          <p className="text-white/60">Karimnagar · Telangana · India</p>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-white px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center text-center">
            <Image src="/logo.svg" width={56} height={56} alt="Padmavathi logo" className="md:hidden" />
            <p className="mt-4 text-sm uppercase tracking-[0.35em] text-slate-500">
              Worker portal
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Sign in</h1>
            <p className="text-sm text-slate-500">
              Access invoices, status updates, and internal resources.
            </p>
            {reason === "unauthorized" && (
              <p className="mt-3 text-xs text-[var(--color-burgundy)]">
                Please log in to reach the portal.
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-800">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="password" className="font-semibold text-slate-800">
                  Password
                </label>
                <span className="text-slate-400">Forgot password?</span>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[var(--color-burgundy)]"
                required
              />
            </div>
            {error && <p className="text-xs text-[var(--color-burgundy)]">{error}</p>}
            <Button type="submit" size="lg" className="w-full justify-center" isLoading={isSubmitting}>
              Sign in
            </Button>
            <p className="text-center text-xs text-slate-500">
              Need an account? Contact the operations team.
            </p>
          </form>
          <div className="text-center text-xs text-slate-500">
            <Link href="/" className="text-[var(--color-burgundy)]">
              Back to corporate site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
