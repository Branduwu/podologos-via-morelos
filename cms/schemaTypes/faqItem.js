export default {
  name: "faqItem",
  title: "Preguntas frecuentes / FAQ",
  type: "document",
  description: "Preguntas frecuentes visibles en la pagina de FAQ. Agrega la pregunta en ambos idiomas.",
  fieldsets: [
    { name: "contentEs",      title: "Contenido en Espanol",  options: { collapsible: true, collapsed: false } },
    { name: "contentEn",      title: "Content in English",    options: { collapsible: true, collapsed: false } },
    { name: "classification", title: "Clasificacion",         options: { collapsible: true, collapsed: false } },
    { name: "publish",        title: "Publicacion",           options: { collapsible: true, collapsed: true  } },
  ],
  fields: [
    {
      name: "question",
      title: "Pregunta (ES)",
      type: "string",
      description: "Pregunta en espanol.",
      fieldset: "contentEs",
      validation: (R) => R.required().error("La pregunta en espanol es obligatoria."),
    },
    {
      name: "answer",
      title: "Respuesta (ES)",
      type: "text",
      rows: 5,
      description: "Respuesta en espanol.",
      fieldset: "contentEs",
      validation: (R) => R.required().error("La respuesta en espanol es obligatoria."),
    },
    {
      name: "questionEn",
      title: "Question (EN)",
      type: "string",
      description: "Question in English.",
      fieldset: "contentEn",
    },
    {
      name: "answerEn",
      title: "Answer (EN)",
      type: "text",
      rows: 5,
      description: "Answer in English.",
      fieldset: "contentEn",
    },
    {
      name: "category",
      title: "Categoria",
      type: "string",
      description: "Tipo de plaga o servicio al que pertenece esta pregunta.",
      initialValue: "general",
      fieldset: "classification",
      options: {
        list: [
          { title: "General",                             value: "general"    },
          { title: "Roedores / Rodents",                  value: "roedores"   },
          { title: "Cucarachas / Cockroaches",            value: "cucarachas" },
          { title: "Termitas / Termites",                 value: "termitas"   },
          { title: "Chinches de cama / Bed Bugs",         value: "chinches"   },
          { title: "Hormigas / Ants",                     value: "hormigas"   },
          { title: "Avispas y abejas / Wasps & Bees",     value: "avispas"    },
          { title: "Inspeccion / Inspection",             value: "inspeccion" },
          { title: "Fumigacion general / General Fumig.", value: "fumigacion" },
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
        general:    "General",
        roedores:   "Roedores",
        cucarachas: "Cucarachas",
        termitas:   "Termitas",
        chinches:   "Chinches",
        hormigas:   "Hormigas",
        avispas:    "Avispas",
        inspeccion: "Inspeccion",
        fumigacion: "Fumigacion general",
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
