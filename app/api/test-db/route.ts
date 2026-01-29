import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("avebuilders");

    const collections = await db.collections();

    return NextResponse.json({
      ok: true,
      collections: collections.map((c) => c.collectionName),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Error conectando a MongoDB" },
      { status: 500 },
    );
  }
}
