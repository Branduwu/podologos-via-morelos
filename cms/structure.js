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

const RodentIcon = makeIcon([
  circle(9, 10, 4),
  path('M13 9l6-4'),
  path('M13 11l5 2'),
  circle(9, 10, 1),
])

const RoachIcon = makeIcon([
  rect(8, 8, 8, 8, 4),
  path('M12 8V5'),
  path('M9 9l-3-3'),
  path('M15 9l3-3'),
  path('M9 15l-3 3'),
  path('M15 15l3 3'),
])

const TermiteIcon = makeIcon([
  circle(12, 8, 3),
  path('M12 11v8'),
  path('M9 13l-4 2'),
  path('M15 13l4 2'),
])

const BedBugIcon = makeIcon([
  rect(4, 10, 16, 8, 3),
  path('M8 10V7'),
  path('M12 10V6'),
  path('M16 10V7'),
  circle(8, 13, 1),
  circle(12, 13, 1),
  circle(16, 13, 1),
])

const AntIcon = makeIcon([
  circle(12, 6, 2),
  circle(12, 12, 2.5),
  circle(12, 18, 2),
  path('M9.5 5l-3 4'),
  path('M14.5 5l3 4'),
  path('M9.5 19l-3-4'),
  path('M14.5 19l3-4'),
])

const WaspIcon = makeIcon([
  path('M12 3c-2.5 2-2.5 4 0 6s2.5 4 0 6'),
  path('M8 6l-4 2'),
  path('M16 6l4 2'),
  path('M8 14l-4-2'),
  path('M16 14l4-2'),
])

const InspectionIcon = makeIcon([
  circle(11, 11, 7),
  path('M21 21l-4-4'),
  path('M11 8v6'),
  path('M8 11h6'),
])

const GeneralFumigIcon = makeIcon([
  path('M3 20c3-4 6-6 9-6s6 2 9 6'),
  path('M12 14V4'),
  path('M9 7l3-3 3 3'),
])

const faqCategories = [
  {title: 'General',                         value: 'general',    icon: FaqIcon},
  {title: 'Roedores / Rodents',              value: 'roedores',   icon: RodentIcon},
  {title: 'Cucarachas / Cockroaches',        value: 'cucarachas', icon: RoachIcon},
  {title: 'Termitas / Termites',             value: 'termitas',   icon: TermiteIcon},
  {title: 'Chinches / Bed Bugs',             value: 'chinches',   icon: BedBugIcon},
  {title: 'Hormigas / Ants',                 value: 'hormigas',   icon: AntIcon},
  {title: 'Avispas y abejas / Wasps & Bees', value: 'avispas',    icon: WaspIcon},
  {title: 'Inspeccion / Inspection',         value: 'inspeccion', icon: InspectionIcon},
  {title: 'Fumigacion general',              value: 'fumigacion', icon: GeneralFumigIcon},
]

export const structure = (S) =>
  S.list()
    .title('Panel de contenido – FumiPro NC')
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
                  'Informacion del negocio (header, inicio, servicios, precios, agenda, ubicacion, contacto, redes, footer)'
                )
                .icon(BusinessIcon)
                .child(
                  S.documentTypeList('businessInfo').title('Informacion del negocio')
                ),
              S.listItem()
                .title('Seccion Nosotros / About Us')
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
                .title('Servicios / Services')
                .icon(ServiceIcon)
                .child(S.documentTypeList('service').title('Servicios / Services')),
              S.listItem()
                .title('Tecnicos / Technicians')
                .icon(SpecialistIcon)
                .child(
                  S.documentTypeList('specialistProfile').title('Tecnicos / Technicians')
                ),
              S.listItem()
                .title('Precios / Pricing')
                .icon(PriceIcon)
                .child(S.documentTypeList('priceItem').title('Precios / Pricing')),
              S.listItem()
                .title('Promociones / Offers')
                .icon(PromotionIcon)
                .child(S.documentTypeList('promotion').title('Promociones / Offers')),
            ])
        ),
      S.listItem()
        .title('3) Galeria / Gallery')
        .icon(GalleryIcon)
        .child(S.documentTypeList('galleryItem').title('Galeria / Gallery')),
      S.listItem()
        .title('4) Preguntas frecuentes / FAQ')
        .icon(FaqIcon)
        .child(
          S.list()
            .title('4) FAQ')
            .items([
              S.listItem()
                .title('Todas / All')
                .icon(FaqIcon)
                .child(
                  S.documentTypeList('faqItem').title('Preguntas frecuentes / FAQ')
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
                .title('Aviso de privacidad / Privacy Policy')
                .icon(PrivacyIcon)
                .child(
                  S.document()
                    .schemaType('privacyPage')
                    .documentId('privacyPageSingleton')
                    .title('Aviso de privacidad / Privacy Policy')
                ),
              S.listItem()
                .title('Comunicados / Announcements')
                .icon(AnnouncementIcon)
                .child(
                  S.documentTypeList('siteAnnouncement').title('Comunicados / Announcements')
                ),
            ])
        ),
    ])
