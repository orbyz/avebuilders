import { ServicesGrid } from "./components/ServicesGrid";
import { ServicesCTA } from "./components/ServicesCTA";
import { ServicesHero } from "./components/ServicesHero";
import { ServicesProcess } from "./components/ServicesProcess";
import { ServicesTrust } from "./components/ServicesTrust";

export default function ServicesPage() {
  return (
    <main className="">
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesTrust />
      <ServicesCTA />
    </main>
  );
}
