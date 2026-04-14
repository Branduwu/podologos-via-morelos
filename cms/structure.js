import React from 'react'
import EditorGuidePane from './components/EditorGuidePane'

const makeIcon = (elements) =>
  function CmsStructureIcon(props) {
    return React.createElement(
      'svg',
      {
        viewBox: '0 0 24 24',
        width: '1em',
        height: '1em',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        ...props,
      },
      elements.map(({tag, attrs}, index) =>
        React.createElement(tag, {key: index, ...attrs})
      )
    )
  }

const path = (d) => ({tag: 'path', attrs: {d}})
const circle = (cx, cy, r) => ({tag: 'circle', attrs: {cx, cy, r}})
const rect = (x, y, width, height, rx = 2) => ({
  tag: 'rect',
  attrs: {x, y, width, height, rx},
})

const GuideIcon = makeIcon([
  rect(5, 3, 14, 18, 2),
  path('M9 7h6'),
  path('M9 11h6'),
  path('M9 15h4'),
])

const SiteConfigIcon = makeIcon([
  path('M4 7h16'),
  circle(9, 7, 2),
  path('M4 12h16'),
  circle(15, 12, 2),
  path('M4 17h16'),
  circle(11, 17, 2),
])

const BusinessIcon = makeIcon([
  path('M4 21V8l8-5 8 5v13'),
  path('M9 21v-6h6v6'),
  path('M8 10h.01'),
  path('M12 10h.01'),
  path('M16 10h.01'),
])

const AboutIcon = makeIcon([
  circle(9, 8, 3),
  path('M3.5 20a5.5 5.5 0 0 1 11 0'),
  circle(17, 9, 2),
  path('M15.5 20c.2-2.3 1.7-4 3.5-4'),
])

const CommercialIcon = makeIcon([
  rect(4, 7, 16, 12, 2),
  path('M9 7V5h6v2'),
  path('M4 12h16'),
])

const ServiceIcon = makeIcon([
  path('M12 5v14'),
  path('M5 12h14'),
  circle(12, 12, 8),
])

const SpecialistIcon = makeIcon([
  circle(12, 8, 3),
  path('M5 21a7 7 0 0 1 14 0'),
  path('M17 4l2 2 3-3'),
])

const PriceIcon = makeIcon([
  path('M20 13l-7 7-9-9V4h7l9 9Z'),
  circle(8, 8, 1),
])

const PromotionIcon = makeIcon([
  path('M4 13h3l9 4V7l-9 4H4v2Z'),
  path('M7 13l1 6h2'),
  path('M18 9l2-2'),
  path('M18 15l2 2'),
])

const GalleryIcon = makeIcon([
  rect(3, 5, 18, 14, 2),
  circle(8, 10, 1.5),
  path('M21 16l-5-5-4 4-2-2-5 5'),
])

const FaqIcon = makeIcon([
  path('M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z'),
  path('M10 9a2.5 2.5 0 0 1 4 2c-.7.8-2 1-2 2.5'),
  circle(12, 17, 0.6),
])

const LegalIcon = makeIcon([
  path('M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z'),
  path('M9 12l2 2 4-5'),
])

const PrivacyIcon = makeIcon([
  rect(5, 10, 14, 10, 2),
  path('M8 10V7a4 4 0 0 1 8 0v3'),
  path('M12 14v2'),
])

const AnnouncementIcon = makeIcon([
  path('M4 13h3l9 4V7l-9 4H4v2Z'),
  path('M7 13l1 6h2'),
])

const FootIcon = makeIcon([
  path('M10 4c2 0 3 1.8 3 4 0 3-1.5 5-3.5 5S6 10.8 6 8c0-2.2 1.2-4 4-4Z'),
  circle(15, 5, 0.9),
  circle(17, 7, 0.8),
  circle(17.5, 10, 0.7),
  circle(16.5, 13, 0.7),
])

const PsychologyIcon = makeIcon([
  path('M12 4a6 6 0 0 0-6 6c0 2.8 1.6 4.8 4 5.6V20h5v-4h2a1 1 0 0 0 1-1v-2h1l-1.5-2A6 6 0 0 0 12 4Z'),
  path('M10 9h4'),
])

const OpticIcon = makeIcon([
  path('M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z'),
  circle(12, 12, 2.2),
])

const ChiropracticIcon = makeIcon([
  path('M12 3c-2 2-2 4 0 6s2 4 0 6-2 4 0 6'),
  path('M9 7h6'),
  path('M9 12h6'),
  path('M9 17h6'),
])

