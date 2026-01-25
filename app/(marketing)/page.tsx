import Hero from "@/app/components/marketing/Hero";
import Services from "@/app/components/marketing/Services";
import Process from "@/app/components/marketing/Process";
import LeadForm from "@/app/components/marketing/LeadForm";

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
