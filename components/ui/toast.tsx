"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function Toast({
  message,
  onClose,
  variant = "default",
}: {
  message: string;
  onClose: () => void;
  variant?: "default" | "error";
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-md px-4 py-3 text-sm shadow-lg",
        variant === "default"
          ? "bg-app-surface text-app-text border border-app-border"
          : "bg-app-danger text-white",
      )}
    >
      {message}
    </div>
  );
}
