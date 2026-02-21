import mongoose, { Schema, models, model } from "mongoose";

const CandidateSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    profession: { type: String, required: true },
    experience: { type: String },
    cvUrl: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: true },
);

export default models.Candidate || model("Candidate", CandidateSchema);
