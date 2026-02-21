import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

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
