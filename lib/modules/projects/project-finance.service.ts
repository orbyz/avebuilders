import mongoose from "mongoose";
import Invoice from "@/lib/modules/finance/invoice.model";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";

export async function calculateProjectFinance(projectId: string) {
  const objectId = new mongoose.Types.ObjectId(projectId);
  const now = new Date();

  const invoices = await Invoice.find({ projectId: objectId }).lean();
  const worklogs = await WorkLog.find({ project: objectId }).lean();

  const totalIncome = invoices
    .filter((i) => i.type === "income")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const totalExpenses = invoices
    .filter((i) => i.type === "expense")
    .reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const labourCost = worklogs.reduce(
    (sum, w) => sum + Number(w.dailyRateSnapshot || 0),
    0,
  );

  const realProfit = totalIncome - (totalExpenses + labourCost);

  const marginPercentage =
    totalIncome > 0 ? (realProfit / totalIncome) * 100 : 0;

  const overdueInvoices = invoices.filter(
    (i) => i.status === "pending" && i.dueDate && new Date(i.dueDate) < now,
  ).length;

  return {
    totalIncome,
    totalExpenses,
    labourCost,
    realProfit,
    marginPercentage,
    overdueInvoices,
  };
}
