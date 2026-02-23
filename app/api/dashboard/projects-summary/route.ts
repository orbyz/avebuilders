import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import Invoice from "@/lib/modules/finance/invoice.model";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";

export async function GET() {
  await connectDB();

  const projects = await Project.find().lean();
  const invoices = await Invoice.find().lean();
  const worklogs = await WorkLog.find().lean();

  const now = new Date();

  const summary = projects.map((project: any) => {
    const projectInvoices = invoices.filter(
      (inv: any) => inv.projectId?.toString() === project._id.toString(),
    );

    const projectWorklogs = worklogs.filter(
      (wl: any) => wl.project?.toString() === project._id.toString(),
    );

    const totalIncome = projectInvoices
      .filter((i: any) => i.type === "income")
      .reduce((sum: number, i: any) => sum + (i.amount ?? 0), 0);

    const totalExpenses = projectInvoices
      .filter((i: any) => i.type === "expense")
      .reduce((sum: number, i: any) => sum + (i.amount ?? 0), 0);

    const labourCost = projectWorklogs.reduce(
      (sum: number, w: any) => sum + (w.dailyRateSnapshot ?? 0),
      0,
    );

    const realProfit = totalIncome - (totalExpenses + labourCost);

    const marginPercentage =
      totalIncome > 0 ? (realProfit / totalIncome) * 100 : 0;

    const overdueInvoices = projectInvoices.filter(
      (i: any) =>
        i.status === "pending" && i.dueDate && new Date(i.dueDate) < now,
    ).length;

    const pendingExpenses = projectInvoices.filter(
      (i: any) => i.type === "expense" && i.status === "pending",
    ).length;

    return {
      _id: project._id.toString(),
      name: project.name,
      status: project.status,
      totalIncome,
      totalExpenses,
      labourCost,
      realProfit,
      marginPercentage,
      overdueInvoices,
      pendingExpenses,
    };
  });

  return NextResponse.json(summary);
}
