export interface CertificateItem {
  code: string;
  name: string;
  description: string;
  obtained: boolean;
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface ClientLogo {
  name: string;
  svgPath?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  organisation: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  email: string;
  linkedin: string;
  image: string;
}

export interface CompanyConfig {
  name: string;
  shortName: string;
  tagline: string;
  phoneDisplay: string;
  phoneRaw: string;
  emergencyPhoneDisplay: string;
  emergencyPhoneRaw: string;
  email: string;
  jobsEmail: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
  };
  kvk: string;
  btw: string;
  foundingYear: number;
  responseTimeHours: number;
  socials: {
    linkedin: string;
    instagram: string;
  };
  stats: StatItem[];
  certificates: CertificateItem[];
  clientLogos: ClientLogo[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  regions: {
    id: string;
    name: string;
    city: string;
    x: number;
    y: number;
    responseMinutes: string;
  }[];
}

export const company: CompanyConfig = {
  name: 'Atlas Holland B.V.',
  shortName: 'Atlas Holland',
  tagline: 'Gecertificeerde verkeersregelaars & complete verkeersoplossingen',
  phoneDisplay: '088 — 285 27 00',
  phoneRaw: '+31882852700',
  emergencyPhoneDisplay: '088 — 285 27 99',
  emergencyPhoneRaw: '+31882852799',
  email: 'planning@atlasholland.nl',
  jobsEmail: 'werkenbij@atlasholland.nl',
  address: {
    street: 'Atoomweg 412',
    postalCode: '3542 AB',
    city: 'Utrecht',
    region: 'Utrecht',
    country: 'Nederland',
  },
  kvk: '84920174',
  btw: 'NL863421098B01',
  foundingYear: 2016,
  responseTimeHours: 24,
  socials: {
    linkedin: 'https://www.linkedin.com/company/atlas-holland-bv',
    instagram: 'https://www.instagram.com/atlashollandbv',
  },
  stats: [
    {
      value: 185,
      suffix: '+',
      label: 'INZETBARE VAKMENSEN',
      sublabel: 'Landelijk gecertificeerde verkeersregelaars & portiers',
    },
    {
      value: 24,
      suffix: '/7',
      label: 'PLANNING & SPOEDLIJN',
      sublabel: 'Directe inzet bij calamiteiten en spoedafzettingen',
    },
    {
      value: 24,
      prefix: '< ',
      suffix: ' UUR',
      label: 'OFFERTE & PLANVOORSTEL',
      sublabel: 'Heldere prijsopgave en capaciteitsbevestiging',
    },
    {
      value: 1400,
      suffix: '+',
      label: 'PROJECTEN PER JAAR',
      sublabel: 'Infra, bouwplaatsen, netbeheer en evenementen',
    },
  ],
  certificates: [
    {
      code: 'VCA**',
      name: 'VGM Checklist Aannemers',
      description: 'Strikte naleving van veiligheid, gezondheid en milieu op elke projectlocatie.',
      obtained: true,
    },
    {
      code: 'BRL 9101',
      name: 'Tijdelijke Verkeersmaatregelen',
      description: 'Conform CROW-richtlijnen 96a/96b voor wegafzettingen en omleidingsroutes.',
      obtained: true,
    },
    {
      code: 'SVNL',
      name: 'Stichting Verkeersregelaars NL',
      description: 'Landelijke aanstellingspas en jaarlijkse herinstructie voor beroepsverkeersregelaars.',
      obtained: true,
    },
    {
      code: 'ISO 9001',
      name: 'Kwaliteitsmanagement',
      description: 'Geborgde werkprocessen van projectvoorbereiding tot evaluatie op locatie.',
      obtained: true,
    },
    {
      code: 'NEN 4400-1',
      name: 'SNA Keurmerk Arbeid',
      description: 'Betrouwbare inleen van personeel en correcte afdracht van loonheffingen.',
      obtained: true,
    },
    {
      code: 'PSO-TREDE 3',
      name: 'Prestatieladder Socialer Ondernemen',
      description: 'Duurzame instroom en opleiding van mensen met afstand tot de arbeidsmarkt.',
      obtained: false,
    },
  ],
  // Ship empty as required: "The logo row and testimonials section hide when their lists are empty (ship them empty)."
  clientLogos: [],
  testimonials: [],
  team: [
    {
      name: 'Hendrik van derulp',
      role: 'Operationeel Directeur',
      department: 'Directie & Grote Projecten',
      email: 'h.vanderulp@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: '/images/atlas-controller-hero.svg',
    },
    {
      name: 'Nadia el Amrani',
      role: 'Hoofd Planning & 24/7 Centrale',
      department: 'Planning & Spoedinzet',
      email: 'planning@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: '/images/atlas-planning-ops.svg',
    },
    {
      name: 'Martijn de Vries',
      role: 'Senior Verkeerskundig Adviseur',
      department: 'Verkeersplannen & BLVC',
      email: 'verkeerskunde@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: '/images/atlas-traffic-plan.svg',
    },
    {
      name: 'Sanne Vermeer',
      role: 'Coördinator Opleiding & Instroom',
      department: 'Werven & Praktijkinstructie',
      email: 'werkenbij@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: '/images/atlas-academy.svg',
    },
  ],
  regions: [
    { id: 'utrecht', name: 'Midden-Nederland (Hoofdkantoor)', city: 'Utrecht / Amersfoort', x: 52, y: 53, responseMinutes: '30 min' },
    { id: 'noord-holland', name: 'Regio Noord-West & Metropool', city: 'Amsterdam / Haarlem / Alkmaar', x: 43, y: 38, responseMinutes: '35 min' },
    { id: 'zuid-holland', name: 'Regio Rijnmond & Haaglanden', city: 'Rotterdam / Den Haag / Leiden', x: 34, y: 56, responseMinutes: '35 min' },
    { id: 'noord-brabant', name: 'Regio Zuid & Brainport', city: 'Breda / Tilburg / Eindhoven', x: 51, y: 74, responseMinutes: '40 min' },
    { id: 'gelderland', name: 'Regio Oost & Veluwe', city: 'Arnhem / Nijmegen / Apeldoorn', x: 68, y: 55, responseMinutes: '40 min' },
    { id: 'overijssel', name: 'Regio IJsselland & Twente', city: 'Zwolle / Deventer / Enschede', x: 74, y: 40, responseMinutes: '45 min' },
    { id: 'noord', name: 'Regio Noord', city: 'Groningen / Leeuwarden / Assen', x: 72, y: 18, responseMinutes: '45 min' },
    { id: 'limburg', name: 'Regio Zuid-Oost', city: 'Venlo / Roermond / Maastricht', x: 66, y: 86, responseMinutes: '45 min' },
  ],
};

export function getPhoneHref(rawPhone = company.phoneRaw): string {
  return `tel:${rawPhone}`;
}

export function getMailHref(email = company.email, subject?: string): string {
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
