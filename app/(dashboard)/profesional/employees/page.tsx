export const dynamic = "force-dynamic";
import connectDB from "@/lib/db/mongoose";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import EmployeesClient from "./components/EmployeesClient";
import User from "@/lib/modules/users/model";
import "@/lib/register-models";
import { requirePermission } from "@/lib/auth/requirePermission";
import { redirect } from "next/navigation";

export default async function EmployeesPage() {
  const auth = await requirePermission("manage_employees");

  if ("error" in auth) {
    if (auth.status === 401) redirect("/login");
    if (auth.status === 403) redirect("/");
  }

  const employees = await EmployeeProfile.find()
    .populate("userId", "name email role isActive")
    .lean();

  const safeEmployees = employees
    .filter((e) => e.userId)
    .map((e: any) => ({
      _id: e._id.toString(),
      dailyRate: e.dailyRate,
      isActive: e.isActive,
      createdAt: e.createdAt?.toISOString() ?? null,
      updatedAt: e.updatedAt?.toISOString() ?? null,
      userId: {
        _id: e.userId._id.toString(),
        name: e.userId.name,
        email: e.userId.email,
        role: e.userId.role,
        isActive: e.userId.isActive,
      },
    }));

  return <EmployeesClient employees={safeEmployees} />;
}
