/**
 * Seed script – FumiPro NC demo content
 * Run: node scripts/seed-fumigacion.mjs
 * Requires: cms/.env with SANITY_STUDIO_PROJECT_ID and SANITY_TOKEN
 */
import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "../.env") });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "4nyua0ve",
  dataset:   process.env.SANITY_STUDIO_DATASET   || "production",
  token:     process.env.SANITY_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

// ─── helpers ────────────────────────────────────────────────────────────────

const slug = (s) => ({ _type: "slug", current: s });

async function upsert(doc) {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id });
  if (existing) {
    console.log(`  skip  ${doc._type} "${doc._id}" (ya existe)`);
    return;
  }
  await client.create(doc);
  console.log(`  ✓  ${doc._type} "${doc._id}"`);
}

// ─── businessInfo ────────────────────────────────────────────────────────────

const businessInfo = {
  _id:  "businessInfo",
  _type: "businessInfo",
  name:  "FumiPro NC",
  area:  "Charlotte, NC",
  phone: "(704) 555-0192",
  address: "4521 Sharon Rd, Charlotte, NC 28211",
  mapsUrl: "https://maps.google.com/?q=4521+Sharon+Rd+Charlotte+NC+28211",
  weekdayHours: "8 a.m. – 5 p.m.",
  saturdayHours: "8 a.m. – 12 p.m.",
  sundayOpen: false,
  hoursText: "Mo-Fr 08:00-17:00, Sa 08:00-12:00",

  whatsappCitasNumber: "17045550192",
  whatsappGeneralMessage: "Hola, quiero solicitar un servicio de fumigación en FumiPro NC. ¿Me pueden dar información?",
  whatsappQuickProblemDefault: "Quiero una inspección inicial.",

  homeHeroEyebrow: "Control de plagas profesional · Charlotte, NC",
  homeHeroTitle:   "Protección total contra plagas en tu hogar y negocio",
  homeHeroSubtitle: "Más de 10 años eliminando plagas en Charlotte, NC. Roedores, cucarachas, termitas, chinches y más — garantía de resultados.",
  homePrimaryCtaText: "Solicitar inspección",
  homePrimaryCtaUrl:  "/agendar",
  homeSecondaryCtaText: "Ver servicios",
  homeSecondaryCtaUrl:  "/servicios",
  homePromotionsTitle:    "Ofertas de temporada",
  homePromotionsSubtitle: "Aprovecha nuestros paquetes especiales para proteger tu hogar al mejor precio.",
  homeGoogleReviewsTitle:    "Lo que dicen nuestros clientes",
  homeGoogleReviewsSubtitle: "Más de 200 hogares y negocios en Charlotte confían en FumiPro NC.",
  homeGoogleReviewsCtaText:  "Ver reseñas en Google",

  locationZoneText: "South Charlotte · cerca de SouthPark Mall",
  locationReferencesText: "A 2 cuadras del Harris Teeter | Frente al Walgreens de Sharon Rd",
  locationParkingText: "Estacionamiento gratuito en el local",
  locationAccessText: "Planta baja, acceso sin escalones",
  locationGuideTips: [
    "Saca a mascotas y niños del área antes de la visita.",
    "Guarda alimentos en recipientes cerrados.",
    "Avísanos si alguien en casa tiene alergias.",
  ],

  socialShareTitle: "FumiPro NC – Control de plagas en Charlotte",
  socialShareDescription: "Eliminamos roedores, cucarachas, termitas, chinches y más. Servicio certificado con garantía. Llama al (704) 555-0192.",

  footerTagline: "Control de plagas profesional en Charlotte, NC",
  footerMenuTitle: "Menú",
  footerSiteTitle: "Sobre el sitio",
  footerPrivacyLabel: "Aviso de privacidad",
  footerPrivacyUrl: "/privacidad",
  footerNoticesLabel: "Comunicados",
  footerNoticesUrl: "/comunicados",
  footerCopyrightText: "Todos los derechos reservados.",

  facebookUrl:  "https://facebook.com/fumipronc",
  instagramUrl: "https://instagram.com/fumipronc",
};

