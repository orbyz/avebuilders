import "@/app/globals.css";

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      <h1 className="text-4xl font-bold mb-4">Nosotros</h1>
      <p className="text-lg mb-4">
        AVE Builders es una empresa especializada en reformas profesionales sin
        sorpresas.
      </p>
      <p className="text-lg mb-4">
        Nuestra misión es brindar soluciones de calidad y eficiencia a nuestros
        clientes, garantizando un proceso transparente y sin sorpresas.
      </p>
      <p className="text-lg mb-4">
        Contamos con un equipo de profesionales altamente capacitados y
        experimentados, que trabajan en conjunto para ofrecer soluciones
        personalizadas y efectivas.
      </p>
      <p className="text-lg mb-4">
        En AVE Builders, nos comprometemos a superar las expectativas de
        nuestros clientes y a brindar un servicio excepcional.
      </p>
    </main>
  );
}

export const metadata = {
  title: "AVE Builders | Nosotros",
  description: "Conocé más sobre AVE Builders",
};

export const revalidate = 60;
