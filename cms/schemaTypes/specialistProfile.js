import { isUniqueSlugWithinType, toSlug } from "../utils/slug";

const CATEGORIES = [
  { title: "Roedores / Rodents",             value: "roedores"   },
  { title: "Cucarachas / Cockroaches",        value: "cucarachas" },
  { title: "Termitas / Termites",             value: "termitas"   },
  { title: "Chinches de cama / Bed Bugs",     value: "chinches"   },
  { title: "Hormigas / Ants",                 value: "hormigas"   },
  { title: "Avispas y abejas / Wasps & Bees", value: "avispas"    },
  { title: "Inspeccion / Inspection",         value: "inspeccion" },
  { title: "Fumigacion general / General",    value: "general"    },
];

const categoryMap = Object.fromEntries(CATEGORIES.map(({ title, value }) => [value, title]));

export default {
  name: "specialistProfile",
  title: "Tecnicos / Technicians",
  type: "document",
  description: "Perfiles de tecnicos de fumigacion que se muestran en la pagina Nosotros.",
  fieldsets: [
    { name: "perfil",      title: "Datos del tecnico",           options: { collapsible: true, collapsed: false } },
    { name: "perfilEn",    title: "Technician data (English)",    options: { collapsible: true, collapsed: false } },
    { name: "boton",       title: "Boton y contacto (WhatsApp)", options: { collapsible: true, collapsed: false } },
    { name: "publicacion", title: "Publicacion y orden",         options: { collapsible: true, collapsed: true  } },
  ],
  fields: [
    {
      name: "name",
      title: "Nombre del tecnico",
      type: "string",
      description: "Nombre completo del tecnico.",
      fieldset: "perfil",
      validation: (R) => R.required().error("El nombre es obligatorio."),
    },
    {
      name: "specialty",
      title: "Especialidad (ES)",
      type: "string",
      description: "Especialidad principal. Ejemplo: Control de termitas y roedores.",
      fieldset: "perfil",
      validation: (R) => R.required().error("La especialidad es obligatoria."),
    },
    {
      name: "specialtyEn",
      title: "Specialty (EN)",
      type: "string",
      description: "Main specialty in English. Example: Termite and rodent control.",
      fieldset: "perfilEn",
    },
    {
      name: "specialtyCategory",
      title: "Categoria principal",
      type: "string",
      description: "Tipo de plaga/servicio principal del tecnico.",
      fieldset: "perfil",
      options: {
        list: CATEGORIES,
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Selecciona una categoria."),
    },
    {
      name: "photo",
      title: "Foto del tecnico",
      type: "image",
      options: { hotspot: true },
      description: "Foto principal del tecnico.",
      fieldset: "perfil",
      validation: (R) => R.required().error("La foto es obligatoria."),
    },
    {
      name: "shortBio",
      title: "Descripcion breve (ES)",
      type: "text",
      rows: 4,
      description: "Resumen de experiencia y enfoque en espanol.",
      fieldset: "perfil",
      validation: (R) => R.required().error("La descripcion breve es obligatoria."),
    },
    {
      name: "shortBioEn",
      title: "Short bio (EN)",
      type: "text",
      rows: 4,
      description: "Experience summary in English.",
      fieldset: "perfilEn",
    },
    {
      name: "focusAreas",
      title: "Areas de atencion (ES)",
      type: "array",
      of: [{ type: "string" }],
      description: "Tipos de plaga o servicios que atiende este tecnico (espanol).",
      fieldset: "perfil",
      validation: (R) => R.max(6).warning("Recomendado: maximo 6 areas."),
    },
    {
      name: "focusAreasEn",
      title: "Focus areas (EN)",
      type: "array",
      of: [{ type: "string" }],
      description: "Pest types or services this technician handles (English).",
      fieldset: "perfilEn",
      validation: (R) => R.max(6).warning("Recommended: max 6 areas."),
    },
    {
      name: "useWhatsAppButton",
      title: "Usar WhatsApp en el boton",
      type: "boolean",
      initialValue: true,
      description: "Si esta activo, el boton abre WhatsApp con mensaje precargado.",
      fieldset: "boton",
    },
    {
      name: "ctaText",
      title: "Texto del boton (ES)",
      type: "string",
      description: "Texto del boton en espanol.",
      initialValue: "Solicitar con este tecnico",
      fieldset: "boton",
    },
    {
      name: "ctaTextEn",
      title: "Button text (EN)",
      type: "string",
      description: "Button text in English.",
      initialValue: "Request this technician",
      fieldset: "boton",
    },
    {
      name: "ctaUrl",
      title: "Enlace del boton (si no usas WhatsApp)",
      type: "string",
      description: "URL cuando WhatsApp esta apagado.",
      initialValue: "/agendar",
      fieldset: "boton",
    },
    {
      name: "whatsAppNumber",
      title: "WhatsApp del tecnico (opcional)",
      type: "string",
      description:
        "Si lo llenas, los botones de este tecnico enviaran a este numero. Formato: 17041234567.",
      fieldset: "boton",
      validation: (R) =>
        R.custom((value) => {
          if (!value) return true;
          const digits = String(value).replace(/\D/g, "");
          if (digits.length < 10 || digits.length > 15) {
            return "Ingresa un numero valido de 10 a 15 digitos.";
          }
          return true;
        }),
    },
    {
      name: "whatsAppMessage",
      title: "Mensaje de WhatsApp (opcional)",
      type: "string",
      description:
        "Si lo dejas vacio, se usa el mensaje base. Usa {tecnico}, {servicio}, {negocio}, {problema}.",
      fieldset: "boton",
      validation: (R) => R.max(180).warning("Recomendado: maximo 180 caracteres."),
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagado, este perfil no se muestra en la web.",
      fieldset: "publicacion",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero.",
      fieldset: "publicacion",
    },
    {
      name: "slug",
      title: "Slug (URL del perfil)",
      type: "slug",
      description: "Se genera automaticamente desde el nombre.",
      fieldset: "publicacion",
      options: {
        source: "name",
        maxLength: 96,
        slugify: toSlug,
        isUnique: isUniqueSlugWithinType,
      },
      validation: (R) =>
        R.required().custom((value) => {
          const current = value?.current || "";
          const ok = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current);
          return ok || "Usa solo minusculas, numeros y guiones.";
        }),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "specialty",
      category: "specialtyCategory",
      media: "photo",
      active: "active",
    },
    prepare({ title, subtitle, category, media, active }) {
      const cat = categoryMap[category] || "General";
      return {
        title: title || "Tecnico",
        subtitle: `${cat} | ${active ? "Activo" : "Inactivo"}${subtitle ? ` | ${subtitle}` : ""}`,
        media,
      };
    },
  },
};
