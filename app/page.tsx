import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import LeadForm from "./components/LeadForm";

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
