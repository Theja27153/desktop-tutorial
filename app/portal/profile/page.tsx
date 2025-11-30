import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ProfileEditor } from "@/components/portal/ProfileEditor";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
        <p className="mt-2 text-slate-600">
          Manage your personal information and account settings.
        </p>
      </div>
      <ProfileEditor initialData={session.user} />
    </div>
  );
}
