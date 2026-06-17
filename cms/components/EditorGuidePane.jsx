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
  { emoji: "📝", title: "Agregar servicio", where: "2) Contenido → Servicios → Nuevo" },
  { emoji: "👩‍⚕️", title: "Agregar especialista", where: "2) Contenido → Especialistas → Nuevo" },
  { emoji: "💰", title: "Actualizar precio", where: "2) Contenido → Precios → editar ítem" },
  { emoji: "🎉", title: "Nueva promoción", where: "2) Contenido → Promociones → Nueva" },
  { emoji: "🖼️", title: "Subir foto o video", where: "3) Fotos y videos → Nuevo" },
  { emoji: "❓", title: "Agregar pregunta FAQ", where: "4) Preguntas frecuentes → Nueva" },
  { emoji: "🏢", title: "Datos del negocio / redes", where: "1) Configuración → Información del negocio" },
  { emoji: "🕐", title: "Cambiar horario o footer", where: "1) Configuración → Información del negocio" },
];

const CATEGORIES = ["Podología", "Psicología", "Óptica", "Quiropráctica", "Dentista"];

const CHECKLIST = [
  "Título claro y corto.",
  "Categoría correcta (usa el desplegable, no escribas a mano).",
  "Estado Activo según corresponda.",
  "Imagen legible en celular.",
  "Precios sin símbolo $, solo el número.",
  "WhatsApp con lada internacional y solo dígitos (ej: 5215512345678).",
  "Links probados directamente en el sitio web.",
];

const WHERE_MAP = [
  { emoji: "🏢", title: "Datos del negocio", desc: "Header, inicio, ubicación, contacto, redes, WhatsApp y footer." },
  { emoji: "👥", title: "Sección Nosotros", desc: "Bloque del home y página /nosotros." },
  { emoji: "🩺", title: "Servicios", desc: "Descripción, categoría, precio desde, duración y destino de agenda." },
  { emoji: "👩‍⚕️", title: "Especialistas", desc: "Perfil, foto, WhatsApp y mensaje personalizado." },
  { emoji: "💰", title: "Precios", desc: "Servicio relacionado, precio desde, notas y cotización." },
  { emoji: "🎉", title: "Promociones", desc: "Vigencia, imagen, categorías y botón de agenda." },
  { emoji: "🖼️", title: "Fotos y videos", desc: "Galería y recomendados del home." },
  { emoji: "❓", title: "FAQ", desc: "Preguntas reales con respuestas cortas y claras." },
];

const ERRORS = [
  { prob: "No aparece en la web", sol: "Revisa que Activo esté encendido, la categoría sea correcta y esté publicado." },
  { prob: "Agenda no precarga el especialista", sol: "Revisa categoría del servicio, precio relacionado y Especialista destino." },
  { prob: "WhatsApp no va al número esperado", sol: "Revisa Especialista destino y WhatsApp destino en el ítem." },
  { prob: "Promoción no aparece", sol: "Revisa que Activa esté encendido y que la vigencia (fechas) sea válida." },
  { prob: "No se puede borrar un ítem", sol: "Otro documento lo referencia; mejor apaga Activo en lugar de borrar." },
  { prob: "Error de validación al guardar", sol: "Lee el mensaje en rojo bajo el campo. Corrige ese campo y vuelve a guardar." },
];

