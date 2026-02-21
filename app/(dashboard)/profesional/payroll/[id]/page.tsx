import connectDB from "@/lib/db/mongoose";
import { PayrollBatch } from "@/lib/modules/payroll/payrollBatch.model";
import { Payment } from "@/lib/modules/payroll/payment.model";
import User from "@/lib/modules/users/model";
import PayrollDetailClient from "./PayrollDetailClient";

export default async function PayrollDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const { id } = await params;

  const batch = await PayrollBatch.findById(id)
    .populate("employee", "name email")
    .lean();

  if (!batch) {
    return <div>Nómina no encontrada.</div>;
  }

  const payments = await Payment.find({ payrollBatch: id })
    .sort({ createdAt: -1 })
    .lean();

  const plainBatch = JSON.parse(JSON.stringify(batch));
  const plainPayments = JSON.parse(JSON.stringify(payments));

  return <PayrollDetailClient batch={plainBatch} payments={plainPayments} />;
}
