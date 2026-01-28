import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor proporciona un nombre"],
  },
  email: {
    type: String,
    required: [true, "Por favor proporciona un email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Por favor proporciona una contraseña"],
  },
  role: {
    type: String,
    enum: ["client", "professional", "admin"],
    default: "client",
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
