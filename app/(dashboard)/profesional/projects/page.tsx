import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import Invoice from "@/lib/modules/finance/invoice.model";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await connectDB();

  const rawProjects = await Project.find().sort({ createdAt: -1 }).lean();

  const projectIds = rawProjects.map((p) => p._id);

  const rawInvoices = await Invoice.find({
    projectId: { $in: projectIds },
  }).lean();

  const now = new Date();

  const projects = rawProjects.map((project) => {
    const invoices = rawInvoices.filter(
      (inv) => inv.projectId.toString() === project._id.toString(),
    );

    const totalIncome = invoices
      .filter((i) => i.type === "income")
      .reduce((sum, i) => sum + Number(i.amount || 0), 0);

    const totalExpense = invoices
      .filter((i) => i.type === "expense")
      .reduce((sum, i) => sum + Number(i.amount || 0), 0);

    const hasOverdue = invoices.some(
      (i) => i.status === "pending" && i.dueDate && new Date(i.dueDate) < now,
    );

    return {
      ...project,
      totalIncome,
      totalExpense,
      hasOverdue,
    };
  });

  const serialized = JSON.parse(JSON.stringify(projects));

  return <ProjectsClient projects={serialized} />;
}
