import { isUniqueSlugWithinType, toSlug } from "../utils/slug";
import RoutingPriorityNoteInput from "../components/RoutingPriorityNoteInput.jsx";

export default {
  name: "service",
  title: "Servicios",
  type: "document",
  description: "Catalogo de servicios que se muestra en home, listado y detalle. Recomendado: desactiva en vez de eliminar.",
  fieldsets: [
    { name: "basic", title: "Basico", options: { collapsible: true, collapsed: false } },
    { name: "routing", title: "Destino de agenda/whatsapp", options: { collapsible: true, collapsed: false } },
    { name: "content", title: "Contenido", options: { collapsible: true, collapsed: false } },
    { name: "publish", title: "Publicacion", options: { collapsible: true, collapsed: true } },
    { name: "meta", title: "Meta", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: "title",
      title: "Nombre del servicio",
      type: "string",
      description: "Aqui editas el nombre del servicio.",
      fieldset: "basic",
      validation: (R) => R.required().error("El nombre del servicio es obligatorio."),
    },
    {
      name: "category",
      title: "Categoria del servicio",
      type: "string",
      description: "Selecciona el area para filtros de precios y servicios.",
      fieldset: "basic",
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
      title: "Especialista destino (manual)",
      type: "reference",
      to: [{ type: "specialistProfile" }],
      description:
        "Opcional. Si lo eliges, al dar clic en 'Agendar este servicio' se precarga ese especialista y el mensaje se dirige a su WhatsApp. Si lo dejas vacio, no se forzara especialista. En cotizacion con destinos distintos, se usa WhatsApp general.",
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
        "Opcional. Si lo llenas, este servicio enviara mensajes a este numero en Agendar/WhatsApp. Formato sugerido: 5215512345678. En cotizacion con destinos distintos, se usa WhatsApp general.",
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
        "Opcional. Mensaje base para este servicio. Puedes usar {servicio}, {especialista}, {negocio} y {problema}.",
      fieldset: "routing",
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Aqui editas la URL del servicio. Si se repite en este mismo tipo, agrega una variacion corta.",
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
          return isValid || "Usa solo minusculas, numeros y guiones (sin espacios ni simbolos).";
        }),
    },
    {
      name: "short",
      title: "Descripcion corta",
      type: "string",
      description: "Aqui editas un resumen en una linea.",
      fieldset: "content",
      validation: (R) => R.max(140).warning("Recomendado: maximo 140 caracteres."),
    },
    {
      name: "long",
      title: "Descripcion larga",
      type: "text",
      rows: 5,
      description: "Aqui explicas que incluye el servicio.",
      fieldset: "content",
    },
    {
      name: "includes",
      title: "Incluye",
      type: "array",
      description: "Aqui agregas puntos clave de la atencion.",
      fieldset: "content",
      of: [{ type: "string" }],
    },
    {
      name: "duration",
      title: "Duracion",
      type: "string",
      description: "Aqui editas la duracion aproximada.",
      fieldset: "basic",
    },
    {
      name: "priceFrom",
      title: "Precio desde",
      type: "number",
      description: "Aqui editas el precio base en MXN (sin simbolo $).",
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
      const categoryMap = {
        podologia: "Podologia",
        psicologia: "Psicologia",
        optica: "Optica/Optometria",
        quiropractica: "Quiropractica",
        dentista: "Dentista",
      };
      const cat = categoryMap[category] || "Sin categoria";
      const short = (subtitle || "").slice(0, 44);
      return {
        title: title || "Servicio",
        subtitle: `${cat} | ${active === false ? "Inactivo" : "Activo"}${short ? ` | ${short}` : ""}`,
      };
    },
  },
};
