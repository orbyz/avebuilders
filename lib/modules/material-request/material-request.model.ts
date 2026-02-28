import mongoose, { Schema, model, models } from "mongoose";

const MaterialRequestSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    estimatedCost: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "converted"],
      default: "pending",
      index: true,
    },
    adminComment: {
      type: String,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    convertedToInvoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
  },
  { timestamps: true },
);

MaterialRequestSchema.index({ projectId: 1, status: 1 });

export default models.MaterialRequest ||
  model("MaterialRequest", MaterialRequestSchema);
