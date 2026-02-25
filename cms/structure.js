import EditorGuidePane from './components/EditorGuidePane'

const faqCategories = [
  {title: 'General', value: 'general'},
  {title: 'Podologia', value: 'podologia'},
  {title: 'Psicologia', value: 'psicologia'},
  {title: 'Optica', value: 'optica'},
  {title: 'Quiropractica', value: 'quiropractica'},
  {title: 'Dentista', value: 'dentista'},
]

export const structure = (S) =>
  S.list()
    .title('Panel de contenido')
    .items([
      S.listItem()
        .title('Guia rapida para editor')
        .child(
          S.component()
            .title('Guia rapida para editor')
            .component(EditorGuidePane)
        ),
      S.divider(),
      S.listItem()
        .title('1) Configuracion del sitio')
        .child(
          S.list()
            .title('1) Configuracion del sitio')
            .items([
              S.listItem()
                .title(
                  'Informacion del negocio (header, inicio, ubicacion, contacto, redes, footer)'
                )
                .child(
                  S.documentTypeList('businessInfo').title('Informacion del negocio')
                ),
              S.listItem()
                .title('Seccion Nosotros (home y pagina Nosotros)')
                .child(
                  S.documentTypeList('aboutSection').title('Seccion Nosotros')
                ),
            ])
        ),
      S.listItem()
        .title('2) Contenido comercial')
        .child(
          S.list()
            .title('2) Contenido comercial')
            .items([
              S.listItem()
                .title('Servicios')
                .child(S.documentTypeList('service').title('Servicios')),
              S.listItem()
                .title('Especialistas')
                .child(
                  S.documentTypeList('specialistProfile').title('Especialistas')
                ),
              S.listItem()
                .title('Precios')
                .child(S.documentTypeList('priceItem').title('Precios')),
              S.listItem()
                .title('Promociones')
                .child(S.documentTypeList('promotion').title('Promociones')),
            ])
        ),
      S.listItem()
        .title('3) Fotos y videos')
        .child(S.documentTypeList('galleryItem').title('Fotos y videos')),
      S.listItem()
        .title('4) Preguntas frecuentes (FAQ)')
        .child(
          S.list()
            .title('4) Preguntas frecuentes (FAQ)')
            .items([
              S.listItem()
                .title('Todas')
                .child(
                  S.documentTypeList('faqItem').title('Preguntas frecuentes')
                ),
              ...faqCategories.map((category) =>
                S.listItem()
                  .title(category.title)
                  .child(
                    S.documentList()
                      .title(`FAQ: ${category.title}`)
                      .filter('_type == "faqItem" && category == $category')
                      .params({category: category.value})
                  )
              ),
            ])
        ),
    ])
