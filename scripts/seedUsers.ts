import "dotenv/config";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model";
import bcrypt from "bcryptjs";

async function run() {
  await connectDB();

  const users = [
    {
      name: "Admin Root",
      email: "admin@test.com",
      password: "123456",
      role: "admin",
      accountType: "profesional",
    },
    {
      name: "Empleado Test",
      email: "empleado@test.com",
      password: "123456",
      role: "empleado",
      accountType: "profesional",
    },
    {
      name: "Cliente Test",
      email: "cliente@test.com",
      password: "123456",
      role: "cliente",
      accountType: "cliente",
    },
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      console.log(`⚠ ${u.email} ya existe`);
      continue;
    }

    const hashed = await bcrypt.hash(u.password, 10);

    await User.create({
      ...u,
      password: hashed,
      isActive: true,
    });

    console.log(`✔ Usuario creado: ${u.email}`);
  }

  process.exit();
}

run();
