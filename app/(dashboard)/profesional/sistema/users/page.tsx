import { redirect } from "next/navigation";
import { requirePermission } from "@/lib/auth/requirePermission";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const auth = await requirePermission("manage_users");

  if ("error" in auth) {
    if (auth.status === 401) {
      redirect("/login");
    }
    if (auth.status === 403) {
      redirect("/");
    }
  }

  return <UsersClient />;
}
