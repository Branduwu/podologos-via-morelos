export type SpecialistCategory = "podologia" | "psicologia" | "optica" | "quiropractica" | "dentista";

export type Specialist = {
  _id: string;
  slug: string;
  name: string;
  specialty: string;
  specialtyCategory: SpecialistCategory;
  shortBio?: string;
  focusAreas?: string[];
  photoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  useWhatsAppButton?: boolean;
  whatsAppNumber?: string;
  whatsAppMessage?: string;
  active: boolean;
  order: number;
};
