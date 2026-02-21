import mongoose, { Schema, models, model } from "mongoose";

export interface IAdvance {
  employee: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  payrollBatch?: mongoose.Types.ObjectId;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdvanceSchema = new Schema<IAdvance>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    payrollBatch: {
      type: Schema.Types.ObjectId,
      ref: "PayrollBatch",
    },
    note: { type: String },
  },
  { timestamps: true },
);

AdvanceSchema.index({ employee: 1, date: 1 });

export const Advance =
  models.Advance || model<IAdvance>("Advance", AdvanceSchema);
