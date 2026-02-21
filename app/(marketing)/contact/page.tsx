import { ContactHero } from "./components/ContactHero";
import { ContactExpectations } from "./components/ContactExpectations";
import { ContactForm } from "./components/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactExpectations />
      <ContactForm />
    </main>
  );
}
