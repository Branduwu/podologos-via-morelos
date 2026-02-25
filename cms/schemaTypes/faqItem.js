export default {
  name: "faqItem",
  title: "Preguntas frecuentes",
  type: "document",
  description: "Preguntas frecuentes visibles en la pagina de FAQ.",
  fieldsets: [
    { name: "content", title: "Contenido", options: { collapsible: true, collapsed: false } },
    { name: "classification", title: "Clasificacion", options: { collapsible: true, collapsed: false } },
    { name: "publish", title: "Publicacion", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: "question",
      title: "Pregunta",
      type: "string",
      description: "Aqui editas la pregunta que vera el usuario.",
      fieldset: "content",
      validation: (R) => R.required().error("La pregunta es obligatoria."),
    },
    {
      name: "answer",
      title: "Respuesta",
      type: "text",
      rows: 5,
      description: "Aqui editas la respuesta clara y breve para el paciente.",
      fieldset: "content",
      validation: (R) => R.required().error("La respuesta es obligatoria."),
    },
    {
      name: "category",
      title: "Categoria",
      type: "string",
      description: "Aqui eliges a que area pertenece la pregunta.",
      initialValue: "podologia",
      fieldset: "classification",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Podologia", value: "podologia" },
          { title: "Psicologia", value: "psicologia" },
          { title: "Optica / Optometria", value: "optica" },
          { title: "Quiropractica", value: "quiropractica" },
          { title: "Dentista", value: "dentista" },
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required().error("La categoria es obligatoria."),
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagado, esta pregunta no se muestra en la web.",
      fieldset: "publish",
    },
    {
      name: "featured",
      title: "Destacar pregunta",
      type: "boolean",
      initialValue: false,
      description: "Si esta activa, la pregunta aparece primero en su categoria.",
      fieldset: "publish",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero.",
      fieldset: "publish",
    },
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
      category: "category",
      active: "active",
      featured: "featured",
    },
    prepare({ title, subtitle, category, active, featured }) {
      const categoryMap = {
        general: "General",
        podologia: "Podologia",
        psicologia: "Psicologia",
        optica: "Optica/Optometria",
        quiropractica: "Quiropractica",
        dentista: "Dentista",
      };
      const cut = (subtitle || "").slice(0, 42);
      const cat = categoryMap[category] || "General";
      const flags = [featured ? "Destacada" : "Normal", active ? "Activa" : "Inactiva"].join(" | ");
      return {
        title: title || "Pregunta frecuente",
        subtitle: `${cat} | ${flags}${cut ? ` | ${cut}` : ""}`,
      };
    },
  },
};
