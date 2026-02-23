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
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔐 CONTROL DE ACCESO (RBAC)
    role: {
      type: String,
      enum: ["admin", "empleado", "cliente"],
      default: "cliente",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    mustChangePassword: {
      type: Boolean,
      default: false,
    },

    // 👇 SOLO SI ES PROFESIONAL
    professionalProfile: {
      type: ProfessionalProfileSchema,
      default: null,
    },
  },
  { timestamps: true },
);

export default models.User || model("User", UserSchema);
