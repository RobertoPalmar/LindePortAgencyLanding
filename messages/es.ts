import { CONTACT } from "@/lib/contact";

export const es = {
  meta: {
    title: "Linde Port Agency — Servicios portuarios de clase mundial",
    description:
      "Agencia portuaria, operaciones de launch y logística marítima en Aruba, Bonaire, Curaçao, Panamá y Venezuela. 24/7/365.",
  },

  statusBar: {
    ports: "ARUBA · BONAIRE · CURAÇAO · PANAMA · VENEZUELA",
    deskOpen: "MESA DE OPERACIONES ABIERTA",
  },

  nav: {
    agency: "Agencia",
    launch: "Launch",
    portCall: "Escala",
    marine: "Servicios marinos",
    ports: "Puertos",
    brochure: "Brochure",
    ctaQuote: "SOLICITAR COTIZACIÓN",
    langNext: "EN",
    langTitle: "Switch to English",
    menu: "MENÚ",
    close: "CERRAR",
    backToTop: "Volver arriba",
  },

  hero: {
    eyebrow: "AGENCIA PORTUARIA ELITE · OPERACIONES DE LAUNCH · LOGÍSTICA MARÍTIMA",
    title: "Servicios portuarios de clase mundial",
    body: "Linde Port Agency ofrece soluciones portuarias integrales y de alta precisión, diseñadas para armadores, operadores y fletadores que exigen confiabilidad, eficiencia y absoluta discreción.",
    ctaContact: "CONTACTAR OPERACIONES",
    ctaServices: "VER SERVICIOS",
  },

  stats: [
    { value: 5, label: "PUERTOS EN OPERACIÓN" },
    { value: 19, label: "LÍNEAS DE SERVICIO" },
    { value: 365, label: "DÍAS AL AÑO" },
    { value: 1, label: "PUNTO DE CONTACTO" },
  ],

  agency: {
    plate: "01 — Agencia",
    title: "Servicios principales de agencia",
    body: "Cada operación se ejecuta con atención meticulosa al detalle y comunicación impecable.",
    photoAlt: "Operación de agencia portuaria en muelle",
    services: [
      "Agencia Portuaria Completa",
      "Servicios de Hub Agency",
      "Coordinación de Combustible Bunker",
      "Servicios de Husbandry",
      "Agencia Protectora",
      "Gestión de Tránsitos por el Canal de Panamá",
      "Análisis de Demoras y Arbitraje",
      "Suministros de Nave",
      "Repuestos en Tránsito",
      "Coordinación de Transferencias Buque a Buque",
    ],
  },

  launch: {
    eyebrow: "02 — Launch",
    title: "Operaciones de launch elite",
    body: "Operando 24/7/365, Linde Port Agency ofrece servicios de launch de nivel premium en Aruba, Bonaire, Curaçao, Panamá y Venezuela. Nuestra división de launch está diseñada para clientes que exigen precisión, puntualidad y ejecución impecable.",
    photoAlt: "Lancha de servicio saliendo a rada",
    singlePoint: "Un solo punto de contacto garantiza coordinación perfecta en todos los puertos.",
    services: [
      "Cambios de tripulación ejecutivos",
      "Embarque y desembarque de superintendentes",
      "Inspectores, surveyors y capitanes de puerto",
      "Manejo seguro de Cash-to-Master",
      "Entrega prioritaria de repuestos",
      "Entrega premium de provisiones y suministros",
      "Suministro certificado de agua potable",
      "Recolección de slops",
      "Recolección de aguas grises",
      "Recolección de basura",
    ],
  },

  portCall: {
    eyebrow: "03 — ANATOMÍA DE UNA ESCALA",
    title: "Cómo trabajamos una escala",
    body: "Desde la designación hasta la salida del puerto, un mismo equipo controla cada etapa y responde por ella.",
    steps: [
      {
        title: "Pre-arribo",
        body: "Designación, nominación de atraque y notificación a autoridades con documentación completa por adelantado.",
      },
      {
        title: "Llegada",
        body: "Coordinación con práctico y remolcadores, despacho de entrada y atención inmediata al Capitán.",
      },
      {
        title: "Operaciones",
        body: "Supervisión de carga, bunker, provisiones, agua, repuestos y cambios de tripulación.",
      },
      {
        title: "Cumplimiento",
        body: "Aduana, migración, sanidad, residuos y toda la firma que la escala requiera.",
      },
      {
        title: "Salida",
        body: "Despacho de zarpe, cierre de cuentas y reporte final de la escala con soportes.",
      },
    ],
  },

  marine: {
    eyebrow: "04 — Servicios marinos",
    title: "Capacidades marinas especializadas",
    body: "Equipos de respuesta rápida y tripulaciones certificadas en toda la región, en cumplimiento con las principales sociedades de clasificación internacionales.",
    items: [
      {
        title: "Contención de derrames y respuesta a emergencias",
        short: "Barreras de contención y respuesta inmediata a derrames.",
        body: "Despliegue rápido de barreras de contención para derrames de hidrocarburos y emergencias de contaminación. Nuestros equipos se movilizan de inmediato, protegiendo embarcaciones, terminales y el entorno.",
        list: [] as string[],
      },
      {
        title: "Fendering de muelle y buque de lujo",
        short: "Defensas premium para buques comerciales, offshore y yates.",
        body: "Sistemas de defensa premium diseñados para máxima durabilidad y protección, para buques comerciales, unidades offshore y yates de lujo.",
        list: [] as string[],
      },
      {
        title: "Lightering (STS) de alto estándar",
        short: "Transferencias STS de crudo y productos con Mooring Master.",
        body: "Precisión excepcional en operaciones de transferencia de carga entre buques, con tripulaciones experimentadas apoyando a los Mooring Masters.",
        list: [] as string[],
      },
      {
        title: "Remolque comercial y recreativo",
        short: "Remolque de emergencia, traslados y asistencia en el agua.",
        body: "Remolque de respuesta rápida para embarcaciones comerciales y recreativas de lujo: remolque de emergencia, traslados muelle a muelle, entrega de combustible y arranques.",
        list: [] as string[],
      },
      {
        title: "Servicios submarinos premium",
        short: "Buzos certificados: casco, hélices, soldadura e inspecciones.",
        body: "Equipos de buzos certificados bajo los más altos estándares de la industria, en cumplimiento con las principales sociedades de clasificación.",
        list: [
          "Limpieza de casco de precisión",
          "Soldadura submarina profesional",
          "Reparación de hélices y propulsores",
          "Inspecciones estructurales",
        ],
      },
      {
        title: "Alquiler de fenders y mangueras tipo Yokohama",
        short: "Fenders neumáticos y mangueras en los cinco puertos.",
        body: "Fenders neumáticos flotantes disponibles en Aruba, Bonaire, Curaçao, Venezuela y Panamá, con entrega rápida y soporte técnico completo.",
        list: ["1.5 m × 3.0 m", "3.3 m × 6.5 m"],
      },
      {
        title: "Salvamento profesional",
        short: "Recuperación, tow-off, retiro de escombros y estabilización.",
        body: "Recuperación de embarcaciones, asistencia de remolque, retiro de escombros y estabilización de emergencia, con enfoque en protección ambiental y continuidad operativa.",
        list: [] as string[],
      },
      {
        title: "Servicios avanzados de bombeo",
        short: "Bombeo de combustible, lastre, sentina, aguas y químicos.",
        body: "Soluciones certificadas de bombeo, rápidas, seguras y en cumplimiento total en todas las áreas de servicio.",
        list: [
          "Transferencia de combustible",
          "Manejo de agua de lastre",
          "Remoción de aguas grises y negras",
          "Extracción de sentina",
          "Bombeo de químicos",
        ],
      },
      {
        title: "Entrega de lubricantes, químicos y gases marinos",
        short: "Lubricantes, oxígeno, acetileno, nitrógeno y químicos.",
        body: "Lubricantes marinos de alta calidad en tambores, baldes y a granel, entregados mediante barcazas con sistemas hidráulicos para transferencia directa a los tanques del buque.",
        list: ["Oxígeno · Acetileno · Nitrógeno", "Químicos de limpieza", "Químicos para tratamiento de agua"],
      },
    ],
  },

  gallery: {
    title: "Operaciones en curso",
    items: [
      "Transferencia buque a buque",
      "Servicios submarinos",
      "Tránsitos por el Canal de Panamá",
    ],
  },

  ports: {
    eyebrow: "05 — Puertos",
    title: "Dónde operamos",
    note: "24 / 7 / 365",
    active: "EN OPERACIÓN",
    railNote: "COBERTURA",
    railBody:
      "Cinco jurisdicciones, un mismo equipo de operaciones y un solo interlocutor para toda la ruta.",
    items: [
      {
        tags: ["Agencia completa", "Launch 24/7", "Servicios marinos"],
        detail: [
          "Oranjestad y Barcadera",
          "Cambios de tripulación y Cash-to-Master",
          "Bunker, provisiones y agua potable",
        ],
      },
      {
        tags: ["Agencia completa", "Launch 24/7", "Servicios marinos"],
        detail: [
          "Kralendijk y terminal BOPEC",
          "STS y lightering de crudo y productos",
          "Fenders Yokohama y mangueras",
        ],
      },
      {
        tags: ["Agencia completa", "Launch 24/7", "Servicios marinos"],
        detail: [
          "Willemstad y Bullenbaai",
          "Agencia protectora y husbandry",
          "Buceo, limpieza de casco e inspecciones",
        ],
      },
      {
        tags: ["Agencia completa", "Tránsitos del Canal", "Launch 24/7"],
        detail: [
          "Balboa, Cristóbal y fondeaderos",
          "Gestión completa de tránsitos por el Canal",
          "Repuestos en tránsito y suministros",
        ],
      },
      {
        tags: ["Agencia completa", "Launch 24/7", "Fenders y STS"],
        detail: [
          "Amuay, Cardón, José y Puerto Cabello",
          "Agencia completa y coordinación de bunker",
          "Lightering, remolque y bombeo",
        ],
      },
    ],
  },

  brochure: {
    eyebrow: "06 — BROCHURE",
    title: "Descarga el brochure corporativo",
    body: "Todos los servicios de agencia, launch y operaciones marinas en un solo documento, listo para compartir con tu equipo de operaciones o chartering.",
    meta: "EDICIÓN 2026",
    cta: "DESCARGAR BROCHURE",
    pick: "ELIGE EL IDIOMA",
    linkEs: "Español · PDF",
    linkEn: "English · PDF",
    photoAlt: "Mockup del brochure impreso de Linde Port Agency",
  },

  contact: {
    eyebrow: "07 — CONTACTO",
    title: "Un solo punto de contacto para cada escala",
    body: "Indíquenos el puerto, el ETA y los servicios que necesita. Nuestra mesa de operaciones responde a toda hora, todos los días del año.",
    blocks: [
      { label: "OPERACIONES · 24 HORAS", value: CONTACT.phone, href: CONTACT.phoneHref },
      { label: "CORREO", value: CONTACT.email, href: CONTACT.emailHref },
    ],
    form: {
      name: "NOMBRE",
      company: "EMPRESA",
      email: "CORREO",
      port: "PUERTO",
      eta: "ETA",
      servicesLabel: "SERVICIOS REQUERIDOS",
      servicesPlaceholder: "Selecciona los servicios",
      services: {
        agency: "Agencia completa",
        hub: "Hub Agency",
        bunker: "Coordinación de bunker",
        canal: "Tránsitos del Canal",
        launch: "Launch 24/7",
        sts: "Lightering STS",
        underwater: "Servicios submarinos",
        salvage: "Salvamento",
        pumping: "Bombeo",
        other: "Otros",
      },
      message: "MENSAJE",
      send: "ENVIAR SOLICITUD",
      sending: "ENVIANDO…",
      sent: "Solicitud enviada. Nuestra mesa de operaciones le responde en breve.",
      error: "No pudimos enviar la solicitud. Revisa los datos e inténtalo de nuevo.",
      required: "Revisa los campos obligatorios: nombre, correo, puerto, ETA y al menos un servicio.",
    },
  },

  footer: {
    colAgency: "AGENCIA",
    colMarine: "MARINOS",
    colPorts: "PUERTOS",
    agency: ["Agencia completa", "Hub Agency", "Coordinación de bunker", "Tránsitos del Canal"],
    marine: ["Lightering STS", "Servicios submarinos", "Salvamento", "Bombeo"],
    copyright: "© 2026 LINDE PORT AGENCY",
    tagline: "AGENCIA PORTUARIA · LAUNCH · LOGÍSTICA MARÍTIMA",
  },
};
