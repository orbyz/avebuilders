import mongoose, { Schema, models, model } from "mongoose";

const LeadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    service: String,
    message: String,
    status: {
      type: String,
      enum: ["nuevo", "contactado", "en_proceso", "cerrado"],
      default: "nuevo",
    },
  },
  { timestamps: true },
);

export default models.Lead || model("Lead", LeadSchema);
