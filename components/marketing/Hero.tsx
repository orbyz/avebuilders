"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero/slide-1.jpg",
    title: "Construyendo el Futuro",
    subtitle: "Transformamos tus sueños en estructuras sólidas y duraderas",
  },
  {
    image: "/images/hero/slide-2.jpg",
    title: "Excelencia en Construcción",
    subtitle: "Más de 20 años de experiencia en el sector",
  },
  {
    image: "/images/hero/slide-3.jpg",
    title: "Proyectos Innovadores",
    subtitle: "Tecnología de punta para resultados excepcionales",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container-custom px-4 flex items-center">
        <div className="max-w-2xl text-brand-accent space-y-6">
          <div className="flex items-center gap-3 text-brand-accent font-semibold uppercase tracking-wider">
            <div className="w-12 h-1 bg-brand-accent" />
            <span>Constructores Profesionales</span>
          </div>

          <h1 className="text-5xl text-white md:text-6xl lg:text-7xl font-bold leading-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-lg">
            {slides[currentSlide].subtitle}
          </p>

          <div className="flex gap-4 pt-4">
            <button className="bg-brand-accent text-black px-6 py-3 rounded-md font-semibold flex items-center gap-2 hover:brightness-95 transition">
              Ver Proyectos
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20 mt-12">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-accent">
                250+
              </div>
              <div className="text-sm text-gray-300">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-accent">
                20+
              </div>
              <div className="text-sm text-gray-300">Años Exp.</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-accent">
                100%
              </div>
              <div className="text-sm text-gray-300">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-brand-accent text-black hover:brightness-95 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-brand-accent w-8" : "bg-white/50 w-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