// ─── aboutSection ────────────────────────────────────────────────────────────

const aboutSection = {
  _id:  "aboutSection",
  _type: "aboutSection",
  title: "Más de 10 años protegiendo hogares en Charlotte",
  intro: "En FumiPro NC combinamos técnicas modernas con productos certificados por la EPA para eliminar plagas de forma segura y definitiva. Cada tratamiento incluye inspección, diagnóstico y garantía escrita.",
  secondary: "Nuestro equipo de técnicos certificados atiende toda el área metropolitana de Charlotte: South Charlotte, Ballantyne, University City, NoDa y más.",
  specialistsTitle:    "Nuestros técnicos",
  specialistsSubtitle: "Profesionales certificados que protegen tu hogar.",
  servicesTitle:    "Lo que eliminamos",
  servicesSubtitle: "Cobertura completa contra los principales tipos de plagas.",
  ctaText: "Solicitar servicio",
  ctaUrl:  "/agendar",
};

// ─── services ────────────────────────────────────────────────────────────────

const services = [
  {
    _id: "service-inspeccion",
    title:    "Inspección General",
    titleEn:  "General Inspection",
    category: "inspeccion",
    slug:     slug("inspeccion-general"),
    short:    "Diagnóstico completo de tu propiedad para detectar cualquier tipo de plaga.",
    shortEn:  "Full property assessment to detect any type of pest infestation.",
    long:     "Nuestro técnico recorre toda la propiedad inspeccionando áreas de riesgo: cocina, baños, sótano, ático y perímetro exterior. Al final recibes un reporte con los hallazgos y el plan de tratamiento recomendado.",
    longEn:   "Our technician walks through the entire property inspecting high-risk areas: kitchen, bathrooms, basement, attic, and exterior perimeter. You receive a written report with findings and a recommended treatment plan.",
    includes:   ["Revisión interior y exterior", "Reporte escrito de hallazgos", "Plan de tratamiento incluido", "Sin compromiso"],
    includesEn: ["Interior and exterior walkthrough", "Written findings report", "Included treatment plan", "No commitment"],
    duration: "1-2 hrs",
    priceFrom: 0,
    order: 1,
    active: true,
  },
  {
    _id: "service-roedores",
    title:    "Control de Roedores",
    titleEn:  "Rodent Control",
    category: "roedores",
    slug:     slug("control-de-roedores"),
    short:    "Eliminamos ratas y ratones con trampas, cebos y sellado de entradas.",
    shortEn:  "We eliminate rats and mice with traps, bait stations, and entry-point sealing.",
    long:     "Colocamos estaciones de cebo y trampas estratégicas. Identificamos y sellamos todos los puntos de entrada para evitar reinfestaciones. Incluye seguimiento a los 10 días.",
    longEn:   "We place strategic bait stations and traps. We identify and seal all entry points to prevent re-infestation. Includes a 10-day follow-up visit.",
    includes:   ["Estaciones de cebo certificadas", "Sellado de accesos", "Seguimiento a 10 días", "Garantía 30 días"],
    includesEn: ["Certified bait stations", "Entry-point sealing", "10-day follow-up", "30-day guarantee"],
    duration: "2-3 hrs",
    priceFrom: 150,
    order: 2,
    active: true,
  },
  {
    _id: "service-cucarachas",
    title:    "Fumigación de Cucarachas",
    titleEn:  "Cockroach Treatment",
    category: "cucarachas",
    slug:     slug("fumigacion-de-cucarachas"),
    short:    "Tratamiento de gel y aspersión para eliminar cucarachas de raíz.",
    shortEn:  "Gel bait and spray treatment to eliminate cockroaches at the source.",
    long:     "Aplicamos gel cebo en grietas y geles de contacto en zonas de actividad. El tratamiento actúa sobre adultos, ninfas y huevos. Garantía de 30 días con seguimiento incluido.",
    longEn:   "We apply gel bait in cracks and contact gels in activity zones. Treatment works on adults, nymphs, and eggs. 30-day guarantee with follow-up included.",
    includes:   ["Gel cebo de alta efectividad", "Aspersión residual", "Tratamiento de alcantarillas", "Garantía 30 días"],
    includesEn: ["High-effectiveness gel bait", "Residual spray", "Drain treatment", "30-day guarantee"],
    duration: "1-2 hrs",
    priceFrom: 120,
    order: 3,
    active: true,
  },
  {
    _id: "service-termitas",
    title:    "Tratamiento para Termitas",
    titleEn:  "Termite Treatment",
    category: "termitas",
    slug:     slug("tratamiento-para-termitas"),
    short:    "Eliminación de termitas subterráneas y de madera con métodos certificados.",
    shortEn:  "Elimination of subterranean and wood termites using certified methods.",
    long:     "Aplicamos barrera química en el perímetro, estaciones de monitoreo en el suelo y tratamiento directo en madera afectada. Incluye reporte estructural y garantía de 1 año.",
    longEn:   "We apply a chemical barrier around the perimeter, underground monitoring stations, and direct treatment on affected wood. Includes a structural report and 1-year warranty.",
    includes:   ["Barrera química perimetral", "Estaciones de monitoreo", "Tratamiento en madera", "Garantía 1 año"],
    includesEn: ["Perimeter chemical barrier", "Monitoring stations", "Wood treatment", "1-year warranty"],
    duration: "3-5 hrs",
    priceFrom: 350,
    order: 4,
    active: true,
  },
  {
    _id: "service-chinches",
    title:    "Eliminación de Chinches de Cama",
    titleEn:  "Bed Bug Elimination",
    category: "chinches",
    slug:     slug("eliminacion-de-chinches"),
    short:    "Tratamiento intensivo de calor y productos residuales para chinches.",
    shortEn:  "Intensive heat and residual product treatment for bed bugs.",
    long:     "Combinamos vapor de alta temperatura con aspersión residual para eliminar chinches en todas sus etapas. Incluye dos visitas para asegurar resultados.",
    longEn:   "We combine high-temperature steam with residual spray to eliminate bed bugs at all life stages. Includes two visits to ensure results.",
    includes:   ["Tratamiento de vapor a alta temperatura", "Aspersión residual", "2 visitas incluidas", "Garantía 60 días"],
    includesEn: ["High-temperature steam treatment", "Residual spray", "2 visits included", "60-day guarantee"],
    duration: "4-6 hrs",
    priceFrom: 280,
    order: 5,
    active: true,
  },
  {
    _id: "service-hormigas",
    title:    "Control de Hormigas",
    titleEn:  "Ant Control",
    category: "hormigas",
    slug:     slug("control-de-hormigas"),
    short:    "Eliminamos colonias de hormigas dentro y fuera del hogar.",
    shortEn:  "We eliminate ant colonies inside and outside the home.",
    long:     "Identificamos el tipo de hormiga y la ubicación del nido. Aplicamos cebo específico y tratamiento en perímetro exterior para evitar reinvasiones.",
    longEn:   "We identify the ant species and nest location. We apply species-specific bait and exterior perimeter treatment to prevent re-invasion.",
    includes:   ["Identificación de especie", "Cebo específico", "Tratamiento exterior", "Garantía 30 días"],
    includesEn: ["Species identification", "Targeted bait", "Exterior treatment", "30-day guarantee"],
    duration: "1-2 hrs",
    priceFrom: 130,
    order: 6,
    active: true,
  },
  {
    _id: "service-avispas",
    title:    "Retiro de Avispas y Abejas",
    titleEn:  "Wasp & Bee Removal",
    category: "avispas",
    slug:     slug("retiro-de-avispas-y-abejas"),
    short:    "Retiro seguro de nidos de avispas y reubicación de abejas nativas.",
    shortEn:  "Safe removal of wasp nests and relocation of native bees.",
    long:     "Eliminamos nidos de avispas y chaquetas amarillas con productos de acción rápida. Para abejas nativas coordinamos reubicación con apicultores locales.",
    longEn:   "We eliminate wasp and yellow jacket nests with fast-acting products. For native bees, we coordinate relocation with local beekeepers.",
    includes:   ["Retiro de nido", "Tratamiento residual", "Reubicación de abejas nativas", "Inspección de reinfestación"],
    includesEn: ["Nest removal", "Residual treatment", "Native bee relocation", "Re-infestation inspection"],
    duration: "1-3 hrs",
    priceFrom: 180,
    order: 7,
    active: true,
  },
  {
    _id: "service-general",
    title:    "Fumigación General Preventiva",
    titleEn:  "General Preventive Fumigation",
    category: "general",
    slug:     slug("fumigacion-general-preventiva"),
    short:    "Tratamiento preventivo integral para mantener tu hogar libre de plagas.",
    shortEn:  "Comprehensive preventive treatment to keep your home pest-free.",
    long:     "Aspersión interior y exterior con productos de larga duración. Cubre cucarachas, hormigas, arañas, ciempiés y otras plagas comunes. Recomendado cada 3 meses.",
    longEn:   "Interior and exterior spray with long-lasting products. Covers cockroaches, ants, spiders, centipedes, and other common pests. Recommended every 3 months.",
    includes:   ["Aspersión interior completa", "Tratamiento perimetral exterior", "Sin olor fuerte en 2 horas", "Garantía 60 días"],
    includesEn: ["Full interior spray", "Exterior perimeter treatment", "Odor-free in 2 hours", "60-day guarantee"],
    duration: "2-3 hrs",
    priceFrom: 200,
    order: 8,
    active: true,
  },
];

