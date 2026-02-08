import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import connectDB from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ClienteDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <p>No autorizado</p>;
  }

  await connectDB();

  const rawProjects = await Project.find({
    email: session.user.email,
  })
    .sort({ createdAt: -1 })
    .lean();

  const projects = rawProjects.map((project) => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis proyectos</CardTitle>
      </CardHeader>

      <CardContent>
        {projects.length === 0 ? (
          <p className="text-app-muted">Aún no tienes proyectos activos.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project: any) => (
                <TableRow key={project._id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>
                    <span className="text-xs rounded bg-app-surface2 px-2 py-1">
                      {project.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
