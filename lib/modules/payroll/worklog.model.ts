import mongoose, { Schema, models, model } from "mongoose";

export interface IWorkLog {
  employee: mongoose.Types.ObjectId; // ref User
  project: mongoose.Types.ObjectId; // ref Project
  date: Date;
  dailyRateSnapshot: number;
  status: "open" | "closed";
  createdAt: Date;
  updatedAt: Date;
  weekStart: Date;
}

const WorkLogSchema = new Schema<IWorkLog>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    weekStart: {
      type: Date,
      required: true,
    },
    dailyRateSnapshot: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true },
);

WorkLogSchema.index({ employee: 1 });
WorkLogSchema.index({ project: 1 });
WorkLogSchema.index({ date: 1 });
WorkLogSchema.index({ employee: 1, weekStart: 1, status: 1 });

export const WorkLog =
  models.WorkLog || model<IWorkLog>("WorkLog", WorkLogSchema);
