import { isUniqueSlugWithinType, toSlug } from "../utils/slug";

export default {
  name: "service",
  title: "Servicios",
  type: "document",
  description: "Catalogo de servicios que se muestra en home, listado y detalle. Recomendado: desactiva en vez de eliminar.",
  fieldsets: [
    { name: "basic", title: "Basico", options: { collapsible: true, collapsed: false } },
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
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Selecciona una categoria."),
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
