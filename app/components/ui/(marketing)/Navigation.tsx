"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";

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
        isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      {/* Top Bar - Solo visible cuando no hay scroll */}
      {!isScrolled && (
        <div className="bg-goldPrimary text-white text-md py-2 hidden lg:block">
          <div className="container-custom flex justify-between items-center px-4">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-2">
                <Phone size={16} />
                +34 624 498 859
              </span>
              <span>info@avebuilders.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Lun - Vie: 8:00 - 18:00</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container-custom mt-2 mb-2 px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className={`text-2xl font-bold tracking-tighter ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              <span className="text-goldPrimary">AVE</span> BUILDERS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium hover:text-goldPrimary transition-colors ${
                  isScrolled ? "text-slate-700" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="btn-primary hover:text-white hover:bg-goldHover">
              Cotización Gratis
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${isScrolled ? "text-slate-900" : "text-white"}`}
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
              className="text-slate-700 font-medium hover:text-goldPrimary py-2 border-b border-gray-100"
            >
              {link.name}
            </Link>
          ))}
          <button className="btn-primary w-full mt-4">Cotización Gratis</button>
        </div>
      </div>
    </nav>
  );
}