// ─── specialists ─────────────────────────────────────────────────────────────

const specialists = [
  {
    _id: "specialist-carlos",
    _type: "specialistProfile",
    name: "Carlos Ramírez",
    specialty:   "Control de Roedores y Termitas",
    specialtyEn: "Rodent & Termite Control",
    specialtyCategory: "roedores",
    shortBio:   "Técnico certificado con más de 8 años de experiencia en control de roedores y tratamientos de termitas subterráneas. Cubre South Charlotte y Ballantyne.",
    shortBioEn: "Certified technician with 8+ years of experience in rodent control and subterranean termite treatments. Covers South Charlotte and Ballantyne.",
    focusAreas:   ["Roedores", "Termitas", "Sellado de accesos"],
    focusAreasEn: ["Rodents", "Termites", "Entry sealing"],
    ctaText: "Solicitar con Carlos",
    useWhatsAppButton: true,
    slug: slug("carlos-ramirez"),
    order: 1,
    active: true,
  },
  {
    _id: "specialist-ana",
    _type: "specialistProfile",
    name: "Ana Torres",
    specialty:   "Inspección y Chinches de Cama",
    specialtyEn: "Inspection & Bed Bug Specialist",
    specialtyCategory: "inspeccion",
    shortBio:   "Inspectora certificada de la EPA con especialización en detección de chinches de cama y diagnóstico de infestaciones complejas en residencias y hoteles.",
    shortBioEn: "EPA-certified inspector specializing in bed bug detection and complex infestation diagnostics in residential and hotel settings.",
    focusAreas:   ["Inspección general", "Chinches de cama", "Diagnóstico"],
    focusAreasEn: ["General inspection", "Bed bugs", "Diagnostics"],
    ctaText: "Solicitar con Ana",
    useWhatsAppButton: true,
    slug: slug("ana-torres"),
    order: 2,
    active: true,
  },
  {
    _id: "specialist-miguel",
    _type: "specialistProfile",
    name: "Miguel Santos",
    specialty:   "Fumigación General y Avispas",
    specialtyEn: "General Fumigation & Stinging Insects",
    specialtyCategory: "general",
    shortBio:   "Especialista en fumigación residencial y comercial. Experto en retiro de nidos de avispas y tratamientos preventivos trimestrales para negocios en Charlotte.",
    shortBioEn: "Specialist in residential and commercial fumigation. Expert in wasp nest removal and quarterly preventive treatments for businesses in Charlotte.",
    focusAreas:   ["Fumigación general", "Avispas y abejas", "Tratamientos comerciales"],
    focusAreasEn: ["General fumigation", "Wasps & bees", "Commercial treatments"],
    ctaText: "Solicitar con Miguel",
    useWhatsAppButton: true,
    slug: slug("miguel-santos"),
    order: 3,
    active: true,
  },
];

