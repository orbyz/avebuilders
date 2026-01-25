"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    image:
      "https://kimi-web-img.moonshot.cn/img/img.freepik.com/8f11a967a75f337260b78380ffb7d315c605cf32.jpg",
    title: "Construyendo el Futuro",
    subtitle: "Transformamos tus sueños en estructuras sólidas y duraderas",
  },
  {
    image:
      "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/ddfaa204688057d6bf7624d6a03da041f1463643.jpg",
    title: "Excelencia en Construcción",
    subtitle: "Más de 20 años de experiencia en el sector",
  },
  {
    image:
      "https://kimi-web-img.moonshot.cn/img/img.freepik.com/61764d7c0a745f728ae9c53d851e82fa08f7a3f5.jpg",
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
    <section
      id="home"
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Images */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container-custom px-4 flex items-center">
        <div className="max-w-2xl text-white space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 text-goldPrimary font-semibold tracking-wider uppercase">
            <div className="w-12 h-1 bg-goldPrimary" />
            <span>Constructores Profesionales</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-lg">
            {slides[currentSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="btn-primary flex items-center justify-center gap-2 group hover:text-goldPrimary">
              Ver Proyectos
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/20 mt-12">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-goldPrimary">
                250+
              </div>
              <div className="text-sm text-gray-300">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-goldPrimary">
                20+
              </div>
              <div className="text-sm text-gray-300">Años Exp.</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-goldPrimary">
                100%
              </div>
              <div className="text-sm text-gray-300">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 bg-goldPrimary hover:bg-goldPrimary text-white transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-goldPrimary w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
