// app/(dashboard)/profesional/page.tsx

import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import Invoice from "@/lib/modules/finance/invoice.model";
import { WorkLog } from "@/lib/modules/payroll/worklog.model";
import ProjectsSummaryTable from "@/components/app/dashboard/ProjectsSummaryTable";
import DashboardKPIsCompact from "@/components/app/dashboard/DashboardKPIsCompact";
import { calculateProjectFinance } from "@/lib/modules/projects/project-finance.service";

export const dynamic = "force-dynamic";

export default async function ProfesionalDashboard() {
  await connectDB();

  const projects = await Project.find().lean();

  const summary = await Promise.all(
    projects.map(async (project: any) => {
      const finance = await calculateProjectFinance(project._id.toString());

      return {
        _id: project._id.toString(),
        name: project.name,
        status: project.status,
        ...finance,
      };
    }),
  );

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Centro de Control</h1>

      <DashboardKPIsCompact data={summary} />
      <ProjectsSummaryTable data={summary} />
    </div>
  );
}
