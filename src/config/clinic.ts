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
  labelEn: string;
};

export type BusinessConfig = {
  name: string;
  tagline: string;
  taglineEn: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  schedule: Record<DayKey, DaySchedule>;
  serviceCategories: Array<{ key: string; label: string; labelEn: string }>;
  quoteSelectionLimit: number;
  currency: string;
  locale: string;
};

/** @deprecated Use `business` instead */
export type ClinicConfig = BusinessConfig;

export const business: BusinessConfig = {
  name: "FumiPro NC",
  tagline: "Control de plagas profesional en Charlotte, NC",
  taglineEn: "Professional pest control in Charlotte, NC",
  address: "Charlotte, NC 28201",
  city: "Charlotte",
  state: "NC",
  zip: "28201",
  country: "US",
  phoneDisplay: "(704) 000-0000",
  phoneTel: "17040000000",
  whatsappNumber: "17040000000",
  googleMapsUrl: "https://maps.google.com/?q=Charlotte,NC",
  currency: "USD",
  locale: "en-US",
  schedule: {
    monday:    { closed: false, open: "08:00", close: "17:00", label: "Lunes",     labelEn: "Monday"    },
    tuesday:   { closed: false, open: "08:00", close: "17:00", label: "Martes",    labelEn: "Tuesday"   },
    wednesday: { closed: false, open: "08:00", close: "17:00", label: "Miércoles", labelEn: "Wednesday" },
    thursday:  { closed: false, open: "08:00", close: "17:00", label: "Jueves",    labelEn: "Thursday"  },
    friday:    { closed: false, open: "08:00", close: "17:00", label: "Viernes",   labelEn: "Friday"    },
    saturday:  { closed: false, open: "08:00", close: "12:00", label: "Sábado",    labelEn: "Saturday"  },
    sunday:    { closed: true,                                  label: "Domingo",   labelEn: "Sunday"    },
  },
  serviceCategories: [
    { key: "roedores",          label: "Roedores",             labelEn: "Rodents"           },
    { key: "cucarachas",        label: "Cucarachas",           labelEn: "Cockroaches"       },
    { key: "termitas",          label: "Termitas",             labelEn: "Termites"          },
    { key: "chinches",          label: "Chinches de cama",     labelEn: "Bed Bugs"          },
    { key: "hormigas",          label: "Hormigas",             labelEn: "Ants"              },
    { key: "avispas",           label: "Avispas y abejas",     labelEn: "Wasps & Bees"      },
    { key: "inspeccion",        label: "Inspección",           labelEn: "Inspection"        },
    { key: "general",           label: "Fumigacion general",   labelEn: "General Fumigation"},
  ],
  quoteSelectionLimit: 4,
};

/** @deprecated Use `business` instead */
export const clinic: BusinessConfig = business;
