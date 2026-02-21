import mongoose, { Schema, models, model } from "mongoose";

export interface IEmployeeProfile {
  userId: mongoose.Types.ObjectId;
  dailyRate: number;
  isActive: boolean;
  hireDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeProfileSchema = new Schema<IEmployeeProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    dailyRate: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
    hireDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true },
);

EmployeeProfileSchema.index({ isActive: 1 });

export const EmployeeProfile =
  models.EmployeeProfile ||
  model<IEmployeeProfile>("EmployeeProfile", EmployeeProfileSchema);
