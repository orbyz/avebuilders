import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db/mongoose";
import { generatePayrollBatch } from "@/lib/services/payroll.service";
import User from "@/lib/modules/users/model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { employeeId, start, end } = body;

    if (!employeeId || !start || !end) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios." },
        { status: 400 },
      );
    }

    const batch = await generatePayrollBatch(
      employeeId,
      new Date(start),
      new Date(end),
    );

    return NextResponse.json(batch);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
