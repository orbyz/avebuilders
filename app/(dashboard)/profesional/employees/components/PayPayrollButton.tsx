"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PayPayrollButton({ batchId }: { batchId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);

    const res = await fetch(`/api/payroll/${batchId}/pay`, {
      method: "POST",
    });

    setLoading(false);

    if (res.ok) {
      alert("Payroll marcado como pagado.");
      router.refresh();
    } else {
      const data = await res.json();
      alert(data.error || "Error.");
    }
  }

  return (
    <button
      onClick={handlePay}
      disabled={loading}
      className="px-3 py-1 bg-green-600 text-white rounded text-sm"
    >
      {loading ? "Procesando..." : "Marcar como pagado"}
    </button>
  );
}
