import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["cliente", "profesional"],
      default: "profesional",
    },
  },
  { timestamps: true },
);

export default models.User || model("User", UserSchema);