// ─── prices ──────────────────────────────────────────────────────────────────

const prices = [
  { _id: "price-inspeccion",  serviceTitle: "Inspección General",         category: "inspeccion", priceFrom: 0,   duration: "1-2 hrs",    note: "Primera inspección sin costo" },
  { _id: "price-roedores",    serviceTitle: "Control de Roedores",        category: "roedores",   priceFrom: 150, duration: "2-3 hrs",    note: "Incluye sellado de entradas" },
  { _id: "price-cucarachas",  serviceTitle: "Fumigación de Cucarachas",   category: "cucarachas", priceFrom: 120, duration: "1-2 hrs",    note: "Garantía 30 días" },
  { _id: "price-termitas",    serviceTitle: "Tratamiento para Termitas",  category: "termitas",   priceFrom: 350, duration: "3-5 hrs",    note: "Incluye reporte estructural" },
  { _id: "price-chinches",    serviceTitle: "Eliminación de Chinches",    category: "chinches",   priceFrom: 280, duration: "4-6 hrs",    note: "2 visitas incluidas · garantía 60 días" },
  { _id: "price-hormigas",    serviceTitle: "Control de Hormigas",        category: "hormigas",   priceFrom: 130, duration: "1-2 hrs",    note: "Interior y exterior" },
  { _id: "price-avispas",     serviceTitle: "Retiro de Avispas/Abejas",   category: "avispas",    priceFrom: 180, duration: "1-3 hrs",    note: "Reubicación de abejas nativas" },
  { _id: "price-general",     serviceTitle: "Fumigación General",         category: "general",    priceFrom: 200, duration: "2-3 hrs",    note: "Garantía 60 días" },
  { _id: "price-trimestral",  serviceTitle: "Plan Trimestral (3 visitas)", category: "general",   priceFrom: 510, duration: "Por visita", note: "15% de ahorro vs precio individual" },
  { _id: "price-paquete",     serviceTitle: "Paquete Hogar Completo",     category: "general",    priceFrom: 380, duration: "4-6 hrs",    note: "Cubre 3 plagas simultáneas" },
].map((p, i) => ({ ...p, _type: "priceItem", order: i + 1, active: true }));

