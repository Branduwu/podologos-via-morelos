import EditorGuidePane from "./components/EditorGuidePane";

export const structure = (S) =>
  S.list()
    .title("Panel de contenido")
    .items([
      S.listItem()
        .id("editor-guide")
        .title("Guia rapida para editor")
        .child(S.component().id("editor-guide-pane").component(EditorGuidePane).title("Guia para editores (solo lectura)")),
      S.divider(),
      S.listItem()
        .id("site-setup")
        .title("1) Configuracion del sitio")
        .child(
          S.list()
            .title("Configuracion del sitio")
            .items([
              S.documentTypeListItem("businessInfo").title("Informacion del negocio (header, contacto, redes, footer)"),
              S.documentTypeListItem("aboutSection").title("Seccion Nosotros (home y pagina Nosotros)"),
            ])
        ),
      S.listItem()
        .id("commercial-content")
        .title("2) Contenido comercial")
        .child(
          S.list()
            .title("Contenido comercial")
            .items([
              S.documentTypeListItem("service").title("Servicios"),
              S.documentTypeListItem("specialistProfile").title("Especialistas"),
              S.documentTypeListItem("priceItem").title("Precios"),
              S.documentTypeListItem("promotion").title("Promociones"),
            ])
        ),
      S.documentTypeListItem("galleryItem").title("3) Fotos y videos"),
      S.listItem()
        .id("faq-by-category")
        .title("4) Preguntas frecuentes (FAQ)")
        .child(
          S.list()
            .title("FAQ por categoria")
            .items([
              S.listItem()
                .id("faq-featured")
                .title("Destacadas")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ destacadas")
                    .filter('_type == "faqItem" && featured == true')
                    .defaultOrdering([{ field: "category", direction: "asc" }, { field: "order", direction: "asc" }])
                ),
              S.divider(),
              S.listItem()
                .id("faq-general")
                .title("General")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ General")
                    .filter('_type == "faqItem" && category == "general"')
                    .defaultOrdering([{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }])
                ),
              S.listItem()
                .id("faq-podologia")
                .title("Podologia")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ Podologia")
                    .filter('_type == "faqItem" && category == "podologia"')
                    .defaultOrdering([{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }])
                ),
              S.listItem()
                .id("faq-psicologia")
                .title("Psicologia")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ Psicologia")
                    .filter('_type == "faqItem" && category == "psicologia"')
                    .defaultOrdering([{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }])
                ),
              S.listItem()
                .id("faq-optica")
                .title("Optica")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ Optica")
                    .filter('_type == "faqItem" && category == "optica"')
                    .defaultOrdering([{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }])
                ),
              S.listItem()
                .id("faq-quiropractica")
                .title("Quiropractica")
                .child(
                  S.documentTypeList("faqItem")
                    .title("FAQ Quiropractica")
                    .filter('_type == "faqItem" && category == "quiropractica"')
                    .defaultOrdering([{ field: "featured", direction: "desc" }, { field: "order", direction: "asc" }])
                ),
              S.divider(),
              S.documentTypeListItem("faqItem").title("Todas las FAQ"),
            ])
        ),
    ]);
