import { isUniqueSlugWithinType, toSlug } from "../utils/slug";

export default {
  name: "specialistProfile",
  title: "Especialistas",
  type: "document",
  description: "Perfiles de especialistas que se muestran en la pagina Nosotros.",
  fieldsets: [
    { name: "perfil", title: "Datos del especialista", options: { collapsible: true, collapsed: false } },
    { name: "boton", title: "Boton y agenda (WhatsApp)", options: { collapsible: true, collapsed: false } },
    { name: "publicacion", title: "Publicacion y orden", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: "name",
      title: "Nombre del especialista",
      type: "string",
      description: "Aqui editas el nombre completo del especialista.",
      fieldset: "perfil",
      validation: (R) => R.required().error("El nombre es obligatorio."),
    },
    {
      name: "specialty",
      title: "Especialidad",
      type: "string",
      description: "Aqui editas la especialidad principal. Ejemplo: Podologia clinica.",
      fieldset: "perfil",
      validation: (R) => R.required().error("La especialidad es obligatoria."),
    },
    {
      name: "specialtyCategory",
      title: "Categoria de especialidad",
      type: "string",
      description: "Selecciona el area para filtros en web.",
      fieldset: "perfil",
      options: {
        list: [
          { title: "Podologia", value: "podologia" },
          { title: "Psicologia", value: "psicologia" },
          { title: "Optica / Optometria", value: "optica" },
          { title: "Quiropractica", value: "quiropractica" },
          { title: "Dentista", value: "dentista" },
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Selecciona una categoria."),
    },
    {
      name: "photo",
      title: "Foto del especialista",
      type: "image",
      options: { hotspot: true },
      description: "Aqui subes la foto principal del especialista.",
      fieldset: "perfil",
      validation: (R) => R.required().error("La foto del especialista es obligatoria."),
    },
    {
      name: "shortBio",
      title: "Descripcion breve",
      type: "text",
      rows: 4,
      description: "Aqui editas un resumen claro de experiencia y enfoque.",
      fieldset: "perfil",
      validation: (R) => R.required().error("La descripcion breve es obligatoria."),
    },
    {
      name: "focusAreas",
      title: "Areas de atencion",
      type: "array",
      of: [{ type: "string" }],
      description: "Aqui agregas tratamientos o enfoques que atiende este especialista.",
      fieldset: "perfil",
      validation: (R) => R.max(6).warning("Recomendado: maximo 6 areas de atencion."),
    },
    {
      name: "useWhatsAppButton",
      title: "Usar WhatsApp en el boton",
      type: "boolean",
      initialValue: true,
      description: "Si esta activo, el boton abre WhatsApp con mensaje precargado para este especialista.",
      fieldset: "boton",
    },
    {
      name: "ctaText",
      title: "Texto del boton",
      type: "string",
      description: "Texto que ve el paciente en el boton. Ejemplo: Agendar con este especialista.",
      initialValue: "Agendar con este especialista",
      fieldset: "boton",
    },
    {
      name: "ctaUrl",
      title: "Enlace del boton (si no usas WhatsApp)",
      type: "string",
      description: "URL del boton cuando WhatsApp esta apagado. Ejemplo: /agendar",
      initialValue: "/agendar",
      fieldset: "boton",
    },
    {
      name: "whatsAppNumber",
      title: "WhatsApp del especialista (opcional)",
      type: "string",
      description:
        "Si lo llenas, los botones de este especialista enviaran a este numero. Si lo dejas vacio, usa el WhatsApp de especialistas en Informacion del negocio.",
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
        "Si lo dejas vacio, se usa el mensaje base de especialistas en Informacion del negocio. Usa {especialista}, {servicio}, {negocio}, {problema}.",
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
      description: "Menor numero = aparece primero en la lista.",
      fieldset: "publicacion",
    },
    {
      name: "slug",
      title: "Slug (URL del perfil)",
      type: "slug",
      description: "Se genera automaticamente desde el nombre. Solo edita si hay un conflicto de URL.",
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
      const categoryMap = {
        podologia: "Podologia",
        psicologia: "Psicologia",
        optica: "Optica/Optometria",
        quiropractica: "Quiropractica",
        dentista: "Dentista",
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
