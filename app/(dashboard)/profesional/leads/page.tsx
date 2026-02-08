import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";
import LeadsTableClient from "@/components/leads/LeadsTableClient";

export default async function LeadsPage() {
  await connectDB();
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
