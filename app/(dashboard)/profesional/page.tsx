import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import connectDB from "@/lib/mongoose";
import Lead from "@/lib/models/Lead";
import Project from "@/lib/models/Project";

export const dynamic = "force-dynamic";

export default async function ProfesionalDashboard() {
  await connectDB();

  const [leadsNuevos, proyectosActivos, proyectosFinalizados] =
    await Promise.all([
      Lead.countDocuments({ status: "nuevo" }),
      Project.countDocuments({ status: "activo" }),
      Project.countDocuments({ status: "finalizado" }),
    ]);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-app-muted">Leads nuevos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-app-accent">{leadsNuevos}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos activos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{proyectosActivos}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos finalizados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{proyectosFinalizados}</p>
        </CardContent>
      </Card>
    </div>
  );
}
