require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 🔹 Conexión directa (solo para el seed)
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI no definido");
  }

  await mongoose.connect(process.env.MONGODB_URI);
}

// 🔹 Esquema mínimo SOLO para el seed
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  await connectDB();

  const exists = await User.findOne({ email: "admin@avebuilders.com" });

  if (exists) {
    console.log("⚠️ Usuario ya existe");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin Profesional",
    email: "admin@avebuilders.com",
    password: hashed,
    role: "profesional",
  });

  console.log("✅ Usuario temporal creado");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