// ─── faqs ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    _id: "faq-tiempo-espera",
    question: "¿Cuánto tiempo debo esperar para entrar a mi casa después de la fumigación?",
    answer: "Generalmente recomendamos esperar entre 2 y 4 horas con las ventanas abiertas antes de regresar. Para tratamientos de termitas o chinches, el tiempo puede ser mayor. Tu técnico te indicará el tiempo exacto según el producto usado.",
    questionEn: "How long should I wait before re-entering my home after fumigation?",
    answerEn: "We generally recommend waiting 2 to 4 hours with windows open before returning. For termite or bed bug treatments, the time may be longer. Your technician will specify the exact wait time based on the product used.",
    category: "general",
    featured: true,
  },
  {
    _id: "faq-seguridad-ninos",
    question: "¿Los productos que usan son seguros para niños y mascotas?",
    answer: "Sí. Utilizamos productos registrados por la EPA, aprobados para uso residencial. Pedimos que niños y mascotas salgan del área tratada durante el servicio y las horas posteriores indicadas. Una vez que se ventila el espacio, es completamente seguro.",
    questionEn: "Are the products you use safe for children and pets?",
    answerEn: "Yes. We use EPA-registered products approved for residential use. We ask that children and pets leave the treated area during the service and for the specified hours afterward. Once the space is ventilated, it is completely safe.",
    category: "general",
    featured: true,
  },
  {
    _id: "faq-garantia",
    question: "¿Tienen garantía si la plaga regresa?",
    answer: "Sí. La mayoría de nuestros servicios incluyen garantía de 30 a 60 días. Si la plaga regresa dentro de ese período, volvemos sin costo adicional. El tratamiento de termitas incluye garantía de 1 año.",
    questionEn: "Do you offer a guarantee if the pest returns?",
    answerEn: "Yes. Most of our services include a 30 to 60-day guarantee. If the pest returns within that period, we come back at no additional cost. Termite treatment includes a 1-year warranty.",
    category: "general",
    featured: true,
  },
  {
    _id: "faq-preparacion",
    question: "¿Qué debo hacer para preparar mi casa antes de la visita?",
    answer: "Te pedimos que guardes alimentos en recipientes herméticos, retires mascotas y saques juguetes pequeños del área a tratar. No es necesario mover muebles grandes. Te enviamos una guía de preparación cuando confirmas tu cita.",
    questionEn: "What should I do to prepare my home before the visit?",
    answerEn: "We ask that you store food in airtight containers, remove pets, and pick up small toys from the area to be treated. You do not need to move large furniture. We'll send you a preparation guide when you confirm your appointment.",
    category: "general",
    featured: false,
  },
  {
    _id: "faq-cuantas-visitas",
    question: "¿Cuántas visitas son necesarias para eliminar una infestación?",
    answer: "Depende del tipo de plaga y la severidad. Cucarachas y hormigas generalmente requieren 1-2 visitas. Chinches de cama requieren 2 visitas. Termitas pueden requerir tratamiento inicial más monitoreo continuo.",
    questionEn: "How many visits are needed to eliminate an infestation?",
    answerEn: "It depends on the pest type and severity. Cockroaches and ants typically require 1-2 visits. Bed bugs require 2 visits. Termites may need initial treatment plus ongoing monitoring.",
    category: "general",
    featured: false,
  },
  {
    _id: "faq-termitas-dano",
    question: "¿Cómo sé si tengo termitas y no solo hormigas?",
    answer: "Las termitas dejan alas descartadas cerca de ventanas, túneles de barro en paredes y madera que suena hueca al golpearla. Las hormigas carpinteras también dañan la madera pero no hacen túneles de barro. Te recomendamos programar una inspección para un diagnóstico preciso.",
    questionEn: "How do I know if I have termites and not just ants?",
    answerEn: "Termites leave discarded wings near windows, mud tubes on walls, and wood that sounds hollow when tapped. Carpenter ants also damage wood but don't leave mud tubes. We recommend scheduling an inspection for an accurate diagnosis.",
    category: "termitas",
    featured: false,
  },
  {
    _id: "faq-costo-inspeccion",
    question: "¿La inspección inicial tiene costo?",
    answer: "La primera inspección general es gratuita. Si decides contratar un tratamiento ese mismo día, aplicamos el precio del servicio directamente sin cargos adicionales por la inspección.",
    questionEn: "Is the initial inspection free of charge?",
    answerEn: "The first general inspection is free. If you decide to schedule a treatment that same day, we apply the service price directly with no additional inspection fees.",
    category: "inspeccion",
    featured: false,
  },
  {
    _id: "faq-plan-trimestral",
    question: "¿Vale la pena el plan trimestral de mantenimiento?",
    answer: "Sí, especialmente si tu propiedad tuvo infestaciones previas o está en una zona de alto riesgo. El plan trimestral incluye 3 visitas al año con prioridad en agenda, ahorro del 15% frente al precio individual y seguimiento continuo para prevenir reinfestaciones.",
    questionEn: "Is the quarterly maintenance plan worth it?",
    answerEn: "Yes, especially if your property has had previous infestations or is in a high-risk area. The quarterly plan includes 3 visits per year with priority scheduling, 15% savings compared to individual pricing, and continuous monitoring to prevent re-infestation.",
    category: "general",
    featured: false,
  },
].map((f) => ({ ...f, _type: "faqItem", order: 1, active: true }));

