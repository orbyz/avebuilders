import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Aquí irá la auth real más adelante
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

/**
 * ⛔ SOLO PROTEGEMOS EL DASHBOARD
 * ✅ Landing pública libre
 */
export const config = {
  matcher: ["/profesional/:path*"],
};
