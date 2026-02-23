export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DaySchedule = {
  closed: boolean;
  open?: string;
  close?: string;
  label: string;
};

export type ClinicConfig = {
  name: string;
  address: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  schedule: Record<DayKey, DaySchedule>;
  serviceCategories: Array<{ key: string; label: string }>;
  quoteSelectionLimit: number;
};

export const clinic: ClinicConfig = {
  name: "Podologo Plus Care",
  address:
    "Via Morelos 232, Sta. Maria Tulpetlac, 55400 Ecatepec de Morelos, Edo. Mex., Mexico",
  phoneDisplay: "55 2538 8683",
  phoneTel: "525525388683",
  whatsappNumber: "5215525388683",
  googleMapsUrl:
    "https://maps.google.com/?q=Via+Morelos+232,+Sta.+Maria+Tulpetlac,+Ecatepec",
  schedule: {
    monday: { closed: false, open: "10:00", close: "18:00", label: "Lunes" },
    tuesday: { closed: false, open: "10:00", close: "18:00", label: "Martes" },
    wednesday: { closed: false, open: "10:00", close: "18:00", label: "Miercoles" },
    thursday: { closed: false, open: "10:00", close: "18:00", label: "Jueves" },
    friday: { closed: false, open: "10:00", close: "18:00", label: "Viernes" },
    saturday: { closed: false, open: "10:00", close: "16:00", label: "Sabado" },
    sunday: { closed: true, label: "Domingo" },
  },
  serviceCategories: [
    { key: "podologia", label: "Podologia" },
    { key: "psicologia", label: "Psicologia" },
    { key: "optica", label: "Optica / Optometria" },
    { key: "quiropractica", label: "Quiropractica" },
  ],
  quoteSelectionLimit: 6,
};
