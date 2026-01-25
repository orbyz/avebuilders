"use client";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  servicios: [
    { name: "Construcción Residencial", href: "#" },
    { name: "Construcción Comercial", href: "#" },
    { name: "Renovaciones", href: "#" },
    { name: "Diseño Interior", href: "#" },
    { name: "Gestión de Proyectos", href: "#" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Nuestro Equipo", href: "#" },
    { name: "Proyectos", href: "#projects" },
    { name: "Testimonios", href: "#" },
    { name: "Blog", href: "#" },
  ],
  legal: [
    { name: "Política de Privacidad", href: "#" },
    { name: "Términos de Servicio", href: "#" },
    { name: "Política de Cookies", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-gray-300 p-4">
      {/* Main Footer */}
      <div className="section-padding border-b border-gray-800 p-2">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="text-2xl font-bold text-white">
                <span className="text-goldPrimary">AVE</span> BUILDERS
              </div>
              <p className="leading-relaxed">
                Líderes en construcción y desarrollo inmobiliario desde 2004.
                Comprometidos con la excelencia, la innovación y la satisfacción
                de nuestros clientes.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="p-2 bg-gray-800 rounded-full hover:bg-goldPrimary hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Servicios</h4>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-goldPrimary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Empresa</h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-goldPrimary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="text-goldPrimary shrink-0 mt-1"
                    size={20}
                  />
                  <span>Carrer Edeta, 28. 46500 Sagunto, España</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-goldPrimary shrink-0" size={20} />
                  <span>+34 624 498 859</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-goldPrimary shrink-0" size={20} />
                  <span>info@avebuilders.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 px-4">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © 2024 AVE Builders. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-sm">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-2 right-2 p-3 bg-goldPrimary text-white rounded-full shadow-lg hover:bg-goldHover transition-colors z-40"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
}
