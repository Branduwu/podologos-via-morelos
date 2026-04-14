import React from "react";
import { Box, Card, Stack, Text } from "@sanity/ui";

const Section = ({ title, children }) => (
  <Card border radius={2} padding={4}>
    <Stack space={3}>
      <Text size={2} weight="semibold">
        {title}
      </Text>
      <Box>{children}</Box>
    </Stack>
  </Card>
);

const BulletList = ({ items }) => (
  <Stack space={2}>
    {items.map((item, index) => (
      <Text key={`${item}-${index}`} size={1}>
        {`- ${item}`}
      </Text>
    ))}
  </Stack>
);

export default function EditorGuidePane() {
  return (
    <Box padding={4}>
      <Stack space={4}>
        <Card tone="primary" radius={2} padding={4}>
          <Stack space={2}>
            <Text size={3} weight="bold">
              Guia rapida para editores
            </Text>
            <Text size={1} muted>
              Proyecto de DANA HR
            </Text>
            <Text size={1}>
              Edita pensando en el paciente: que entienda el servicio, el precio aproximado y como agendar sin confusion.
            </Text>
          </Stack>
        </Card>

        <Section title="Antes de publicar">
          <BulletList
            items={[
              "Titulo claro y corto.",
              "Categoria correcta.",
              "Estado Activo segun corresponda.",
              "Imagen legible en celular.",
              "Fechas en formato AAAA-MM-DD.",
              "Precios sin simbolo $, solo numero.",
              "WhatsApp con lada y solo digitos.",
              "Links probados en la web.",
            ]}
          />
        </Section>

        <Section title="Categorias oficiales">
          <BulletList
            items={[
              "Podologia",
              "Psicologia",
              "Optica",
              "Quiropractica",
              "Dentista",
              "Si cambias o escribes mal una categoria, pueden fallar filtros, agenda y promociones.",
            ]}
          />
        </Section>

        <Section title="Donde editar cada cosa">
          <BulletList
            items={[
              "Informacion del negocio: header, inicio, ubicacion, contacto, redes, WhatsApp y footer.",
              "Seccion Nosotros: bloque del home y pagina Nosotros.",
              "Servicios: descripcion, categoria, precio desde, duracion y destino de agenda.",
              "Especialistas: perfil, categoria, foto, WhatsApp y mensaje personalizado.",
              "Precios: servicio relacionado, precio desde, notas y cotizacion.",
              "Promociones: vigencia, imagen, categorias y boton de agenda.",
              "Fotos y videos: galeria y recomendados del home.",
              "FAQ: preguntas reales con respuestas cortas.",
              "Contenido legal y avisos: aviso de privacidad y comunicados.",
            ]}
          />
        </Section>

        <Section title="Agenda y WhatsApp">
          <BulletList
            items={[
              "Agenda usa datos confiables del CMS: servicios, especialistas y precios.",
              "No confies en numeros puestos en URLs publicas; el destino debe configurarse en el CMS.",
              "Si un servicio debe ir a una persona, usa Especialista destino.",
              "Si debe ir a un numero especial sin especialista, usa WhatsApp destino.",
              "Evita llenar especialista y WhatsApp manual a la vez si no es necesario.",
              "Si hay varios servicios con destinos distintos, se usa WhatsApp general para evitar errores.",
              "La hora de cierre significa fin de atencion, no ultimo inicio disponible.",
            ]}
          />
        </Section>

        <Section title="Promociones">
          <BulletList
            items={[
              "Usa titulo corto, etiqueta breve e imagen clara.",
              "Fecha de inicio y fecha de fin deben estar completas si la promo tiene vigencia.",
              "Activa controla si puede publicarse.",
              "Destacada ayuda a mostrarla como principal.",
              "Fijada sube prioridad al ordenar.",
              "Cuando una promocion vence, la web la oculta o desactiva el boton de agendar.",
            ]}
          />
        </Section>

        <Section title="Redaccion recomendada">
          <BulletList
            items={[
              "Escribe corto, claro y profesional.",
              "Evita tecnicismos si no ayudan al paciente.",
              "Explica beneficios concretos.",
              "No prometas resultados garantizados.",
              "Usa el mismo tono en todo el sitio: cercano, confiable y tranquilo.",
            ]}
          />
        </Section>

        <Section title="Plantillas WhatsApp">
          <BulletList
            items={[
              "Puedes usar {servicio}, {especialista}, {negocio} y {problema}.",
              "Tambien puedes usar _____ como alias de {problema}.",
              "No escribas manualmente el problema si ya usas {problema}.",
              "Ejemplo: Hola, quiero agendar {servicio} en {negocio}. Mi motivo es: {problema}",
            ]}
          />
        </Section>

        <Section title="Errores comunes">
          <BulletList
            items={[
              "No aparece en web: revisa Activo, categoria y publicacion.",
              "Agenda no precarga bien: revisa categoria, precio relacionado y especialista.",
              "WhatsApp no va al destino esperado: revisa Especialista destino y WhatsApp destino.",
              "Promocion no aparece: revisa Activa y vigencia.",
              "No se puede borrar: probablemente otro documento lo usa; mejor apaga Activo.",
              "Error de fecha: recarga Studio y usa AAAA-MM-DD.",
            ]}
          />
        </Section>

        <Card tone="caution" radius={2} padding={4}>
          <Text size={1}>
            Si tienes duda, cambia lo minimo necesario, guarda, revisa en la web y despues publica. Si el problema persiste, contacta a soporte del proyecto contacto ingabrahamjv@gmail.com.
          </Text>
        </Card>
      </Stack>
    </Box>
  );
}
