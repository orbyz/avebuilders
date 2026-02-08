import mongoose, { Schema, models, model } from "mongoose";

const TimelineSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["status", "note", "system"],
      required: true,
    },
    message: String,
    createdBy: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    service: {
      type: String,
    },

    status: {
      type: String,
      enum: ["activo", "finalizado", "cancelado"],
      default: "activo",
    },

    timeline: {
      type: [TimelineSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default models.Project || model("Project", ProjectSchema);
