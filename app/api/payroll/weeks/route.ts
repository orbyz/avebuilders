// app/api/mobile/payroll/weeks/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import { getPayrollWeeks } from "@/lib/services/payroll.service";
import { verifyMobileToken } from "@/lib/auth/verifyMobileToken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await verifyMobileToken(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getPayrollWeeks();

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET PAYROLL WEEKS ERROR:", error);

    return NextResponse.json(
      { error: "Error obteniendo semanas de nómina" },
      { status: 500 },
    );
  }
}
