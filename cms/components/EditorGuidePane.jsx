import React from "react";
import { Badge, Box, Card, Flex, Grid, Stack, Text } from "@sanity/ui";

const SectionCard = ({ emoji, title, tone, children }) => (
  <Card border radius={3} padding={4} tone={tone || "default"}>
    <Stack space={3}>
      <Flex align="center" gap={2}>
        <span aria-hidden="true" style={{ fontSize: "1.1rem", userSelect: "none" }}>{emoji}</span>
        <Text size={2} weight="semibold">{title}</Text>
      </Flex>
      {children}
    </Stack>
  </Card>
);

const BulletItem = ({ children }) => (
  <Flex gap={2} align="flex-start">
    <span aria-hidden="true" style={{ fontSize: "0.8rem", lineHeight: "1.7", flexShrink: 0, opacity: 0.5 }}>›</span>
    <Text size={1} style={{ lineHeight: "1.6" }}>{children}</Text>
  </Flex>
);

const QuickCard = ({ emoji, title, where }) => (
  <Card border radius={2} padding={3} tone="default">
    <Stack space={2}>
      <Flex align="center" gap={2}>
        <span aria-hidden="true" style={{ fontSize: "1.2rem", userSelect: "none" }}>{emoji}</span>
        <Text size={1} weight="semibold">{title}</Text>
      </Flex>
      <Text size={0} muted>{where}</Text>
    </Stack>
  </Card>
);

const ErrorRow = ({ prob, sol }) => (
  <Card border radius={2} padding={3}>
    <Stack space={2}>
      <Flex gap={2} align="center">
        <span aria-hidden="true" style={{ fontSize: "0.9rem", userSelect: "none" }}>🔴</span>
        <Text size={1} weight="semibold">{prob}</Text>
      </Flex>
      <Flex gap={2} align="flex-start" style={{ paddingLeft: "1.4rem" }}>
        <span aria-hidden="true" style={{ fontSize: "0.8rem", lineHeight: "1.7", flexShrink: 0, opacity: 0.5 }}>→</span>
        <Text size={1} muted>{sol}</Text>
      </Flex>
    </Stack>
  </Card>
);

const WhereCard = ({ emoji, title, desc }) => (
  <Card border radius={2} padding={3}>
    <Flex gap={3} align="flex-start">
      <span aria-hidden="true" style={{ fontSize: "1.15rem", flexShrink: 0, marginTop: "0.05rem", userSelect: "none" }}>{emoji}</span>
      <Stack space={1}>
        <Text size={1} weight="semibold">{title}</Text>
        <Text size={0} muted>{desc}</Text>
      </Stack>
    </Flex>
  </Card>
);

const QUICK_TASKS = [
  { emoji: "🛠️", title: "Agregar servicio / Add service",          where: "2) Contenido → Servicios → Nuevo" },
  { emoji: "👷", title: "Agregar técnico / Add technician",         where: "2) Contenido → Técnicos → Nuevo" },
  { emoji: "💲", title: "Actualizar precio / Update price",         where: "2) Contenido → Precios → editar ítem" },
  { emoji: "🎉", title: "Nueva promoción / New promotion",          where: "2) Contenido → Promociones → Nueva" },
  { emoji: "🖼️", title: "Subir foto o video / Upload photo/video", where: "3) Galería → Nuevo" },
  { emoji: "❓", title: "Agregar pregunta FAQ / Add FAQ",           where: "4) Preguntas frecuentes → Nueva" },
  { emoji: "🏢", title: "Datos del negocio / Business info",        where: "1) Configuración → Información del negocio" },
  { emoji: "🕐", title: "Cambiar horario / Update hours",           where: "1) Configuración → Información del negocio" },
];

const CATEGORIES = [
  "roedores", "cucarachas", "termitas", "chinches", "hormigas", "avispas", "inspeccion", "general",
];

const CHECKLIST = [
  "Título claro y en ambos idiomas cuando aplique. / Clear title in both languages when applicable.",
  "Categoría correcta (usa el desplegable). / Correct category (use the dropdown).",
  "Estado Activo encendido para que sea visible. / Active status ON to make it visible.",
  "Imagen legible en celular. / Image readable on mobile.",
  "Precios en USD, sin símbolo $, solo número. / Prices in USD, no $ sign, number only.",
  "WhatsApp con código de país USA: 1704XXXXXXX. / WhatsApp with US country code: 1704XXXXXXX.",
  "Links probados directamente en el sitio. / Links tested directly on the website.",
];

