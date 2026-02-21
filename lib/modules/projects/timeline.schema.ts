import { Schema } from "mongoose";

export const TimelineEventSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "note",
        "status_change",
        "budget_created",
        "budget_approved",
        "client_message",
        "system_event",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    meta: {
      type: Schema.Types.Mixed,
      default: null,
    },

    createdBy: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);