// ─── promotions ───────────────────────────────────────────────────────────────

const promotions = [
  {
    _id: "promo-inspeccion-gratis",
    _type: "promotion",
    title: "Inspección Gratuita",
    label: "Sin costo",
    shortDescription: "Primera inspección sin cargo. Diagnóstico completo de tu propiedad.",
    description: "Agenda tu primera inspección general sin ningún costo. Nuestro técnico evalúa toda la propiedad y te entrega un reporte detallado con el plan de tratamiento recomendado. Sin compromisos.",
    featured: true,
    pinned: true,
    targetCategories: ["inspeccion"],
    active: true,
    slug: slug("inspeccion-gratuita"),
  },
  {
    _id: "promo-paquete-hogar",
    _type: "promotion",
    title: "Paquete Hogar: 10% OFF",
    label: "10% descuento",
    shortDescription: "Combina 2 o más servicios y obtén 10% de descuento en el total.",
    description: "Contrata dos o más servicios en una sola visita y ahorra un 10% en el total. Ideal para hogares que necesitan control de múltiples plagas al mismo tiempo. Aplica solo en servicios del mismo día.",
    featured: true,
    pinned: false,
    targetCategories: ["general"],
    active: true,
    slug: slug("paquete-hogar-10-off"),
  },
  {
    _id: "promo-plan-trimestral",
    _type: "promotion",
    title: "Plan Trimestral de Mantenimiento",
    label: "Ahorra 15%",
    shortDescription: "3 visitas al año con prioridad en agenda y 15% de ahorro.",
    description: "Suscríbete a nuestro plan trimestral y recibe 3 visitas de fumigación preventiva al año. Prioridad en agenda, seguimiento continuo y 15% de ahorro frente al precio individual de cada visita.",
    featured: false,
    pinned: false,
    targetCategories: ["general"],
    active: true,
    slug: slug("plan-trimestral-mantenimiento"),
  },
];

