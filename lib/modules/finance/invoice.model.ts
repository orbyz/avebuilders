import mongoose, { Schema, models } from "mongoose";

const InvoiceSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    invoiceNumber: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"], // ingreso o gasto
      required: true,
    },
    concept: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    dueDate: Date,
  },
  { timestamps: true },
);

export default models.Invoice || mongoose.model("Invoice", InvoiceSchema);
