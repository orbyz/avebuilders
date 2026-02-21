import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { requirePermission } from "@/lib/auth/requirePermission";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requirePermission("manage_users");

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  await connectDB();

  try {
    const { id } = await context.params;
    const body = await req.json();

    const profile = await EmployeeProfile.findById(id);

    if (!profile) {
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 },
      );
    }

    profile.dailyRate = body.dailyRate ?? profile.dailyRate;
    profile.hireDate = body.hireDate ?? profile.hireDate;
    profile.notes = body.notes ?? profile.notes;
    profile.isActive =
      body.isActive !== undefined ? body.isActive : profile.isActive;

    await profile.save();

    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error actualizando perfil" },
      { status: 400 },
    );
  }
}
