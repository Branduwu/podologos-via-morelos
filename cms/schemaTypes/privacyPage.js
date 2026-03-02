export default {
  name: "privacyPage",
  title: "Aviso de privacidad (pagina)",
  type: "document",
  description: "Contenido editable de la pagina Aviso de privacidad.",
  fields: [
    {
      name: "title",
      title: "Titulo",
      type: "string",
      initialValue: "Aviso de privacidad",
      validation: (R) => R.required().error("El titulo es obligatorio."),
    },
    {
      name: "subtitle",
      title: "Subtitulo",
      type: "string",
      initialValue: "Conoce como usamos y protegemos tu informacion.",
      validation: (R) => R.max(180).warning("Recomendado: maximo 180 caracteres."),
    },
    {
      name: "updatedAt",
      title: "Fecha de actualizacion",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
    },
    {
      name: "body",
      title: "Contenido",
      type: "text",
      rows: 14,
      description:
        "Escribe el contenido del aviso. Usa una linea en blanco para separar parrafos.",
      validation: (R) => R.required().error("El contenido del aviso es obligatorio."),
    },
  ],
  preview: {
    select: { title: "title", updatedAt: "updatedAt" },
    prepare({ title, updatedAt }) {
      return {
        title: title || "Aviso de privacidad",
        subtitle: updatedAt ? `Actualizado: ${updatedAt}` : "Sin fecha de actualizacion",
      };
    },
  },
};
