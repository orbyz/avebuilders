export const dynamic = "force-dynamic";
import connectDB from "@/lib/db/mongoose";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import EmployeesClient from "./components/EmployeesClient";
import User from "@/lib/modules/users/model";
import "@/lib/register-models";
import { requireAuth } from "@/lib/auth/requireAuth";
import { redirect } from "next/navigation";

export default async function EmployeesPage() {
  const auth = await requireAuth();

  if ("error" in auth) {
    redirect("/login");
  }

  const employees = await EmployeeProfile.find()
    .populate("userId", "name email role isActive")
    .lean();

  const safeEmployees = employees.map((e) => ({
    ...e,
    _id: e._id.toString(),
    userId: {
      ...e.userId,
      _id: e.userId._id.toString(),
    },
  }));

  return <EmployeesClient employees={safeEmployees} />;
}
