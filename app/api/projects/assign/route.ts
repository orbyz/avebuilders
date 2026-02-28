import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import User from "@/lib/modules/users/model";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { projectId, employeeIds } = await req.json();

    if (!projectId || !Array.isArray(employeeIds)) {
      return NextResponse.json(
        { error: "projectId y employeeIds requeridos" },
        { status: 400 },
      );
    }

    // Validar que todos sean empleados reales
    const validEmployees = await User.find({
      _id: { $in: employeeIds },
      role: "empleado",
    }).select("_id");

    if (validEmployees.length !== employeeIds.length) {
      return NextResponse.json(
        { error: "Uno o más usuarios no son empleados válidos" },
        { status: 400 },
      );
    }

    await Project.findByIdAndUpdate(projectId, {
      assignedEmployees: employeeIds,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ASSIGN ERROR:", error);
    return NextResponse.json(
      { error: "Error asignando empleados" },
      { status: 500 },
    );
  }
}
