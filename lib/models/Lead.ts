import mongoose, { Schema, models } from "mongoose";

const LeadSchema = new Schema(
  {
    nombre: String,
    email: String,
    telefono: String,
    tipoReforma: String,
    descripcion: String,
    metrosAprox: Number,
    ubicacion: String,
    presupuestoEstimado: String,
    urgencia: String,
    estado: { type: String, default: "nuevo" },
  },
  { timestamps: true },
);

export default models.Lead || mongoose.model("Lead", LeadSchema);
