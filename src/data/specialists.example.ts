import type { Specialist } from "../types/specialist";

export const specialistsExample: Specialist[] = [
  {
    _id: "sp-fumi-carlos-perez",
    slug: "carlos-perez",
    name: "Carlos Pérez",
    specialty: "Control de roedores y plagas generales",
    specialtyCategory: "roedores",
    shortBio: "Técnico certificado con 8 años de experiencia en control de roedores y fumigación residencial.",
    focusAreas: ["Roedores", "Cucarachas", "Hormigas", "Inspección preventiva"],
    active: true,
    order: 1,
    useWhatsAppButton: true,
    whatsAppNumber: "17045550001",
  },
  {
    _id: "sp-fumi-maria-torres",
    slug: "maria-torres",
    name: "María Torres",
    specialty: "Tratamiento de termitas y chinches",
    specialtyCategory: "termitas",
    shortBio: "Especialista en termitas y chinches de cama con más de 6 años en el campo.",
    focusAreas: ["Termitas", "Chinches", "Avispas", "Tratamiento preventivo"],
    active: true,
    order: 2,
    useWhatsAppButton: true,
    whatsAppNumber: "17045550002",
  },
];
