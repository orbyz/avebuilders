import Link from "next/link";
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

export default async function ProjectsPage() {
  await connectDB();

  const rawProjects = await Project.find().sort({ createdAt: -1 }).lean();

  const projects = rawProjects.map((project) => ({
    ...project,
    _id: project._id.toString(),
    createdAt: project.createdAt?.toISOString(),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos</CardTitle>
      </CardHeader>

      <CardContent>
        {projects.length === 0 ? (
          <p className="text-app-muted">No hay proyectos todavía.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project: any) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <Link
                      href={`/profesional/projects/${project._id}`}
                      className="text-app-accent hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.email}</TableCell>
                  <TableCell>{project.phone || "—"}</TableCell>
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
