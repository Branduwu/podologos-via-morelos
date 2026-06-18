import { isUniqueSlugWithinType, toSlug } from "../utils/slug";
import RoutingPriorityNoteInput from "../components/RoutingPriorityNoteInput.jsx";

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
  name: "service",
  title: "Servicios",
  type: "document",
  description: "Catalogo de servicios de fumigacion. Recomendado: desactiva en vez de eliminar.",
  fieldsets: [
    { name: "basic",   title: "Basico",                         options: { collapsible: true, collapsed: false } },
    { name: "content", title: "Contenido (Espanol)",            options: { collapsible: true, collapsed: false } },
    { name: "contentEn", title: "Content (English)",            options: { collapsible: true, collapsed: false } },
    { name: "routing", title: "Destino de contacto/whatsapp",   options: { collapsible: true, collapsed: false } },
    { name: "publish", title: "Publicacion",                    options: { collapsible: true, collapsed: true  } },
    { name: "meta",    title: "Meta",                           options: { collapsible: true, collapsed: true  } },
  ],
  fields: [
    {
      name: "title",
      title: "Nombre del servicio (ES)",
      type: "string",
      description: "Nombre del servicio en espanol.",
      fieldset: "basic",
      validation: (R) => R.required().error("El nombre del servicio es obligatorio."),
    },
    {
      name: "titleEn",
      title: "Service name (EN)",
      type: "string",
      description: "Service name in English.",
      fieldset: "basic",
    },
    {
      name: "category",
      title: "Categoria del servicio",
      type: "string",
      description: "Selecciona el tipo de plaga o servicio.",
      fieldset: "basic",
      options: {
        list: CATEGORIES,
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Selecciona una categoria."),
    },
    {
      name: "routingPriorityInfo",
      title: "Prioridad de enrutamiento",
      type: "string",
      fieldset: "routing",
      readOnly: true,
      options: { source: "service" },
      components: {
        input: RoutingPriorityNoteInput,
      },
    },
    {
      name: "leadSpecialist",
      title: "Tecnico destino (manual)",
      type: "reference",
      to: [{ type: "specialistProfile" }],
      description:
        "Opcional. Si lo eliges, al solicitar este servicio se precarga ese tecnico y el mensaje se dirige a su WhatsApp.",
      fieldset: "routing",
      options: {
        disableNew: true,
        filter: ({ document }) => {
          const category = document?.category;
          if (!category) return { filter: "(!defined(active) || active == true)" };
          return {
            filter: "specialtyCategory == $category && (!defined(active) || active == true)",
            params: { category },
          };
        },
      },
    },
    {
      name: "whatsAppNumber",
      title: "WhatsApp destino (manual)",
      type: "string",
      description:
        "Opcional. Formato: 17041234567 (con codigo de pais 1 para USA). Si se deja vacio se usa el WhatsApp general.",
      fieldset: "routing",
      validation: (R) =>
        R.custom((value) => {
          if (!value) return true;
          const digits = String(value).replace(/\D/g, "");
          if (digits.length < 10 || digits.length > 15) {
            return "Ingresa entre 10 y 15 digitos.";
          }
          return true;
        }),
    },
    {
      name: "whatsAppMessage",
      title: "Mensaje WhatsApp (manual)",
      type: "text",
      rows: 3,
      description:
        "Opcional. Puedes usar {servicio}, {tecnico}, {negocio} y {problema}.",
      fieldset: "routing",
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "URL del servicio. Se genera automaticamente desde el nombre.",
      fieldset: "meta",
      options: {
        source: "title",
        maxLength: 96,
        slugify: toSlug,
        isUnique: isUniqueSlugWithinType,
      },
      validation: (R) =>
        R.required().custom((value) => {
          const current = value?.current || "";
          const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current);
          return isValid || "Usa solo minusculas, numeros y guiones.";
        }),
    },
    {
      name: "short",
      title: "Descripcion corta (ES)",
      type: "string",
      description: "Resumen en una linea en espanol.",
      fieldset: "content",
      validation: (R) => R.max(140).warning("Recomendado: maximo 140 caracteres."),
    },
    {
      name: "long",
      title: "Descripcion larga (ES)",
      type: "text",
      rows: 5,
      description: "Explicacion del servicio en espanol.",
      fieldset: "content",
    },
    {
      name: "includes",
      title: "Incluye (ES)",
      type: "array",
      description: "Puntos clave del servicio en espanol.",
      fieldset: "content",
      of: [{ type: "string" }],
    },
    {
      name: "shortEn",
      title: "Short description (EN)",
      type: "string",
      description: "One-line summary in English.",
      fieldset: "contentEn",
      validation: (R) => R.max(140).warning("Recommended: max 140 characters."),
    },
    {
      name: "longEn",
      title: "Long description (EN)",
      type: "text",
      rows: 5,
      description: "Full service description in English.",
      fieldset: "contentEn",
    },
    {
      name: "includesEn",
      title: "Includes (EN)",
      type: "array",
      description: "Key points of the service in English.",
      fieldset: "contentEn",
      of: [{ type: "string" }],
    },
    {
      name: "duration",
      title: "Duracion / Duration",
      type: "string",
      description: "Duracion aproximada del servicio.",
      fieldset: "basic",
    },
    {
      name: "priceFrom",
      title: "Precio desde (USD)",
      type: "number",
      description: "Precio base en dolares (sin simbolo $).",
      fieldset: "basic",
      validation: (R) => R.min(0).warning("El precio no puede ser negativo."),
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero.",
      fieldset: "meta",
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      description: "Si esta apagado, no se muestra en la web. Usa esto en lugar de borrar.",
      initialValue: true,
      fieldset: "publish",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "short",
      category: "category",
      active: "active",
    },
    prepare({ title, subtitle, category, active }) {
      const cat = categoryMap[category] || "Sin categoria";
      const short = (subtitle || "").slice(0, 44);
      return {
        title: title || "Servicio",
        subtitle: `${cat} | ${active === false ? "Inactivo" : "Activo"}${short ? ` | ${short}` : ""}`,
      };
    },
  },
};
