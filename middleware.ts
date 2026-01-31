import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 🔓 Bypass en desarrollo
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  // 🔐 Protección real (producción)
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