const WHERE_MAP = [
  { emoji: "🏢", title: "Datos del negocio / Business info",       desc: "Header, inicio, ubicación, contacto, redes, WhatsApp y footer." },
  { emoji: "👥", title: "Sección Nosotros / About section",        desc: "Bloque del home y página /nosotros." },
  { emoji: "🐀", title: "Servicios / Services",                    desc: "Descripción ES+EN, categoría, precio, duración y destino WhatsApp." },
  { emoji: "👷", title: "Técnicos / Technicians",                  desc: "Perfil, foto, WhatsApp y mensaje personalizado ES+EN." },
  { emoji: "💲", title: "Precios / Prices",                        desc: "Servicio relacionado, precio USD, nota y cotización." },
  { emoji: "🎉", title: "Promociones / Promotions",                desc: "Vigencia, imagen, categorías y botón de solicitud." },
  { emoji: "🖼️", title: "Galería / Gallery",                      desc: "Fotos y videos de trabajos realizados." },
  { emoji: "❓", title: "FAQ",                                     desc: "Preguntas frecuentes en ES e EN con respuestas cortas." },
];

const ERRORS = [
  { prob: "No aparece en la web / Not showing on website",              sol: "Revisa que Activo esté encendido, la categoría sea correcta y esté publicado." },
  { prob: "Solicitud no precarga el técnico / Request doesn't load tech", sol: "Revisa categoría del servicio, precio relacionado y Técnico destino." },
  { prob: "WhatsApp no va al número esperado / Wrong WhatsApp number",   sol: "Revisa Técnico destino y WhatsApp destino en el ítem." },
  { prob: "Promoción no aparece / Promotion not showing",               sol: "Revisa que Activa esté encendido y que la vigencia (fechas) sea válida." },
  { prob: "No se puede borrar un ítem / Can't delete item",             sol: "Otro documento lo referencia; mejor apaga Activo en lugar de borrar." },
  { prob: "Error de validación / Validation error",                     sol: "Lee el mensaje en rojo bajo el campo, corrígelo y vuelve a guardar." },
];

