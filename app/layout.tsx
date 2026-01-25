import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata = {
  title: "AVE Builders | Reformas profesionales sin sorpresas",
  description:
    "Empresa de reformas integrales, baños, cocinas, electricidad y mantenimiento. Presupuesto claro y gestión profesional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
