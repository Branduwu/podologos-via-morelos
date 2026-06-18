export type SpecialistCategory = "roedores" | "cucarachas" | "termitas" | "chinches" | "hormigas" | "avispas" | "inspeccion" | "general";

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
