"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/services" },
  { name: "Proyectos", href: "/projects" },
  { name: "Nosotros", href: "/about" },
  { name: "Contacto", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      {/* Top Bar */}
      {!isScrolled && (
        <div className="bg-brand-accent text-black text-md py-2 hidden lg:block">
          <div className="container-custom flex justify-between items-center px-4">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-2">
                <Phone size={16} />
                +34 624 498 859
              </span>
              <span>info@avebuilders.es</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Lun - Vie: 8:00 - 18:00</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container-custom mt-2 mb-2 px-4">
        <div className="relative flex items-center justify-between lg:justify-center">
          {/* LEFT LINKS (desktop) */}
          <div className="hidden lg:flex absolute left-0 items-center space-x-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-white hover:text-brand-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* LOGO (center) */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-ave-t.png"
              alt="AVE Builders"
              width={90}
              height={90}
              className="object-contain"
              priority
            />
            <span className="text-2xl font-bold tracking-tight text-white">
              AVE <span className="text-brand-accent">Builders</span>
            </span>
          </Link>

          {/* RIGHT LINKS + CTA (desktop) */}
          <div className="hidden lg:flex absolute right-0 items-center space-x-8">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-white hover:text-brand-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact"
              className="bg-brand-accent text-black px-5 py-2 rounded-md font-semibold hover:opacity-90 hover:text-white transition"
            >
              Cotización Gratis
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-slate-700 font-medium hover:text-brand-accent py-2 border-b border-gray-100"
            >
              {link.name}
            </Link>
          ))}

          <Link
            className="bg-brand-accent text-black px-4 py-3 rounded-md font-semibold"
            href="/contact"
          >
            Cotización Gratis
          </Link>
        </div>
      </div>
    </nav>
  );
}
