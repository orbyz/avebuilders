import mongoose, { Schema, models, model } from "mongoose";

const ProfessionalProfileSchema = new Schema(
  {
    companyName: String,
    phone: String,
    address: String,
    services: [String],
    description: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["cliente", "profesional", "admin"],
      default: "profesional",
    },

    // 👇 SOLO PARA PROFESIONALES
    professionalProfile: {
      type: ProfessionalProfileSchema,
      default: null,
    },
  },
  { timestamps: true },
);

export default models.User || model("User", UserSchema);
