import { isUniqueSlugWithinType, toSlug } from "../utils/slug";

export default {
  name: "specialistProfile",
  title: "Especialistas",
  type: "document",
  description: "Perfiles de especialistas que se muestran en la pagina Nosotros.",
  fields: [
    {
      name: "name",
      title: "Nombre del especialista",
      type: "string",
      description: "Aqui editas el nombre completo del especialista.",
      validation: (R) => R.required().error("El nombre es obligatorio."),
    },
    {
      name: "specialty",
      title: "Especialidad",
      type: "string",
      description: "Aqui editas la especialidad principal. Ejemplo: Podologia clinica.",
      validation: (R) => R.required().error("La especialidad es obligatoria."),
    },
    {
      name: "specialtyCategory",
      title: "Categoria de especialidad",
      type: "string",
      description: "Selecciona el area para filtros en web.",
      options: {
        list: [
          { title: "Podologia", value: "podologia" },
          { title: "Psicologia", value: "psicologia" },
          { title: "Optica / Optometria", value: "optica" },
          { title: "Quiropractica", value: "quiropractica" },
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Selecciona una categoria."),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Aqui editas la URL del perfil. Si se repite en especialistas, agrega una variacion corta.",
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
    {
      name: "shortBio",
      title: "Descripcion breve",
      type: "text",
      rows: 4,
      description: "Aqui editas un resumen claro de experiencia y enfoque.",
      validation: (R) => R.required().error("La descripcion breve es obligatoria."),
    },
    {
      name: "focusAreas",
      title: "Areas de atencion",
      type: "array",
      of: [{ type: "string" }],
      description: "Aqui agregas tratamientos o enfoques que atiende este especialista.",
      validation: (R) => R.max(6).warning("Recomendado: maximo 6 areas de atencion."),
    },
    {
      name: "photo",
      title: "Foto del especialista",
      type: "image",
      options: { hotspot: true },
      description: "Aqui subes la foto principal del especialista.",
      validation: (R) => R.required().error("La foto del especialista es obligatoria."),
    },
    {
      name: "useWhatsAppButton",
      title: "Usar WhatsApp en el boton",
      type: "boolean",
      initialValue: true,
      description: "Si esta activo, el boton abre WhatsApp con mensaje precargado para este especialista.",
    },
    {
      name: "whatsAppMessage",
      title: "Mensaje de WhatsApp (opcional)",
      type: "string",
      description: "Si lo dejas vacio, se genera uno automatico con el nombre del especialista.",
      validation: (R) => R.max(180).warning("Recomendado: maximo 180 caracteres."),
    },
    {
      name: "ctaText",
      title: "Texto boton",
      type: "string",
      description: "Aqui editas el texto del boton de esta tarjeta. Ejemplo: Agendar con este especialista.",
      initialValue: "Agendar con este especialista",
    },
    {
      name: "ctaUrl",
      title: "Enlace boton (si no usas WhatsApp)",
      type: "string",
      description: "Aqui editas el enlace del boton cuando WhatsApp esta apagado. Ejemplo: /agendar",
      initialValue: "/agendar",
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagado, este perfil no se muestra en la web.",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero en la lista.",
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
      const categoryMap = {
        podologia: "Podologia",
        psicologia: "Psicologia",
        optica: "Optica/Optometria",
        quiropractica: "Quiropractica",
      };
      const cat = categoryMap[category] || "General";
      return {
        title: title || "Especialista",
        subtitle: `${cat} | ${active ? "Activo" : "Inactivo"}${subtitle ? ` | ${subtitle}` : ""}`,
        media,
      };
    },
  },
};
