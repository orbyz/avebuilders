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
import Image from "next/image";

const footerLinks = {
  servicios: [
    { name: "Construcción Residencial", href: "#" },
    { name: "Renovaciones", href: "#" },
    { name: "Diseño Interior", href: "#" },
    { name: "Gestión de Proyectos", href: "#" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Proyectos", href: "/projects" },
    { name: "Trabaja con nosotros", href: "#" },
  ],
  legal: [
    { name: "Política de Privacidad", href: "#" },
    { name: "Términos de Servicio", href: "#" },
    { name: "Política de Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-bg text-brand-muted pt-20">
      {/* MAIN FOOTER */}
      <div className="border-b border-zinc-800 pb-16">
        <div className="container-custom px-4">
          <div className="grid gap-14 lg:grid-cols-4">
            {/* BRAND */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-ave-t.png"
                  alt="AVE Builders"
                  width={90}
                  height={90}
                  className="object-contain"
                />
                <span className="text-2xl font-bold text-white tracking-tight">
                  AVE <span className="text-brand-accent">Builders</span>
                </span>
              </div>

              <p className="text-white/80 leading-relaxed">
                Construcción y reformas con estándares profesionales, control
                total del proceso y resultados garantizados.
              </p>

              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-brand-surface text-white/80 hover:bg-brand-accent hover:text-black transition"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* SERVICIOS */}
            <div>
              <h4 className="text-brand-accent font-semibold mb-6">
                Servicios
              </h4>
              <ul className="space-y-3 text-white/80">
                {footerLinks.servicios.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-brand-accent">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* EMPRESA */}
            <div>
              <h4 className="text-brand-accent font-semibold mb-6">Empresa</h4>
              <ul className="space-y-3 text-white/80">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-brand-accent">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACTO */}
            <div>
              <h4 className="text-brand-accent font-semibold mb-6">Contacto</h4>
              <ul className="space-y-4 text-white/80">
                <li className="flex gap-3">
                  <MapPin className="text-brand-accent" size={18} />
                  <span>Sagunto, Valencia · España</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="text-brand-accent" size={18} />
                  <span>+34 624 498 859</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="text-brand-accent" size={18} />
                  <span>info@avebuilders.es</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="py-6">
        <div className="container-custom px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <span>© 2024 AVE Builders. Todos los derechos reservados.</span>

          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-brand-accent text-black shadow-lg hover:opacity-90 transition z-40"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
