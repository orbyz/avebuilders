import jwt from "jsonwebtoken";

export interface MobileTokenPayload {
  id: string;
  role: "admin" | "empleado" | "cliente";
}

export async function verifyMobileToken(
  req: Request,
): Promise<MobileTokenPayload> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("TOKEN RECIBIDO:", token);
    console.log("SECRET USADO:", process.env.MOBILE_JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.MOBILE_JWT_SECRET as string,
    ) as MobileTokenPayload;

    console.log("TOKEN DECODIFICADO OK");

    return decoded;
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err);
    throw new Error("Invalid token");
  }
}
