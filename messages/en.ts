import type { Dictionary } from "@/lib/i18n";
import { CONTACT } from "@/lib/contact";

export const en: Dictionary = {
  meta: {
    title: "Linde Port Agency — World-class port agency services",
    description:
      "Port agency, launch operations and marine logistics in Aruba, Bonaire, Curaçao, Panama and Venezuela. 24/7/365.",
  },

  statusBar: {
    ports: "ARUBA · BONAIRE · CURAÇAO · PANAMA · VENEZUELA",
    deskOpen: "OPERATIONS DESK OPEN",
  },

  nav: {
    agency: "Port Agency",
    launch: "Launch",
    portCall: "Port call",
    marine: "Marine Services",
    ports: "Ports",
    brochure: "Brochure",
    ctaQuote: "REQUEST A QUOTE",
    langNext: "ES",
    langTitle: "Cambiar a español",
    menu: "MENU",
    close: "CLOSE",
    backToTop: "Back to top",
  },

  hero: {
    eyebrow: "ELITE PORT AGENCY · LAUNCH OPERATIONS · MARINE LOGISTICS",
    title: "World-class port agency services",
    body: "Linde Port Agency delivers comprehensive, high-precision port solutions designed for shipowners, operators, and charterers who demand reliability, efficiency, and absolute discretion.",
    ctaContact: "CONTACT OPERATIONS",
    ctaServices: "OUR SERVICES",
  },

  stats: [
    { value: 5, label: "PORTS IN OPERATION" },
    { value: 19, label: "SERVICE LINES" },
    { value: 365, label: "DAYS A YEAR" },
    { value: 1, label: "POINT OF CONTACT" },
  ],

  agency: {
    plate: "01 — Port Agency",
    title: "Core agency services",
    body: "Every operation is executed with meticulous attention to detail and seamless communication.",
    photoAlt: "Port agency operation alongside the berth",
    services: [
      "Full Port Agency",
      "Hub Agency Services",
      "Bunker Fuel Coordination",
      "Husbandry Services",
      "Protective Agency Services",
      "Panama Canal Transit Management",
      "Demurrage & Arbitration Analysis",
      "Ship Chandlery",
      "Ship Spares in Transit",
      "Ship-to-Ship Transfer Coordination",
    ],
  },

  launch: {
    eyebrow: "02 — Launch",
    title: "Elite launch operations",
    body: "Operating 24/7/365, Linde Port Agency provides premium launch services throughout Aruba, Bonaire, Curaçao, Panama and Venezuela. Our launch division is engineered for clients who expect precision, punctuality, and flawless execution.",
    photoAlt: "Service launch heading out to the anchorage",
    singlePoint: "A single point of contact ensures seamless coordination across all ports.",
    services: [
      "Executive-level crew changes",
      "Embarking / disembarking of superintendents",
      "Inspectors, surveyors & port captains",
      "Secure Cash-to-Master handling",
      "Priority spare parts delivery",
      "Premium provisions & supplies delivery",
      "Certified fresh drinking water delivery",
      "Slops collection",
      "Greywater collection",
      "Garbage removal",
    ],
  },

  portCall: {
    eyebrow: "03 — ANATOMY OF A PORT CALL",
    title: "How we run a port call",
    body: "From appointment to sailing, one team controls every stage and answers for it.",
    steps: [
      {
        title: "Pre-arrival",
        body: "Appointment, berth nomination and advance notification to authorities with complete documentation.",
      },
      {
        title: "Arrival",
        body: "Pilot and tug coordination, inward clearance and immediate attendance to the Master.",
      },
      {
        title: "Operations",
        body: "Supervision of cargo, bunkers, provisions, water, spares and crew changes.",
      },
      {
        title: "Compliance",
        body: "Customs, immigration, health, waste and every signature the call requires.",
      },
      {
        title: "Departure",
        body: "Outward clearance, account settlement and a final port call report with supporting documents.",
      },
    ],
  },

  marine: {
    eyebrow: "04 — Marine Services",
    title: "Specialized marine capabilities",
    body: "Rapid-response teams and certified crews across the region, compliant with major international classification societies.",
    items: [
      {
        title: "Containment Booming & Emergency Response",
        short: "Containment booming and immediate spill response.",
        body: "Rapid-deployment containment booming for oil spills and pollution emergencies. Our specialized response teams mobilize immediately, protecting vessels, terminals, and the environment.",
        list: [],
      },
      {
        title: "Luxury Ship & Dock Fendering",
        short: "Premium fendering for commercial vessels, offshore and yachts.",
        body: "Premium fendering systems engineered for maximum durability and protection, for commercial vessels, offshore units, and luxury yachts.",
        list: [],
      },
      {
        title: "High-Standard Lightering (STS)",
        short: "STS transfers of crude and products with Mooring Master.",
        body: "Exceptional operational accuracy for tanker and cargo transfer operations, with experienced crews supporting Mooring Masters.",
        list: [],
      },
      {
        title: "Commercial & Recreational Towing",
        short: "Emergency towing, dock-to-dock transfers and on-water assistance.",
        body: "Rapid-response towing for commercial vessels and luxury recreational craft: emergency towing, dock-to-dock transfers, fuel delivery, and jump starts.",
        list: [],
      },
      {
        title: "Premium Underwater Services",
        short: "Certified divers: hull, propellers, welding and inspections.",
        body: "Certified dive teams operating at the highest industry standard, compliant with major international classification societies.",
        list: [
          "Precision hull cleaning",
          "Professional underwater welding",
          "Thruster & propeller repair",
          "Structural inspections",
        ],
      },
      {
        title: "Yokohama-Type Fender & Hose Rental",
        short: "Pneumatic fenders and hoses across all five ports.",
        body: "Floating pneumatic fenders available across Aruba, Bonaire, Curaçao, Venezuela, and Panama, delivered promptly with full technical support.",
        list: ["1.5 m × 3.0 m", "3.3 m × 6.5 m"],
      },
      {
        title: "Professional Salvage Operations",
        short: "Recovery, tow-off, debris removal and emergency stabilization.",
        body: "Vessel recovery, tow-off assistance, debris removal, and emergency stabilization, with a focus on environmental protection and operational continuity.",
        list: [],
      },
      {
        title: "Advanced Pumping Services",
        short: "Pumping of fuel, ballast, bilge, grey/black water and chemicals.",
        body: "Certified pumping solutions delivered fast, compliant, and secure across all service areas.",
        list: [
          "Fuel transfer",
          "Ballast water management",
          "Greywater & blackwater removal",
          "Bilge extraction",
          "Chemical pumping",
        ],
      },
      {
        title: "Marine Lubricant, Chemical & Gas Delivery",
        short: "Lubricants, oxygen, acetylene, nitrogen and chemicals.",
        body: "High-quality marine lubricants in drums, pails, and bulk, delivered via supply barges with hydraulic pumping systems for direct transfer into vessel tanks.",
        list: ["Oxygen · Acetylene · Nitrogen", "Cleaning chemicals", "Water treatment chemicals"],
      },
    ],
  },

  gallery: {
    title: "Operations in progress",
    items: ["Ship-to-ship transfer", "Underwater services", "Panama Canal transits"],
  },

  ports: {
    eyebrow: "05 — Ports",
    title: "Where we operate",
    note: "24 / 7 / 365",
    active: "IN OPERATION",
    railNote: "COVERAGE",
    railBody:
      "Five jurisdictions, one operations team and a single point of contact along the whole route.",
    items: [
      {
        tags: ["Full agency", "Launch 24/7", "Marine services"],
        detail: [
          "Oranjestad and Barcadera",
          "Crew changes and Cash-to-Master",
          "Bunkers, provisions and fresh water",
        ],
      },
      {
        tags: ["Full agency", "Launch 24/7", "Marine services"],
        detail: [
          "Kralendijk and BOPEC terminal",
          "STS and lightering of crude and products",
          "Yokohama fenders and hoses",
        ],
      },
      {
        tags: ["Full agency", "Launch 24/7", "Marine services"],
        detail: [
          "Willemstad and Bullenbaai",
          "Protective agency and husbandry",
          "Diving, hull cleaning and inspections",
        ],
      },
      {
        tags: ["Full agency", "Canal transits", "Launch 24/7"],
        detail: [
          "Balboa, Cristóbal and anchorages",
          "Full Panama Canal transit management",
          "Spares in transit and supplies",
        ],
      },
      {
        tags: ["Full agency", "Launch 24/7", "Fenders and STS"],
        detail: [
          "Amuay, Cardón, José and Puerto Cabello",
          "Full agency and bunker coordination",
          "Lightering, towing and pumping",
        ],
      },
    ],
  },

  brochure: {
    eyebrow: "06 — BROCHURE",
    title: "Download the corporate brochure",
    body: "Every agency, launch and marine service in a single document, ready to share with your operations or chartering team.",
    meta: "2026 EDITION",
    cta: "DOWNLOAD BROCHURE",
    pick: "CHOOSE A LANGUAGE",
    linkEs: "Español · PDF",
    linkEn: "English · PDF",
    photoAlt: "Printed Linde Port Agency brochure mockup",
  },

  contact: {
    eyebrow: "07 — CONTACT",
    title: "One point of contact for every port call",
    body: "Send us the port, the ETA and the services you need. Our operations desk answers around the clock, every day of the year.",
    blocks: [
      { label: "OPERATIONS · 24 HOURS", value: CONTACT.phone, href: CONTACT.phoneHref },
      { label: "EMAIL", value: CONTACT.email, href: CONTACT.emailHref },
    ],
    form: {
      name: "NAME",
      company: "COMPANY",
      email: "EMAIL",
      port: "PORT",
      eta: "ETA",
      servicesLabel: "SERVICES REQUIRED",
      servicesPlaceholder: "Select the services",
      services: {
        agency: "Full Port Agency",
        hub: "Hub Agency",
        bunker: "Bunker Coordination",
        canal: "Panama Canal Transits",
        launch: "Launch 24/7",
        sts: "STS Lightering",
        underwater: "Underwater Services",
        salvage: "Salvage",
        pumping: "Pumping",
        other: "Other",
      },
      message: "MESSAGE",
      send: "SEND REQUEST",
      sending: "SENDING…",
      sent: "Request sent. Our operations desk will get back to you shortly.",
      error: "We could not send the request. Check the details and try again.",
      required: "Please review the required fields: name, email, port, ETA and at least one service.",
    },
  },

  footer: {
    colAgency: "AGENCY",
    colMarine: "MARINE",
    colPorts: "PORTS",
    agency: ["Full Port Agency", "Hub Agency", "Bunker Coordination", "Panama Canal Transits"],
    marine: ["STS Lightering", "Underwater Services", "Salvage", "Pumping"],
    copyright: "© 2026 LINDE PORT AGENCY",
    tagline: "PORT AGENCY · LAUNCH · MARINE LOGISTICS",
  },
};
