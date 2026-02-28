import { NextResponse } from "next/server";
import ConnectDB from "@/lib/db/mongoose";
import MaterialRequest from "@/lib/modules/material-request/material-request.model";

export async function GET(req: Request) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "projectId requerido" },
        { status: 400 },
      );
    }

    const requests = await MaterialRequest.find({ projectId })
      .populate("requestedBy", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("GET MATERIAL REQUEST ERROR:", error);
    return NextResponse.json(
      { error: "Error obteniendo solicitudes" },
      { status: 500 },
    );
  }
}
