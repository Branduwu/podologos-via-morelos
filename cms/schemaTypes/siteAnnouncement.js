export default {
  name: "siteAnnouncement",
  title: "Comunicados",
  type: "document",
  description: "Avisos y noticias que se muestran en la pagina Comunicados.",
  fields: [
    {
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (R) => R.required().error("El titulo es obligatorio."),
    },
    {
      name: "publishDate",
      title: "Fecha del comunicado",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (R) => R.required().error("La fecha del comunicado es obligatoria."),
    },
    {
      name: "body",
      title: "Contenido",
      type: "text",
      rows: 8,
      description: "Texto principal del comunicado.",
      validation: (R) => R.required().error("El contenido es obligatorio."),
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagado, no se muestra en la web.",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero.",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishDate",
      active: "active",
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || "Comunicado",
        subtitle: `${active === false ? "Inactivo" : "Activo"}${subtitle ? ` | ${subtitle}` : ""}`,
      };
    },
  },
};