const ToothIcon = makeIcon([
  path('M8 4c1.4 0 2.1.8 4 .8s2.6-.8 4-.8c2.1 0 3.5 1.7 3.5 4 0 1.5-.5 3-1.3 4.6L15.5 20c-.5 1.1-2 1-2.2-.2L12 14l-1.3 5.8c-.3 1.2-1.8 1.3-2.2.2L5.8 12.6A10 10 0 0 1 4.5 8c0-2.3 1.4-4 3.5-4Z'),
])

const faqCategories = [
  {title: 'General', value: 'general', icon: FaqIcon},
  {title: 'Podologia', value: 'podologia', icon: FootIcon},
  {title: 'Psicologia', value: 'psicologia', icon: PsychologyIcon},
  {title: 'Optica', value: 'optica', icon: OpticIcon},
  {title: 'Quiropractica', value: 'quiropractica', icon: ChiropracticIcon},
  {title: 'Dentista', value: 'dentista', icon: ToothIcon},
]

export const structure = (S) =>
  S.list()
    .title('Panel de contenido')
    .items([
      S.listItem()
        .title('Guia rapida para editor')
        .icon(GuideIcon)
        .child(
          S.component()
            .title('Guia rapida para editor')
            .component(EditorGuidePane)
        ),
      S.divider(),
      S.listItem()
        .title('1) Configuracion del sitio')
        .icon(SiteConfigIcon)
        .child(
          S.list()
            .title('1) Configuracion del sitio')
            .items([
              S.listItem()
                .title(
                  'Informacion del negocio (header, inicio, ubicacion, contacto, redes, footer)'
                )
                .icon(BusinessIcon)
                .child(
                  S.documentTypeList('businessInfo').title('Informacion del negocio')
                ),
              S.listItem()
                .title('Seccion Nosotros (home y pagina Nosotros)')
                .icon(AboutIcon)
                .child(
                  S.documentTypeList('aboutSection').title('Seccion Nosotros')
                ),
            ])
        ),
      S.listItem()
        .title('2) Contenido comercial')
        .icon(CommercialIcon)
        .child(
          S.list()
            .title('2) Contenido comercial')
            .items([
              S.listItem()
                .title('Servicios')
                .icon(ServiceIcon)
                .child(S.documentTypeList('service').title('Servicios')),
              S.listItem()
                .title('Especialistas')
                .icon(SpecialistIcon)
                .child(
                  S.documentTypeList('specialistProfile').title('Especialistas')
                ),
              S.listItem()
                .title('Precios')
                .icon(PriceIcon)
                .child(S.documentTypeList('priceItem').title('Precios')),
              S.listItem()
                .title('Promociones')
                .icon(PromotionIcon)
                .child(S.documentTypeList('promotion').title('Promociones')),
            ])
        ),
      S.listItem()
        .title('3) Fotos y videos')
        .icon(GalleryIcon)
        .child(S.documentTypeList('galleryItem').title('Fotos y videos')),
      S.listItem()
        .title('4) Preguntas frecuentes (FAQ)')
        .icon(FaqIcon)
        .child(
          S.list()
            .title('4) Preguntas frecuentes (FAQ)')
            .items([
              S.listItem()
                .title('Todas')
                .icon(FaqIcon)
                .child(
                  S.documentTypeList('faqItem').title('Preguntas frecuentes')
                ),
              ...faqCategories.map((category) =>
                S.listItem()
                  .title(category.title)
                  .icon(category.icon)
                  .child(
                    S.documentList()
                      .title(`FAQ: ${category.title}`)
                      .filter('_type == "faqItem" && category == $category')
                      .params({category: category.value})
                  )
                ),
            ])
        ),
      S.listItem()
        .title('5) Contenido legal y avisos')
        .icon(LegalIcon)
        .child(
          S.list()
            .title('5) Contenido legal y avisos')
            .items([
              S.listItem()
                .title('Aviso de privacidad')
                .icon(PrivacyIcon)
                .child(
                  S.document()
                    .schemaType('privacyPage')
                    .documentId('privacyPageSingleton')
                    .title('Aviso de privacidad')
                ),
              S.listItem()
                .title('Comunicados')
                .icon(AnnouncementIcon)
                .child(
                  S.documentTypeList('siteAnnouncement').title('Comunicados')
                ),
            ])
        ),
    ])
