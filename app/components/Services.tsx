import {
  Building2,
  Home,
  Hammer,
  Paintbrush,
  Ruler,
  Truck,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Construcción Comercial",
    description:
      "Edificios de oficinas, centros comerciales y espacios industriales con los más altos estándares de calidad.",
    image:
      "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/ddfaa204688057d6bf7624d6a03da041f1463643.jpg",
  },
  {
    icon: Home,
    title: "Construcción Residencial",
    description:
      "Hogares diseñados para durar, desde casas unifamiliares hasta desarrollos residenciales completos.",
    image:
      "https://kimi-web-img.moonshot.cn/img/img.freepik.com/8f11a967a75f337260b78380ffb7d315c605cf32.jpg",
  },
  {
    icon: Hammer,
    title: "Renovaciones",
    description:
      "Transformamos espacios existentes con remodelaciones que aumentan valor y funcionalidad.",
    image:
      "https://kimi-web-img.moonshot.cn/img/images.stockcake.com/d7bc85fc13ea55b73020176bb0838333dee5608c.jpg",
  },
  {
    icon: Paintbrush,
    title: "Diseño Interior",
    description:
      "Acabados de lujo y diseños interiores que reflejan tu estilo y personalidad.",
    image:
      "https://kimi-web-img.moonshot.cn/img/static.vecteezy.com/f01065fb6903241fcd4330be51acefcdc9038f8c.jpg",
  },
  {
    icon: Ruler,
    title: "Planificación",
    description:
      "Servicios de arquitectura e ingeniería para proyectos desde la concepción hasta la entrega.",
    image:
      "https://kimi-web-img.moonshot.cn/img/utdmotors.com/86b01a0fb6686030a80adfba751b2fc32e1879be.webp",
  },
  {
    icon: Truck,
    title: "Gestión de Proyectos",
    description:
      "Supervisión integral para garantizar entregas a tiempo y dentro del presupuesto.",
    image:
      "https://kimi-web-img.moonshot.cn/img/img.freepik.com/9783f64780414600c2073383b78779e54dd58916.jpg",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mt-16 mb-16">
          <div className="flex items-center justify-center gap-2 text-blue-700 font-semibold tracking-wider uppercase mb-4">
            <div className="w-8 h-1 bg-blue-700" />
            <span>Nuestros Servicios</span>
            <div className="w-8 h-1 bg-blue-700" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Soluciones Constructivas Integrales
          </h2>
          <p className="text-gray-600 text-lg">
            Ofrecemos una gama completa de servicios de construcción para
            satisfacer todas tus necesidades, desde proyectos residenciales
            hasta desarrollos comerciales de gran escala.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute top-4 left-4 p-3 bg-blue-700 text-white rounded-sm">
                  <service.icon size={24} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-700 font-semibold flex items-center gap-2 group/btn">
                  Leer Más
                  <span className="group-hover/btn:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
