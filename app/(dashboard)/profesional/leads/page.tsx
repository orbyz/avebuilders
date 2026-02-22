import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import connectDB from "@/lib/db/mongoose";
import Lead from "@/lib/modules/leads/model";
import LeadsTableClient from "@/components/leads/LeadsTableClient";
import { requirePermission } from "@/lib/auth/requirePermission";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await connectDB();
  const auth = await requirePermission("manage_projects");

  if ("error" in auth) {
    if (auth.status === 401) {
      redirect("/login");
    }
    if (auth.status === 403) {
      redirect("/");
    }
  }

  const rawLeads = await Lead.find().sort({ createdAt: -1 }).lean();

  const leads = rawLeads.map((lead) => ({
    ...lead,
    _id: lead._id.toString(),
    createdAt: lead.createdAt?.toISOString(),
    updatedAt: lead.updatedAt?.toISOString(),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads</CardTitle>
      </CardHeader>

      <CardContent>
        {leads.length === 0 ? (
          <p className="text-app-muted">No hay leads todavía.</p>
        ) : (
          <LeadsTableClient leads={leads} />
        )}
      </CardContent>
    </Card>
  );
}
