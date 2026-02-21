import mongoose, { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
  {
    payrollBatch: {
      type: Schema.Types.ObjectId,
      ref: "PayrollBatch",
      required: true,
    },
    amount: { type: Number, required: true },
    paidAt: { type: Date, default: Date.now },
    note: { type: String },
  },
  { timestamps: true },
);

export const Payment = models.Payment || model("Payment", PaymentSchema);
