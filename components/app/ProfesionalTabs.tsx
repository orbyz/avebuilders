"use client";

import { useState } from "react";
import CandidatesSection from "./CandidatesSection";
import LeadsSection from "./LeadsSection";

export default function ProfesionalTabs() {
  const [activeTab, setActiveTab] = useState<"leads" | "talento">("leads");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Panel Profesional</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "leads"
                ? "bg-brand-accent text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Leads
          </button>

          <button
            onClick={() => setActiveTab("talento")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "talento"
                ? "bg-brand-accent text-black"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            Talento
          </button>
        </div>
      </div>

      <div>
        {activeTab === "leads" && <LeadsSection />}
        {activeTab === "talento" && <CandidatesSection />}
      </div>
    </div>
  );
}
