import { getSession } from "@/lib/auth";
import { ProfileEditor } from "@/components/portal/ProfileEditor";

export default function ProfilePage() {
  const session = getSession();
  if (!session) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-gradient-to-r from-[#fbe9e9] to-[#f1f7ef] p-6">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Worker profile</p>
        <h1 className="text-3xl font-semibold text-slate-900">{session.user.name}</h1>
        <p className="text-sm text-slate-600">
          {session.user.role} · {session.user.department}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Update your contact, department, and role details when changes occur so approvals and
          notifications stay accurate.
        </p>
      </div>
      <ProfileEditor
        initialData={{
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
          department: session.user.department,
        }}
      />
    </div>
  );
}
