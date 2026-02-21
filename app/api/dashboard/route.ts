import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/lib/modules/leads/model";
import Project from "@/lib/modules/projects/model";
import Candidate from "@/lib/models/Candidate";

export const dynamic = "force-dynamic";

function groupByStatus(items: any[]) {
  return items.reduce(
    (acc, item) => {
      const key = item.status || "sin_estado";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

export async function GET() {
  await connectDB();

  const leads = await Lead.find({});
  const projects = await Project.find({});
  const candidates = await Candidate.find({});

  return NextResponse.json({
    leads: {
      total: leads.length,
      byStatus: groupByStatus(leads),
    },
    projects: {
      total: projects.length,
      byStatus: groupByStatus(projects),
    },
    candidates: {
      total: candidates.length,
      byStatus: groupByStatus(candidates),
    },
  });
}
