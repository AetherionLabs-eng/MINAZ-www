export type ServiceCapability = {
  number: string;
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  index: string;
  name: string;

  seoTitle: string;
  seoDescription: string;

  headline: string;
  headlineAccent: string;
  description: string;

  image: string;
  imageLabel: string;
  imageSubLabel: string;

  overviewTitle: string;
  overviewAccent: string;
  overviewParagraphs: string[];

  capabilitiesIntro: string;
  capabilities: ServiceCapability[];

  connectionLabel: string;
  connectionTitle: string;
  connectionAccent: string;
  connectionText: string;
  connectionFlow: string[];

  ctaEyebrow: string;
  ctaTitle: string;
};

export const services: Service[] = [
  {
    slug: "road-freight",
    index: "01",
    name: "Road Freight",

    seoTitle: "Road Freight UK & Europe | MINAZ",
    seoDescription:
      "Road freight and transport coordination connecting the United Kingdom with European markets.",

    headline: "ROAD FREIGHT",
    headlineAccent: "WITHOUT FRICTION.",
    description:
      "Flexible road freight solutions connecting businesses across the United Kingdom and Europe through coordinated transport planning, carrier management and clear operational communication.",

    image: "/services-road.jpg",
    imageLabel: "UK ↔ EUROPE",
    imageSubLabel: "ROAD FREIGHT NETWORK",

    overviewTitle: "BUILT AROUND",
    overviewAccent: "YOUR CARGO.",
    overviewParagraphs: [
      "Road transport remains one of the most flexible ways to move commercial cargo between the UK and European markets.",
      "MINAZ coordinates shipments around cargo requirements, timing, route and delivery conditions — giving businesses one clear operational point of contact throughout the movement.",
    ],

    capabilitiesIntro:
      "Flexible transport solutions for different shipment profiles.",

    capabilities: [
      {
        number: "01",
        title: "FTL Transport",
        text: "Dedicated full-load transport for shipments requiring direct capacity and coordinated delivery.",
      },
      {
        number: "02",
        title: "LTL Freight",
        text: "Flexible part-load solutions for cargo that does not require an entire vehicle.",
      },
      {
        number: "03",
        title: "Dedicated Transport",
        text: "Time-sensitive road transport planned around specific collection and delivery requirements.",
      },
      {
        number: "04",
        title: "Transport Coordination",
        text: "Operational communication and shipment coordination from collection through final delivery.",
      },
    ],

    connectionLabel: "04 / CONNECTION",
    connectionTitle: "UNITED KINGDOM",
    connectionAccent: "↔ EUROPE",
    connectionText:
      "From local collection through international linehaul and final delivery, each stage is coordinated as part of one transport flow.",
    connectionFlow: ["COLLECTION", "TRANSIT", "DELIVERY"],

    ctaEyebrow: "NEED ROAD FREIGHT?",
    ctaTitle: "LET’S PLAN THE MOVEMENT.",
  },

  {
    slug: "air-freight",
    index: "02",
    name: "Air Freight",

    seoTitle: "Air Freight UK & International | MINAZ",
    seoDescription:
      "International air freight solutions for time-critical cargo moving between the UK and global markets.",

    headline: "AIR FREIGHT",
    headlineAccent: "WHEN TIME MATTERS.",
    description:
      "Air freight solutions for urgent and time-sensitive international cargo, coordinated around scheduling, documentation and delivery requirements.",

    image: "/services-air.jpg",
    imageLabel: "UK ↔ WORLD",
    imageSubLabel: "AIR FREIGHT NETWORK",

    overviewTitle: "BUILT FOR",
    overviewAccent: "SPEED.",
    overviewParagraphs: [
      "Air freight provides fast access to international markets when delivery time is critical.",
      "MINAZ coordinates each movement from booking and documentation through airport handling and final delivery, maintaining clear communication throughout the shipment.",
    ],

    capabilitiesIntro:
      "Air cargo solutions built around speed, visibility and control.",

    capabilities: [
      {
        number: "01",
        title: "Express Air Freight",
        text: "Fast transport solutions for cargo requiring priority international movement.",
      },
      {
        number: "02",
        title: "Airport to Airport",
        text: "Coordinated air cargo movement between international airport networks.",
      },
      {
        number: "03",
        title: "Door to Door",
        text: "Air freight combined with collection and final delivery coordination.",
      },
      {
        number: "04",
        title: "Cargo Coordination",
        text: "Documentation, communication and operational oversight throughout the shipment.",
      },
    ],

    connectionLabel: "04 / GLOBAL ACCESS",
    connectionTitle: "UNITED KINGDOM",
    connectionAccent: "↔ WORLD",
    connectionText:
      "Air transport connects time-critical cargo with international markets through coordinated airport and delivery networks.",
    connectionFlow: ["COLLECTION", "AIRPORT", "DELIVERY"],

    ctaEyebrow: "NEED AIR FREIGHT?",
    ctaTitle: "LET’S GET IT MOVING.",
  },

  {
    slug: "ocean-freight",
    index: "03",
    name: "Ocean Freight",

    seoTitle: "Ocean Freight FCL & LCL | MINAZ",
    seoDescription:
      "FCL and LCL ocean freight solutions connecting UK businesses with international markets.",

    headline: "OCEAN FREIGHT",
    headlineAccent: "BUILT FOR DISTANCE.",
    description:
      "International ocean freight solutions for commercial cargo requiring reliable, flexible and cost-conscious global transport.",

    image: "/services-ocean.jpg",
    imageLabel: "PORT ↔ PORT",
    imageSubLabel: "GLOBAL OCEAN FREIGHT",

    overviewTitle: "GLOBAL CARGO.",
    overviewAccent: "CLEAR CONTROL.",
    overviewParagraphs: [
      "Ocean freight remains a core solution for moving commercial cargo across international markets.",
      "MINAZ coordinates container movements through shipping partners, ports and inland transport connections while maintaining clear operational communication.",
    ],

    capabilitiesIntro:
      "Flexible container shipping for different cargo volumes and requirements.",

    capabilities: [
      {
        number: "01",
        title: "FCL Shipping",
        text: "Full-container-load transport for shipments requiring dedicated container capacity.",
      },
      {
        number: "02",
        title: "LCL Shipping",
        text: "Consolidated ocean freight for cargo that does not require a full container.",
      },
      {
        number: "03",
        title: "Port Coordination",
        text: "Operational support across booking, documentation and port handling stages.",
      },
      {
        number: "04",
        title: "Final Delivery",
        text: "Coordination from port arrival through onward inland transport and delivery.",
      },
    ],

    connectionLabel: "04 / GLOBAL CONNECTION",
    connectionTitle: "UNITED KINGDOM",
    connectionAccent: "↔ WORLD",
    connectionText:
      "Ocean freight connects UK businesses with global supply chains through coordinated port, container and inland transport movements.",
    connectionFlow: ["ORIGIN", "OCEAN", "DESTINATION"],

    ctaEyebrow: "PLANNING OCEAN FREIGHT?",
    ctaTitle: "LET’S CONNECT THE PORTS.",
  },

  {
    slug: "cargo-express",
    index: "04",
    name: "Cargo Express",

    seoTitle: "Cargo Express & Urgent Transport | MINAZ",
    seoDescription:
      "Express and dedicated freight solutions for urgent and time-sensitive cargo.",

    headline: "CARGO EXPRESS",
    headlineAccent: "EVERY HOUR COUNTS.",
    description:
      "Dedicated express transport for urgent cargo requiring fast collection, direct movement and clear operational communication.",

    image: "/services-express.jpg",
    imageLabel: "TIME CRITICAL",
    imageSubLabel: "EXPRESS CARGO",

    overviewTitle: "BUILT AROUND",
    overviewAccent: "URGENCY.",
    overviewParagraphs: [
      "Some shipments cannot wait for standard transport schedules or consolidation.",
      "MINAZ coordinates express cargo movements around collection time, route and delivery priority to provide a focused transport solution.",
    ],

    capabilitiesIntro:
      "Dedicated transport options for urgent and time-critical shipments.",

    capabilities: [
      {
        number: "01",
        title: "Dedicated Vehicle",
        text: "Direct vehicle capacity allocated around a specific shipment requirement.",
      },
      {
        number: "02",
        title: "Urgent Collection",
        text: "Transport planning focused on rapid collection and dispatch.",
      },
      {
        number: "03",
        title: "Direct Delivery",
        text: "Reduced handling and direct movement toward the required destination.",
      },
      {
        number: "04",
        title: "Live Coordination",
        text: "Clear operational communication throughout the express movement.",
      },
    ],

    connectionLabel: "04 / EXPRESS FLOW",
    connectionTitle: "COLLECTION",
    connectionAccent: "→ DELIVERY",
    connectionText:
      "Express movements are designed around speed, direct coordination and clear communication from request through completion.",
    connectionFlow: ["REQUEST", "DISPATCH", "DELIVER"],

    ctaEyebrow: "IS THE SHIPMENT URGENT?",
    ctaTitle: "LET’S MOVE NOW.",
  },

  {
    slug: "logistics",
    index: "05",
    name: "Logistics",

    seoTitle: "Logistics Solutions UK & Europe | MINAZ",
    seoDescription:
      "Transport planning, logistics coordination and operational support for UK and European cargo flows.",

    headline: "LOGISTICS",
    headlineAccent: "CONTROL AT EVERY STAGE.",
    description:
      "Flexible logistics solutions combining transport planning, operational coordination and communication across complex cargo movements.",

    image: "/services-logistics.jpg",
    imageLabel: "PLAN · CONTROL · MOVE",
    imageSubLabel: "LOGISTICS OPERATIONS",

    overviewTitle: "ONE FLOW.",
    overviewAccent: "FULL VISIBILITY.",
    overviewParagraphs: [
      "Modern logistics requires more than booking transport. Each movement depends on planning, coordination and communication working together.",
      "MINAZ supports businesses by coordinating freight operations across carriers, routes and delivery requirements.",
    ],

    capabilitiesIntro:
      "Operational logistics support designed around your transport requirements.",

    capabilities: [
      {
        number: "01",
        title: "Transport Planning",
        text: "Shipment planning based on cargo, destination, timing and operational requirements.",
      },
      {
        number: "02",
        title: "Carrier Coordination",
        text: "Communication and operational alignment across transport partners.",
      },
      {
        number: "03",
        title: "Cargo Management",
        text: "Shipment oversight designed to maintain visibility throughout the movement.",
      },
      {
        number: "04",
        title: "Operational Support",
        text: "Clear coordination from transport request through final delivery.",
      },
    ],

    connectionLabel: "04 / OPERATIONS",
    connectionTitle: "PLAN",
    connectionAccent: "→ EXECUTE",
    connectionText:
      "Every stage is coordinated around one objective: keeping cargo moving through a clear operational process.",
    connectionFlow: ["PLAN", "COORDINATE", "DELIVER"],

    ctaEyebrow: "NEED LOGISTICS SUPPORT?",
    ctaTitle: "LET’S BUILD THE FLOW.",
  },

  {
    slug: "transport-coordination",
    index: "06",
    name: "Transport Coordination",

    seoTitle: "Transport Coordination | MINAZ",
    seoDescription:
      "Professional transport coordination and freight communication across UK and European cargo movements.",

    headline: "TRANSPORT",
    headlineAccent: "COORDINATED.",
    description:
      "Professional transport coordination designed to keep carriers, customers, documentation and delivery requirements aligned throughout the movement.",

    image: "/services-coordination.jpg",
    imageLabel: "ONE POINT OF CONTACT",
    imageSubLabel: "TRANSPORT COORDINATION",

    overviewTitle: "CLEAR COMMUNICATION.",
    overviewAccent: "FULL CONTROL.",
    overviewParagraphs: [
      "Transport execution depends on timely information and coordination between multiple parties.",
      "MINAZ provides one operational point of contact for shipment communication, planning and transport coordination from collection through delivery.",
    ],

    capabilitiesIntro:
      "Clear operational coordination throughout every stage of transport.",

    capabilities: [
      {
        number: "01",
        title: "Carrier Communication",
        text: "Operational communication with transport partners throughout the movement.",
      },
      {
        number: "02",
        title: "Shipment Planning",
        text: "Coordination around collection, routing and delivery requirements.",
      },
      {
        number: "03",
        title: "Documentation Flow",
        text: "Clear exchange of shipment information and operational documentation.",
      },
      {
        number: "04",
        title: "Delivery Coordination",
        text: "Communication and oversight through the final delivery stage.",
      },
    ],

    connectionLabel: "04 / CONTROL",
    connectionTitle: "ONE SHIPMENT.",
    connectionAccent: "ONE FLOW.",
    connectionText:
      "Customers, carriers and operational requirements are coordinated through one clear transport process.",
    connectionFlow: ["REQUEST", "CONTROL", "COMPLETE"],

    ctaEyebrow: "NEED TRANSPORT COORDINATION?",
    ctaTitle: "LET’S TAKE CONTROL.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}