export default function EditorGuidePane() {
  return (
    <Box padding={5} style={{ maxWidth: 860 }}>
      <Stack space={5}>

        {/* Header */}
        <Card tone="primary" radius={3} padding={5}>
          <Stack space={3}>
            <Flex align="center" gap={3}>
              <span aria-hidden="true" style={{ fontSize: "2rem", userSelect: "none" }}>🪲</span>
              <Stack space={1}>
                <Text size={3} weight="bold">FumiPro NC — Panel de contenido / Content Panel</Text>
                <Text size={1} muted>Charlotte, NC · Control de plagas profesional / Professional Pest Control</Text>
              </Stack>
            </Flex>
            <Text size={1}>
              <strong>ES:</strong> Desde aquí administras todo el contenido del sitio: servicios, técnicos, precios, promociones, galería y FAQ.
              Edita pensando en el cliente: que entienda el servicio, el precio aproximado y cómo solicitarlo.
            </Text>
            <Text size={1}>
              <strong>EN:</strong> From here you manage all site content: services, technicians, prices, promotions, gallery and FAQ.
              Edit with the customer in mind: they should understand the service, approximate price, and how to request it.
            </Text>
          </Stack>
        </Card>

        {/* Quick tasks */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span aria-hidden="true" style={{ fontSize: "1rem", userSelect: "none" }}>⚡</span>
            <Text size={2} weight="semibold">¿Qué necesitas hacer? / What do you need to do?</Text>
          </Flex>
          <Grid columns={2} gap={2}>
            {QUICK_TASKS.map((t) => (
              <QuickCard key={t.title} {...t} />
            ))}
          </Grid>
        </Stack>

        {/* Checklist before publishing */}
        <SectionCard emoji="✅" title="Antes de guardar / Before saving" tone="positive">
          <Stack space={2}>
            {CHECKLIST.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Official categories */}
        <SectionCard emoji="⚠️" title="Categorías oficiales — usa siempre el desplegable / Always use the dropdown" tone="caution">
          <Stack space={3}>
            <Flex gap={2} wrap="wrap">
              {CATEGORIES.map((cat) => (
                <Badge key={cat} mode="outline" tone="caution" radius={2} padding={2} fontSize={1}>
                  {cat}
                </Badge>
              ))}
            </Flex>
            <Text size={1}>
              <strong>ES:</strong> Si escribes diferente o usas una variación, pueden fallar los filtros, la solicitud y las promociones.{" "}
              <strong>Siempre usa el menú desplegable.</strong>
            </Text>
            <Text size={1}>
              <strong>EN:</strong> If you type a different variation, filters, booking and promotions may break.{" "}
              <strong>Always use the dropdown menu.</strong>
            </Text>
          </Stack>
        </SectionCard>

        {/* Where to edit */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span aria-hidden="true" style={{ fontSize: "1rem", userSelect: "none" }}>🗺️</span>
            <Text size={2} weight="semibold">¿Dónde edito cada sección? / Where do I edit each section?</Text>
          </Flex>
          <Grid columns={2} gap={2}>
            {WHERE_MAP.map((item) => (
              <WhereCard key={item.title} {...item} />
            ))}
          </Grid>
        </Stack>

        {/* Bilingual content note */}
        <SectionCard emoji="🌐" title="Contenido bilingüe / Bilingual content" tone="primary">
          <Stack space={2}>
            {[
              "Nosotros: completa título, intro, texto secundario y puntos clave en ES y EN (fieldsets 1 y 1b).",
              "Servicios: completa título, descripción corta, larga e incluye en ES y EN.",
              "Técnicos: completa especialidad, bio y áreas de atención en ES y EN.",
              "FAQ: completa pregunta y respuesta en ES y EN (Question / Answer fields).",
              "About Us: fill in title, intro, secondary text and key points in ES and EN (fieldsets 1 & 1b).",
              "Services: fill in title, short desc, long desc and includes in both ES and EN.",
              "Technicians: fill in specialty, bio and focus areas in both ES and EN.",
              "FAQ: fill in question and answer in both ES and EN.",
            ].map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* WhatsApp / Booking */}
        <SectionCard emoji="💬" title="Solicitudes y WhatsApp — cómo funciona el destino / How routing works">
          <Stack space={2}>
            {[
              "Si un servicio debe ir a un técnico específico, usa «Técnico destino» en el servicio o precio.",
              "Si debe ir a un número sin técnico, usa «WhatsApp destino» en el ítem.",
              "Evita llenar técnico y WhatsApp manual al mismo tiempo.",
              "Si hay varios servicios con destinos distintos, se usará el WhatsApp general.",
              "Plantillas: puedes usar {servicio}, {tecnico}, {negocio} y {problema}.",
              "Ejemplo: Hola, quiero solicitar {servicio} en {negocio}. Detalle: {problema}",
              "If a service goes to a specific tech, use «Technician destination» in the service or price.",
              "Template example: Hi, I'd like to request {servicio} at {negocio}. Details: {problema}",
            ].map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Promotions */}
        <SectionCard emoji="🎉" title="Promociones — puntos clave / Promotions — key points">
          <Stack space={2}>
            {[
              "Activa controla si la promoción puede publicarse. / Active controls whether it publishes.",
              "Fecha de inicio y fin: deja vacías si la promo no tiene vigencia definida. / Start/end date: leave empty if no fixed period.",
              "Destacada ayuda a mostrarla como principal en el home. / Featured shows it prominently on the homepage.",
              "Fijada sube su prioridad en el listado. / Pinned raises its priority in the list.",
              "Si una promoción vence, la web la oculta automáticamente. / Expired promos are hidden automatically.",
              "Relaciona categorías de plaga correctas para que los filtros funcionen. / Link correct pest categories for filters to work.",
            ].map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Troubleshooting */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span aria-hidden="true" style={{ fontSize: "1rem", userSelect: "none" }}>🔧</span>
            <Text size={2} weight="semibold">¿Algo no funciona? / Something not working?</Text>
          </Flex>
          <Stack space={2}>
            {ERRORS.map((e) => (
              <ErrorRow key={e.prob} {...e} />
            ))}
          </Stack>
        </Stack>

        {/* Support */}
        <Card tone="caution" radius={3} padding={4}>
          <Flex gap={3} align="flex-start">
            <span aria-hidden="true" style={{ fontSize: "1.3rem", flexShrink: 0, userSelect: "none" }}>📞</span>
            <Stack space={2}>
              <Text size={1} weight="semibold">¿Necesitas soporte técnico? / Need technical support?</Text>
              <Text size={1}>
                Cambia lo mínimo necesario, guarda y revisa en el sitio antes de seguir. / Change the minimum needed, save and check the site before continuing.{" "}
                Si el problema persiste: <strong>ingabrahamjv@gmail.com</strong>
              </Text>
            </Stack>
          </Flex>
        </Card>

      </Stack>
    </Box>
  );
}
