import mongoose, { Schema, models, model } from "mongoose";

const LeadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: ["nuevo", "contactado", "convertido"],
      default: "nuevo",
    },
  },
  { timestamps: true },
);

export default models.Lead || model("Lead", LeadSchema);