export default function EditorGuidePane() {
  return (
    <Box padding={5} style={{ maxWidth: 860 }}>
      <Stack space={5}>

        {/* Header */}
        <Card tone="primary" radius={3} padding={5}>
          <Stack space={3}>
            <Flex align="center" gap={3}>
              <span aria-hidden="true" style={{ fontSize: "2rem", userSelect: "none" }}>🏥</span>
              <Stack space={1}>
                <Text size={3} weight="bold">Bienvenido al panel de contenido</Text>
                <Text size={1} muted>Clínica Podólogos Vía Morelos · Hecho con cariño para DANA HR 🤍</Text>
              </Stack>
            </Flex>
            <Text size={1}>
              Desde aquí administras todo el contenido del sitio web: servicios, especialistas, precios, promociones, galería y más.
              Edita pensando en el paciente: que entienda el servicio, el precio aproximado y cómo agendar.
            </Text>
          </Stack>
        </Card>

        {/* Quick tasks */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span aria-hidden="true" style={{ fontSize: "1rem", userSelect: "none" }}>⚡</span>
            <Text size={2} weight="semibold">¿Qué necesitas hacer?</Text>
          </Flex>
          <Grid columns={2} gap={2}>
            {QUICK_TASKS.map((t) => (
              <QuickCard key={t.title} {...t} />
            ))}
          </Grid>
        </Stack>

        {/* Checklist before publishing */}
        <SectionCard emoji="✅" title="Antes de guardar cualquier cambio" tone="positive">
          <Stack space={2}>
            {CHECKLIST.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Official categories - WARNING */}
        <SectionCard emoji="⚠️" title="Categorías oficiales — no las escribas a mano" tone="caution">
          <Stack space={3}>
            <Flex gap={2} wrap="wrap">
              {CATEGORIES.map((cat) => (
                <Badge key={cat} mode="outline" tone="caution" radius={2} padding={2} fontSize={1}>
                  {cat}
                </Badge>
              ))}
            </Flex>
            <Text size={1}>
              Si escribes diferente o usas una variación, pueden fallar los filtros, la agenda y las promociones.
              <strong> Siempre usa el menú desplegable</strong> cuando esté disponible en el campo.
            </Text>
          </Stack>
        </SectionCard>

        {/* Where to edit */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span aria-hidden="true" style={{ fontSize: "1rem", userSelect: "none" }}>🗺️</span>
            <Text size={2} weight="semibold">¿Dónde edito cada sección del sitio?</Text>
          </Flex>
          <Grid columns={2} gap={2}>
            {WHERE_MAP.map((item) => (
              <WhereCard key={item.title} {...item} />
            ))}
          </Grid>
        </Stack>

        {/* Agenda y WhatsApp */}
        <SectionCard emoji="💬" title="Agenda y WhatsApp — cómo funciona el destino">
          <Stack space={2}>
            {[
              "Si un servicio debe ir a una persona específica, usa «Especialista destino» en el servicio o precio.",
              "Si debe ir a un número sin especialista, usa «WhatsApp destino» en el ítem.",
              "Evita llenar especialista y WhatsApp manual al mismo tiempo si no es necesario.",
              "Si hay varios servicios con destinos distintos, se usará el WhatsApp general para evitar errores.",
              "Plantillas de mensaje: puedes usar {servicio}, {especialista}, {negocio} y {problema}.",
              "Ejemplo: Hola, quiero agendar {servicio} en {negocio}. Mi motivo es: {problema}",
            ].map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Promotions guide */}
        <SectionCard emoji="🎉" title="Promociones — puntos clave">
          <Stack space={2}>
            {[
              "Activa controla si la promoción puede publicarse.",
              "Fecha de inicio y fin: usa el selector de fecha; si la promo no tiene vigencia, déjalas vacías.",
              "Destacada ayuda a mostrarla como principal en el home.",
              "Fijada sube su prioridad en el listado.",
              "Si una promoción vence, la web la oculta automáticamente.",
              "Relaciona categorías correctas para que los filtros funcionen.",
            ].map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </Stack>
        </SectionCard>

        {/* Troubleshooting */}
        <Stack space={3}>
          <Flex align="center" gap={2}>
            <span aria-hidden="true" style={{ fontSize: "1rem", userSelect: "none" }}>🔧</span>
            <Text size={2} weight="semibold">¿Algo no funciona como esperabas?</Text>
          </Flex>
          <Stack space={2}>
            {ERRORS.map((e) => (
              <ErrorRow key={e.prob} {...e} />
            ))}
          </Stack>
        </Stack>

        {/* Contact / support */}
        <Card tone="caution" radius={3} padding={4}>
          <Flex gap={3} align="flex-start">
            <span aria-hidden="true" style={{ fontSize: "1.3rem", flexShrink: 0, userSelect: "none" }}>📞</span>
            <Stack space={2}>
              <Text size={1} weight="semibold">¿Necesitas soporte técnico?</Text>
              <Text size={1}>
                Cambia lo mínimo necesario, guarda y revisa en el sitio web antes de seguir.
                Si el problema persiste, contacta al soporte del proyecto:{" "}
                <strong>ingabrahamjv@gmail.com</strong>
              </Text>
            </Stack>
          </Flex>
        </Card>

      </Stack>
    </Box>
  );
}
