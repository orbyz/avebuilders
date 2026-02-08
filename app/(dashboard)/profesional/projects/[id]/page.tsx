import { notFound } from "next/navigation";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProjectStatusClient from "@/components/projects/ProjectStatusClient";
import AddProjectNote from "@/components/projects/AddProjectNote";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const project = await Project.findById(id).lean();

  if (!project) notFound();

  const data = {
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
    updatedAt: project.updatedAt?.toISOString(),
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalle del proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-app-muted">Cliente</p>
            <p>{data.name}</p>
          </div>

          <div>
            <p className="text-app-muted">Email</p>
            <p>{data.email}</p>
          </div>

          <div>
            <p className="text-app-muted">Teléfono</p>
            <p>{data.phone || "—"}</p>
          </div>

          <div>
            <p className="text-app-muted">Creado</p>
            <p>
              {data.createdAt
                ? new Date(data.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </CardContent>

        <CardHeader>
          <CardTitle>Historial del proyecto</CardTitle>
        </CardHeader>
        <AddProjectNote projectId={data._id} />
        <CardContent>
          {!data.timeline || data.timeline.length === 0 ? (
            <p className="text-sm text-app-muted pt-4">Sin actividad aún.</p>
          ) : (
            <ul className="space-y-3">
              {data.timeline.map((event: any, index: number) => (
                <li
                  key={index}
                  className="rounded border border-app-border bg-app-surface2 p-3 text-sm"
                >
                  <p>{event.message}</p>
                  <p className="text-xs text-app-muted mt-1">
                    {new Date(event.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Estado (interactivo) */}
      <ProjectStatusClient projectId={data._id} status={data.status} />
    </div>
  );
}
