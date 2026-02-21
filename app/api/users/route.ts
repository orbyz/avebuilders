import { NextRequest, NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/requirePermission";
import { getAllUsers } from "@/lib/modules/users/service";
import { createUser } from "@/lib/modules/users/service";

export async function GET() {
  const auth = await requirePermission("manage_users");
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const users = await getAllUsers();

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission("manage_users");

  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password || !body.role) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const user = await createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error creando usuario" },
      { status: 400 },
    );
  }
}
