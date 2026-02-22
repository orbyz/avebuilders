import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import connectDB from "@/lib/db/mongoose";
import User from "@/lib/modules/users/model";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas
  if (
    pathname.startsWith("/login") ||
    pathname === "/" ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 VALIDAR EN DB
  await connectDB();
  const dbUser = await User.findById(token.id).select("isActive");

  if (!dbUser || !dbUser.isActive) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 Bloqueo si usuario fue desactivado después de login
  if (token.isActive === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = token.role as string;

  // 🔒 Cliente no puede entrar a profesional
  if (pathname.startsWith("/profesional")) {
    if (!["admin", "empleado"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 🔒 Profesional no puede entrar a cliente
  if (pathname.startsWith("/cliente")) {
    if (role !== "cliente") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profesional/:path*", "/cliente/:path*"],
};
