import type { Specialist } from "../types/specialist";

export const specialistsExample: Specialist[] = [
  {
    _id: "sp-pod-ana-garcia",
    slug: "ana-garcia",
    name: "Dra. Ana Garcia",
    specialty: "Podologia clinica",
    specialtyCategory: "podologia",
    shortBio: "Atencion preventiva y clinica de pie diabetico, unas encarnadas y hongos.",
    focusAreas: ["Una encarnada", "Pie diabetico", "Verruga plantar", "Cuidado preventivo"],
    active: true,
    order: 1,
    useWhatsAppButton: true,
    whatsAppNumber: "525525388683",
  },
  {
    _id: "sp-psi-luisa-ortiz",
    slug: "luisa-ortiz",
    name: "Lic. Luisa Ortiz",
    specialty: "Psicologia clinica",
    specialtyCategory: "psicologia",
    shortBio: "Acompanamiento emocional para adolescentes y adultos.",
    focusAreas: ["Ansiedad", "Duelo", "Estres", "Autoestima"],
    active: true,
    order: 2,
    useWhatsAppButton: true,
  },
];
