import jwt from "jsonwebtoken";

export interface MobileTokenPayload {
  id: string;
  role: "admin" | "empleado" | "cliente";
}

export async function verifyMobileToken(
  req: Request,
): Promise<MobileTokenPayload | null> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.MOBILE_JWT_SECRET as string,
    ) as MobileTokenPayload;

    return decoded;
  } catch {
    return null;
  }
}
