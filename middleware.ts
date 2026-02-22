import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

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

  // 🔐 Obtener token PRIMERO
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔒 Bloqueo básico por rol (sin DB)
  if (pathname.startsWith("/profesional") && token.role === "cliente") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/cliente") && token.role !== "cliente") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profesional/:path*", "/cliente/:path*"],
};
