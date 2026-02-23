export const business = {
  name: "Podólogos Vía Morelos Tulpetlac",
  area: "Tulpetlac, Ecatepec",
  address: "Vía Morelos 232, Sta María Tulpetlac, 55400 Ecatepec de Morelos, Méx.",
  phone: "55 2538 8683",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=V%C3%ADa%20Morelos%20232%2C%20Sta%20Maria%20Tulpetlac%2C%2055400%20Ecatepec%20de%20Morelos%2C%20M%C3%A9x.",
  hoursText: "Lun–Sáb 10:00 a 19:00 (ejemplo)",

  // WhatsApp (formato: 52 + 10 dígitos, sin espacios)
  whatsappCitasNumber: "",            // cuando tengan el número de citas, lo pones aquí
  whatsappFallbackNumber: "5215525388683", // mientras, usa el actual
};

export const services = [
  {
    title: "Podología",
    slug: "podologia",
    short: "Atención integral del pie: uña encarnada, callosidades y más.",
    long: "Evaluación y tratamiento de padecimientos comunes del pie. Atención con higiene y enfoque preventivo.",
    includes: ["Valoración inicial", "Recomendaciones de cuidado", "Tratamiento según el caso"],
    duration: "45 min aprox.",
    priceFrom: 100,
  },
  {
    title: "Psicología",
    slug: "psicologia",
    short: "Acompañamiento emocional y terapia enfocada a objetivos.",
    long: "Espacio de apoyo profesional para trabajar estrés, ansiedad, duelo, autoestima y temas personales.",
    includes: ["Entrevista inicial", "Plan de trabajo", "Seguimiento"],
    duration: "50 min aprox.",
    priceFrom: 100,
  },
  {
    title: "Óptica",
    slug: "optica",
    short: "Lentes y orientación: armazones y opciones según necesidad.",
    long: "Te ayudamos a elegir lentes adecuados y te orientamos según tu uso (trabajo, escuela, conducción).",
    includes: ["Asesoría básica", "Opciones de armazón", "Recomendación según uso"],
    duration: "30 min aprox.",
    priceFrom: 100,
  },
  {
    title: "Quiropráctica",
    slug: "quiropractica",
    short: "Atención para molestias musculares y postura (según valoración).",
    long: "Valoración y atención enfocada a movilidad, postura y molestias musculares comunes.",
    includes: ["Valoración", "Sesión según el caso", "Recomendaciones post-sesión"],
    duration: "40 min aprox.",
    priceFrom: 100,
  },
];

export const promotions = [
  {
    title: "Consulta a $100 (Promo de lanzamiento)",
    short: "Aplica a servicios seleccionados. Cupo limitado.",
    startDate: "2026-02-01",
    endDate: "2026-03-31",
    pinned: true,
    active: true,
    services: ["podologia", "psicologia", "optica", "quiropractica"],
  },
];

export const gallery = [
  {
    type: "image",
    title: "Instalaciones",
    category: "instalaciones",
    active: true,
    imageUrl: "/placeholder.jpg",
  },

  // ✅ TikTok: usa URL real de video (no "tucuenta/video/123")
  {
    type: "video",
    title: "TikTok (demo)",
    category: "podologia",
    active: true,
    platform: "tiktok",
    url: "https://www.tiktok.com/@tiktok/video/7317662641582433566",
  },

  // ✅ YouTube: tu Rickroll puede fallar si no permite embed; este suele permitir embed
  {
    type: "video",
    title: "YouTube (demo)",
    category: "optica",
    active: true,
    platform: "youtube",
    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  },

  // ⚠️ Facebook: el plugin falla si la URL no es un video/post público real.
  // Por ahora lo dejamos como link a una página pública de videos (fallback "Abrir en Facebook" funciona).
  {
    type: "video",
    title: "Facebook (demo)",
    category: "instalaciones",
    active: true,
    platform: "facebook",
    url: "https://www.facebook.com/watch/",
  },
];