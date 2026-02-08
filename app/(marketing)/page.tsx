import Hero from "@/components/marketing/Hero";
import Services from "@/components/marketing/Services";
import Process from "@/components/marketing/Process";
import LeadForm from "@/components/marketing/LeadForm";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Services />
      <Process />
      <LeadForm />
    </main>
  );
}
