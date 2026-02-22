import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { Advance } from "@/lib/modules/finance/advance.model";
import { EmployeeProfile } from "@/lib/modules/payroll/employeeProfile.model";
import User from "@/lib/modules/users/model";
import "@/lib/register-models";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const employee = searchParams.get("employee");

    const filter: any = {};
    if (employee) filter.employee = employee;

    const advances = await Advance.find(filter)
      .populate("employee", "fullName role")
      .sort({ date: -1 });

    return NextResponse.json(advances);
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo anticipos." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { employeeId, amount, date, note } = body;

    if (!employeeId || !amount) {
      return NextResponse.json(
        { error: "Empleado y monto son obligatorios." },
        { status: 400 },
      );
    }

    const profile = await EmployeeProfile.findOne({
      userId: employeeId,
    }).populate("userId", "name email role isActive");

    if (!profile) {
      return NextResponse.json(
        { error: "Empleado no encontrado." },
        { status: 404 },
      );
    }

    const advance = await Advance.create({
      employee: employeeId,
      amount,
      date: date ? new Date(date) : undefined,
      note,
    });

    return NextResponse.json(advance, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creando anticipo." },
      { status: 500 },
    );
  }
}
