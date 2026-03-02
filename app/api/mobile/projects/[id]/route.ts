import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import jwt from "jsonwebtoken";
import { calculateProjectFinance } from "@/lib/modules/projects/project-finance.service";
import Invoice from "@/lib/modules/finance/invoice.model";

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

    // 🟢 Nueva lógica centralizada
    const finance = await calculateProjectFinance(id);
    const invoices = await Invoice.find({ projectId: id }).lean();

    return NextResponse.json({
      project,
      finance,
      invoices,
    });
  } catch (error) {
    console.error("MOBILE PROJECT DETAIL ERROR:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
