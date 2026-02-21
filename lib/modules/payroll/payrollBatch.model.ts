import mongoose, { Schema, models, model } from "mongoose";

export interface IPayrollBatch {
  employee: mongoose.Types.ObjectId;
  weekStart: Date;
  weekEnd: Date;

  totalWorked: number;
  totalAdvance: number;
  netToPay: number;

  paidAmount: number;
  pendingAmount: number;

  status: "generated" | "partial" | "paid";

  createdAt: Date;
  updatedAt: Date;
}

const PayrollBatchSchema = new Schema<IPayrollBatch>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weekStart: {
      type: Date,
      required: true,
    },

    weekEnd: {
      type: Date,
      required: true,
    },

    totalWorked: {
      type: Number,
      required: true,
    },

    totalAdvance: {
      type: Number,
      default: 0,
    },

    netToPay: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    pendingAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["generated", "partial", "paid"],
      default: "generated",
    },
  },
  { timestamps: true },
);

PayrollBatchSchema.index({ employee: 1, weekStart: 1 });

export const PayrollBatch =
  models.PayrollBatch ||
  model<IPayrollBatch>("PayrollBatch", PayrollBatchSchema);
