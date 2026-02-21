import bcrypt from "bcryptjs";
import User from "./model";
import connectDB from "@/lib/db/mongoose";
import { EmployeeProfile } from "../payroll/employeeProfile.model";

export async function getAllUsers() {
  await connectDB();

  return User.find({}, "-password").sort({ createdAt: -1 });
}

export async function getUserById(id: string) {
  await connectDB();

  return User.findById(id, "-password");
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "empleado" | "cliente";
}) {
  await connectDB();

  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error("Email ya registrado");
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role,
    isActive: true,
    mustChangePassword: false,
  });

  // 🔹 Si es empleado, crear perfil laboral
  if (data.role === "empleado") {
    await EmployeeProfile.create({
      userId: createdUser._id,
      dailyRate: 0,
    });
  }

  return createdUser;
}

export async function updateUser(
  id: string,
  updates: Partial<{
    name: string;
    email: string;
    role: "admin" | "empleado" | "cliente";
    isActive: boolean;
  }>,
) {
  await connectDB();

  const user = await User.findById(id);
  if (!user) throw new Error("Usuario no encontrado");

  const isCurrentlyAdmin = user.role === "admin";

  // 🔐 Contar admins actuales
  const adminCount = await User.countDocuments({ role: "admin" });

  // ❌ No permitir quitar rol al último admin
  if (
    isCurrentlyAdmin &&
    updates.role &&
    updates.role !== "admin" &&
    adminCount <= 1
  ) {
    throw new Error("No se puede remover el último administrador");
  }

  // ❌ No permitir desactivar al último admin
  if (isCurrentlyAdmin && updates.isActive === false && adminCount <= 1) {
    throw new Error("No se puede desactivar el último administrador");
  }

  Object.assign(user, updates);

  await user.save();

  return user;
}

export async function resetPassword(id: string, newPassword: string) {
  await connectDB();

  const user = await User.findById(id);

  if (!user.isActive) {
    throw new Error("No se puede resetear contraseña de usuario inactivo");
  }

  if (!user) throw new Error("Usuario no encontrado");

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  user.mustChangePassword = true;

  await user.save();

  return true;
}