// ─── gallery ─────────────────────────────────────────────────────────────────

const gallery = [
  {
    _id: "gallery-tratamiento-termitas",
    _type: "galleryItem",
    title: "Tratamiento de termitas en South Charlotte",
    category: "termitas",
    type: "photo",
    featured: true,
    order: 1,
    active: true,
  },
  {
    _id: "gallery-control-roedores",
    _type: "galleryItem",
    title: "Control de roedores en local comercial",
    category: "roedores",
    type: "photo",
    featured: true,
    order: 2,
    active: true,
  },
  {
    _id: "gallery-fumigacion-general",
    _type: "galleryItem",
    title: "Fumigación general preventiva en Ballantyne",
    category: "general",
    type: "photo",
    featured: false,
    order: 3,
    active: true,
  },
];

// ─── siteAnnouncement ────────────────────────────────────────────────────────

const announcements = [
  {
    _id: "announcement-bienvenida",
    _type: "siteAnnouncement",
    title: "¡Bienvenido a FumiPro NC! Primera inspección sin costo.",
    body: "Agenda tu inspección gratuita hoy. Cubrimos toda el área metropolitana de Charlotte.",
    featured: true,
    active: true,
  },
];

// ─── run ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀 FumiPro NC – Seed de contenido demo\n");

  console.log("📋 Business info...");
  await upsert(businessInfo);

  console.log("\n📖 About section...");
  await upsert({ ...aboutSection, _type: "aboutSection" });

  console.log("\n🛠  Servicios...");
  for (const s of services) await upsert({ ...s, _type: "service" });

  console.log("\n👷 Técnicos...");
  for (const s of specialists) await upsert(s);

  console.log("\n💲 Precios...");
  for (const p of prices) await upsert(p);

  console.log("\n❓ FAQs...");
  for (const f of faqs) await upsert(f);

  console.log("\n🎁 Promociones...");
  for (const p of promotions) await upsert(p);

  console.log("\n🖼  Galería...");
  for (const g of gallery) await upsert(g);

  console.log("\n📢 Anuncios...");
  for (const a of announcements) await upsert(a);

  console.log("\n✅ Seed completado.\n");
}

main().catch((err) => {
  console.error("Error en seed:", err.message);
  process.exit(1);
});
