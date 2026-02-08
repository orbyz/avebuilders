import { notFound } from "next/navigation";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ClienteProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) notFound();

  await connectDB();

  const project = await Project.findOne({
    _id: id,
    email: session.user.email, // 🔒 solo su proyecto
  }).lean();

  if (!project) notFound();

  const data = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mi proyecto</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-app-muted">Proyecto</p>
            <p>{data.name}</p>
          </div>

          <div>
            <p className="text-app-muted">Estado</p>
            <span className="inline-block rounded bg-app-surface2 px-2 py-1 text-xs">
              {data.status}
            </span>
          </div>

          <div>
            <p className="text-app-muted">Fecha de inicio</p>
            <p>
              {data.createdAt
                ? new Date(data.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>

          <div className="pt-4 text-app-muted">
            Te iremos informando del avance de tu proyecto desde aquí.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
