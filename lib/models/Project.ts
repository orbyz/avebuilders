import mongoose, { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    clientName: String,
    clientEmail: String,
    service: String,
    description: String,

    status: {
      type: String,
      enum: ["activo", "en_progreso", "finalizado"],
      default: "activo",
    },

    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
    },
  },
  { timestamps: true },
);

export default models.Project || model("Project", ProjectSchema);
