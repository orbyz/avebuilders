import { NextRequest } from "next/server";
import connectDB from "@/lib/db/mongoose";
import "@/lib/db/register.models";
import { getPayrollReceiptData } from "@/lib/services/payroll.service";
import PDFDocument from "pdfkit";
import { verifyMobileToken } from "@/lib/auth/verifyMobileToken";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const user = await verifyMobileToken(req);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;

  const { batch, payments } = await getPayrollReceiptData(id);

  const doc = new PDFDocument();

  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  const stream = new Promise<Uint8Array>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });

  // 🧾 CONTENIDO

  doc.fontSize(18).text("RECIBO DE NÓMINA", { align: "center" });

  doc.moveDown();

  doc.fontSize(12).text(`Empleado: ${batch.employee.name}`);
  doc.text(`Email: ${batch.employee.email}`);
  doc.text(
    `Semana: ${new Date(batch.weekStart).toLocaleDateString()} - ${new Date(
      batch.weekEnd,
    ).toLocaleDateString()}`,
  );

  doc.moveDown();

  doc.text(`Total trabajado: €${batch.totalWorked}`);
  doc.text(`Anticipos: €${batch.totalAdvance}`);
  doc.text(`Neto a pagar: €${batch.netToPay}`);

  doc.moveDown();

  doc.text(`Pagado: €${batch.paidAmount}`);
  doc.text(`Pendiente: €${batch.pendingAmount}`);
  doc.text(`Estado: ${batch.status}`);

  doc.moveDown();

  doc.text("Historial de pagos:");

  payments.forEach((p: any) => {
    doc.text(
      `- €${p.amount} | ${new Date(p.paidAt).toLocaleDateString()} | ${
        p.note || ""
      }`,
    );
  });

  doc.end();

  const pdfBuffer = await stream;

  return new Response(Buffer.from(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=payroll-${id}.pdf`,
    },
  });
}
