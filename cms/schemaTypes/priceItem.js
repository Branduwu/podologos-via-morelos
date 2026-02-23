export default {
  name: "priceItem",
  title: "Precios",
  type: "document",
  description: "Lista de precios visibles en la pagina de precios.",
  fieldsets: [
    { name: "basic", title: "Basico", options: { collapsible: true, collapsed: false } },
    { name: "detail", title: "Detalle", options: { collapsible: true, collapsed: true } },
    { name: "publish", title: "Publicacion", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    {
      name: "service",
      title: "Servicio",
      type: "reference",
      to: [{ type: "service" }],
      description: "Relaciona este precio con un servicio existente. Si desactivas un servicio, revisa este campo.",
      fieldset: "basic",
      validation: (R) => R.required().error("Debes seleccionar un servicio."),
    },
    {
      name: "title",
      title: "Nombre del precio",
      type: "string",
      description: "Ejemplo: Consulta inicial.",
      fieldset: "basic",
      validation: (R) => R.required().error("El nombre del precio es obligatorio."),
    },
    {
      name: "priceFrom",
      title: "Precio desde",
      type: "number",
      description: "Monto en MXN, sin simbolo $.",
      fieldset: "basic",
      validation: (R) =>
        R.required().min(0).error("El precio es obligatorio y no puede ser negativo."),
    },
    {
      name: "duration",
      title: "Duracion",
      type: "string",
      description: "Ejemplo: 45 min aprox.",
      fieldset: "detail",
    },
    {
      name: "note",
      title: "Nota",
      type: "string",
      description: "Aclaracion breve. Ejemplo: Sujeto a valoracion.",
      fieldset: "detail",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero.",
      fieldset: "publish",
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagado, no se muestra en la web.",
      fieldset: "publish",
    },
  ],
  preview: {
    select: {
      title: "title",
      price: "priceFrom",
      serviceTitle: "service.title",
    },
    prepare(selection) {
      const priceText =
        typeof selection.price === "number" ? `$${selection.price}` : "Sin precio";
      const serviceTextRaw = selection.serviceTitle || "Sin servicio";
      const serviceText = serviceTextRaw.length > 40 ? `${serviceTextRaw.slice(0, 40)}...` : serviceTextRaw;
      return {
        title: selection.title || "Precio sin titulo",
        subtitle: `${priceText} | ${serviceText}`,
      };
    },
  },
};
