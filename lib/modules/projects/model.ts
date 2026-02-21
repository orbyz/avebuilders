import mongoose, { Schema, models, model } from "mongoose";
import { TimelineEventSchema } from "./timeline.schema";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
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
    location: {
      type: String,
    },

    status: {
      type: String,
      enum: ["activo", "finalizado", "cancelado"],
      default: "activo",
    },
    gallery: {
      before: { type: [String], default: [] },
      process: { type: [String], default: [] },
      after: { type: [String], default: [] },
    },

    coverImage: {
      type: String,
    },

    year: {
      type: Number,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    timeline: {
      type: [TimelineEventSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default models.Project || model("Project", ProjectSchema);
