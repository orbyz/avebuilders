Nombre del proyecto: AVE Builders
Responsable: OrByZ DeV
Lugar: España 🇪🇸

Estructura del proyecto 🚀
# Para no olvidar nada importante

├── app/
│   ├── (marketing)/              # Web pública (grupo sin layout de app)
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── servicios/
│   │   ├── nosotros/
│   │   ├── contacto/
│   │   └── layout.tsx            # Layout limpio, sin auth
│   │
│   ├── (app)/                    # App autenticada (grupo con auth)
│   │   ├── (cliente)/            # Dashboard cliente
│   │   │   ├── dashboard/
│   │   │   ├── proyectos/
│   │   │   └── layout.tsx        # Layout específico cliente
│   │   │
│   │   ├── (profesional)/        # Dashboard profesional
│   │   │   ├── dashboard/
│   │   │   ├── trabajos/
│   │   │   └── layout.tsx        # Layout específico profesional
│   │   │
│   │   └── layout.tsx            # Layout con auth (protegido)
│   │
│   ├── api/
│   │   ├── leads/                # Captación desde la web
│   │   ├── auth/                 # Login/registro
│   │   ├── cliente/              # API específica clientes
│   │   └── profesional/          # API específica profesionales
│   │
│   └── layout.tsx                # Layout raíz
│
├── components/
│   ├── marketing/                # Componentes de la web
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── ContactForm.tsx
│   │
│   ├── app/                      # Componentes de la app
│   │   ├── Sidebar.tsx
│   │   ├── DashboardStats.tsx
│   │   └── UserMenu.tsx
│   │
│   └── ui/                       # Componentes compartidos (shadcn/ui)
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
│
├── lib/                          # Configuración (fuera de app)
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
│
├── models/
│   ├── Lead.ts
│   ├── User.ts
│   ├── Cliente.ts
│   └── Profesional.ts
│
└── hooks/, types/, styles/...
