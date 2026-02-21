import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const worklog = await WorkLog.find({ project: id })
      .populate("employee", "name email")
      .sort({ date: -1 })
      .lean();
    console.log(worklog);

    if (!worklog) {
      return NextResponse.json(
        { error: "Registro no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(worklog);
  } catch (error) {
    console.error("GET worklog error:", error);

    return NextResponse.json(
      { error: "Error obteniendo registro." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await req.json();

    const worklog = await WorkLog.findById(id);

    if (!worklog) {
      return NextResponse.json(
        { error: "Registro no encontrado." },
        { status: 404 },
      );
    }

    if (worklog.status === "closed") {
      return NextResponse.json(
        { error: "No se puede modificar un registro cerrado." },
        { status: 400 },
      );
    }

    if (body.date) {
      worklog.date = new Date(body.date);
    }

    if (body.projectId) {
      worklog.project = body.projectId;
    }

    if (body.employeeId) {
      const profile = await EmployeeProfile.findOne({
        userId: body.employeeId,
        isActive: true,
      });

      if (!profile) {
        return NextResponse.json(
          { error: "Empleado no encontrado." },
          { status: 404 },
        );
      }

      worklog.employee = body.employeeId;
      worklog.dailyRateSnapshot = profile.dailyRate;
    }

    await worklog.save();

    return NextResponse.json(worklog);
  } catch (error) {
    console.error("PATCH worklog error:", error);

    return NextResponse.json(
      { error: "Error actualizando registro." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const worklog = await WorkLog.findById(id);

    if (!worklog) {
      return NextResponse.json(
        { error: "Registro no encontrado." },
        { status: 404 },
      );
    }

    if (worklog.status === "closed") {
      return NextResponse.json(
        { error: "No se puede eliminar un registro cerrado." },
        { status: 400 },
      );
    }

    await worklog.deleteOne();

    return NextResponse.json({
      message: "Registro eliminado correctamente.",
    });
  } catch (error) {
    console.error("DELETE worklog error:", error);

    return NextResponse.json(
      { error: "Error eliminando registro." },
      { status: 500 },
    );
  }
}
