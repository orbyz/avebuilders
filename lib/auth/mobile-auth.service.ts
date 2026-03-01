import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ConnectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model"; // Ajusta si tu User está en otra ruta

export async function mobileLogin(email: string, password: string) {
  await ConnectDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.isActive) {
    throw new Error("User inactive");
  }
  console.log("EMAIL RECIBIDO:", email);
  console.log("PASSWORD RECIBIDO:", password);
  console.log("HASH EN DB:", user.password);

  const isValid = await bcrypt.compare(password, user.password);
  console.log("PASSWORD VALID:", isValid);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.MOBILE_JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return {
    token: accessToken,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
