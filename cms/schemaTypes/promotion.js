import { isUniqueSlugWithinType, toSlug } from "../utils/slug";

export default {
  name: "promotion",
  title: "Promociones",
  type: "document",
  description: "Promociones activas que se muestran en home y pagina de promociones.",
  fieldsets: [
    { name: "basic", title: "1) Basico", options: { collapsible: true, collapsed: false } },
    { name: "content", title: "2) Contenido", options: { collapsible: true, collapsed: false } },
    { name: "visibility", title: "3) Visibilidad", options: { collapsible: true, collapsed: false } },
    { name: "timing", title: "4) Vigencia", options: { collapsible: true, collapsed: false } },
    { name: "relations", title: "5) Categoria y relacion", options: { collapsible: true, collapsed: false } },
    { name: "meta", title: "6) URL", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: "title",
      title: "Titulo de la promocion",
      type: "string",
      description: "Aqui editas el titulo principal de la promocion.",
      fieldset: "basic",
      validation: (R) => R.required().error("El titulo es obligatorio."),
    },
    {
      name: "label",
      title: "Etiqueta corta",
      type: "string",
      description: "Aqui editas una etiqueta breve, por ejemplo: 2x1.",
      fieldset: "basic",
      validation: (R) => R.max(30).warning("Recomendado: maximo 30 caracteres."),
    },
    {
      name: "shortDescription",
      title: "Descripcion corta",
      type: "string",
      description: "Aqui editas el texto breve de la tarjeta.",
      fieldset: "content",
      validation: (R) => R.max(160).warning("Recomendado: maximo 160 caracteres."),
    },
    {
      name: "description",
      title: "Descripcion completa",
      type: "text",
      rows: 5,
      description: "Aqui editas condiciones y detalle de la promocion.",
      fieldset: "content",
    },
    {
      name: "active",
      title: "Activa",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagada, no se muestra al publico.",
      fieldset: "visibility",
    },
    {
      name: "featured",
      title: "Destacada",
      type: "boolean",
      initialValue: false,
      description: "Activa si quieres darle mas presencia.",
      fieldset: "visibility",
    },
    {
      name: "pinned",
      title: "Fijada",
      type: "boolean",
      initialValue: false,
      description: "Activa para mostrarla primero.",
      fieldset: "visibility",
    },
    {
      name: "startDate",
      title: "Fecha de inicio",
      type: "string",
      description: "Aqui editas cuando inicia la promocion. Formato: AAAA-MM-DD (ejemplo: 2026-03-01).",
      fieldset: "timing",
      validation: (R) =>
        R.regex(/^\d{4}-\d{2}-\d{2}$/)
          .warning("Usa formato AAAA-MM-DD.")
          .custom((value) => {
            if (!value) return true;
            const date = new Date(`${value}T00:00:00Z`);
            return Number.isNaN(date.getTime()) ? "Fecha invalida." : true;
          }),
    },
    {
      name: "endDate",
      title: "Fecha de fin",
      type: "string",
      description: "Aqui editas cuando termina la promocion. Formato: AAAA-MM-DD (ejemplo: 2026-03-31).",
      fieldset: "timing",
      validation: (R) =>
        R.regex(/^\d{4}-\d{2}-\d{2}$/)
          .warning("Usa formato AAAA-MM-DD.")
          .custom((value, context) => {
            if (!value) return true;

            const endDate = new Date(`${value}T00:00:00Z`);
            if (Number.isNaN(endDate.getTime())) {
              return "Fecha invalida.";
            }

            const start = context.document?.startDate;
            if (!start) return true;
            return value >= start || "La fecha de fin debe ser igual o posterior al inicio.";
          }),
    },
    {
      name: "image",
      title: "Imagen",
      type: "image",
      description: "Aqui subes la imagen principal de la promocion.",
      fieldset: "content",
      options: { hotspot: true },
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Aqui editas la URL de detalle. Si se repite en promociones, agrega una variacion corta.",
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
          const ok = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current);
          return ok || "Usa solo minusculas, numeros y guiones.";
        }),
    },
    {
      name: "targetCategories",
      title: "Categorias (filtro web)",
      type: "array",
      description: "Selecciona categorias oficiales para filtros: Podologia, Psicologia, Optica, Quiropractica, Dentista.",
      fieldset: "relations",
      of: [
        {
          type: "string",
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
        },
      ],
      validation: (R) => R.min(1).warning("Recomendado: selecciona al menos 1 categoria para filtros."),
    },
    {
      name: "appliesTo",
      title: "Aplica a (texto)",
      type: "array",
      description: "Etiquetas visibles para la tarjeta (ejemplo: primera vez, prevencion, evaluacion).",
      fieldset: "relations",
      of: [{ type: "string" }],
    },
    {
      name: "services",
      title: "Servicios relacionados",
      type: "array",
      description: "Opcional. Relaciona servicios del catalogo. Si desactivas un servicio, valida estas referencias.",
      fieldset: "relations",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    },
  ],
  preview: {
    select: {
      title: "title",
      active: "active",
      startDate: "startDate",
      targetCategories: "targetCategories",
    },
    prepare({ title, active, startDate, targetCategories }) {
      const status = active ? "Activa" : "Inactiva";
      const firstCategory = Array.isArray(targetCategories) && targetCategories[0] ? ` | ${targetCategories[0]}` : "";
      return {
        title,
        subtitle: `${status}${startDate ? ` - Inicio: ${startDate}` : ""}${firstCategory}`,
      };
    },
  },
};
