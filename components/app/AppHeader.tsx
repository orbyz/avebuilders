"use client";

import { signOut } from "next-auth/react";

export default function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-app-border bg-app-surface px-6">
      <span className="font-semibold text-app-accent">AVE Builders</span>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-sm text-app-muted hover:text-app-text"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
