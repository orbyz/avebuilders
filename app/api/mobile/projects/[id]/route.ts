import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import Invoice from "@/lib/modules/finance/invoice.model";
import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.MOBILE_JWT_SECRET as string,
    ) as { id: string; role: string };

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const invoices = await Invoice.find({ projectId: id });

    const totalIncome = invoices
      .filter((i) => i.type === "income")
      .reduce((sum, i) => sum + i.amount, 0);

    const totalExpense = invoices
      .filter((i) => i.type === "expense")
      .reduce((sum, i) => sum + i.amount, 0);

    return NextResponse.json({
      project,
      summary: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      },
    });
  } catch (error) {
    console.error("MOBILE PROJECT DETAIL ERROR:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
