"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mt-6 px-4 py-2 bg-brand-accent hover:bg-app-accent text-brand-bg rounded print:hidden"
    >
      Imprimir
    </button>
  );
}
