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

export default function EditorGuidePane() {
  return (
    <Box padding={4}>
      <Stack space={4}>
        <Card tone="primary" radius={2} padding={4}>
          <Stack space={2}>
            <Text size={3} weight="bold">
              Guia para editores (solo lectura)
            </Text>
            <Text size={1} muted>
              Proyecto firmado por Abraham Jimenez Valdes Dev
            </Text>
            <Text size={1}>
              Esta guia explica como cargar contenido claro y correcto para que se vea bien en la web.
            </Text>
          </Stack>
        </Card>

        <Section title="Checklist antes de publicar">
          <Stack space={2}>
            <Text size={1}>- Titulo claro y corto</Text>
            <Text size={1}>- Imagen o vista previa configurada</Text>
            <Text size={1}>- Categoria correcta</Text>
            <Text size={1}>- Estado Activo encendido</Text>
            <Text size={1}>- Fechas completas (si aplica)</Text>
            <Text size={1}>- Prueba un clic real en la web (Agenda desde Servicio/Especialista/Precio)</Text>
          </Stack>
        </Section>

        <Section title="Cambios clave sincronizados con la web">
          <Stack space={2}>
            <Text size={1}>Agenda: Servicios, Especialistas, Precios y Promociones ya envian datos a Agenda tu cita.</Text>
            <Text size={1}>Precios: se permite cotizacion de varios servicios con total aproximado.</Text>
            <Text size={1}>Categorias oficiales: Podologia, Psicologia, Optica, Quiropractica y Dentista.</Text>
            <Text size={1}>Si una categoria esta mal escrita, filtros y agenda pueden fallar.</Text>
          </Stack>
        </Section>

        <Section title="Orden recomendado de edicion">
          <Stack space={2}>
            <Text size={1}>1) Configuracion del sitio (Header, Inicio, Ubicacion, Contacto, Redes y Footer).</Text>
            <Text size={1}>2) Contenido comercial (Servicios, Especialistas, Precios y Promociones).</Text>
            <Text size={1}>3) Fotos y videos.</Text>
            <Text size={1}>4) Preguntas frecuentes (FAQ).</Text>
            <Text size={1}>Nota: no hay rutas duplicadas por seccion para evitar confusion al editar.</Text>
          </Stack>
        </Section>

        <Section title="Que pagina se alimenta de cada area">
          <Stack space={2}>
            <Text size={1}>Informacion del negocio: Header, Inicio, Ubicacion, Contacto, Redes y Footer.</Text>
            <Text size={1}>Seccion Nosotros: Home y pagina Nosotros.</Text>
            <Text size={1}>Servicios/Especialistas/Precios/Promociones: sus paginas publicas y bloques del Home.</Text>
            <Text size={1}>Fotos y videos: pagina Galeria y recomendados del Home.</Text>
            <Text size={1}>FAQ: pagina Preguntas frecuentes y bloques relacionados.</Text>
            <Text size={1}>Agenda tu cita: toma datos de Informacion del negocio + Servicios + Especialistas + Precios.</Text>
          </Stack>
        </Section>

        <Section title="Informacion del negocio">
          <Stack space={2}>
            <Text size={1}>Que llenar: nombre, zona, direccion, telefono, horarios, mapa y WhatsApp.</Text>
            <Text size={1}>Inicio: puedes definir varias imagenes y velocidad del carrusel de portada (en milisegundos).</Text>
            <Text size={1}>Logo del negocio: cambia Header y Footer.</Text>
            <Text size={1}>Icono de pestana (favicon): se cambia en archivos /public/favicon-light.svg y /public/favicon-dark.svg.</Text>
            <Text size={1}>Redes: pega links completos de Facebook, Instagram y TikTok.</Text>
            <Text size={1}>Ejemplo de horarios: Lun a Sab 10:00 a 19:00.</Text>
            <Text size={1}>Mapa: pega URL de Google Maps que abra directo la ubicacion.</Text>
            <Text size={1}>Error comun: dejar telefono o direccion incompletos.</Text>
          </Stack>
        </Section>

        <Section title="Servicios">
          <Stack space={2}>
            <Text size={1}>Que llenar: nombre, descripcion corta, descripcion larga, incluye, duracion y precio desde.</Text>
            <Text size={1}>Descripcion corta: 1 linea clara (que es y para quien sirve).</Text>
            <Text size={1}>Slug: se genera de la URL. Usa minusculas y guiones.</Text>
            <Text size={1}>Orden: numero menor aparece primero.</Text>
            <Text size={1}>Error comun: texto muy tecnico o muy largo en descripcion corta.</Text>
          </Stack>
        </Section>

        <Section title="Promociones">
          <Stack space={2}>
            <Text size={1}>Que llenar: titulo, descripcion corta/completa, fechas, imagen y estado activa.</Text>
            <Text size={1}>Categorias (filtro web): usa Podologia, Psicologia, Optica, Quiropractica o Dentista.</Text>
            <Text size={1}>Vigencia: usa formato AAAA-MM-DD (ejemplo 2026-03-01).</Text>
            <Text size={1}>Slug URL: se usa para la pagina detalle de cada promocion.</Text>
            <Text size={1}>Usa etiqueta corta si ayuda: Ejemplo 2x1, Nuevo, Temporada.</Text>
            <Text size={1}>Destacada: aparece en bloque principal de promociones.</Text>
            <Text size={1}>Fijada: sube prioridad al ordenar.</Text>
            <Text size={1}>Error comun: dejar fecha fin anterior a fecha inicio.</Text>
          </Stack>
        </Section>

        <Section title="Especialistas">
          <Stack space={2}>
            <Text size={1}>Que llenar: nombre, especialidad, descripcion, foto y estado activo.</Text>
            <Text size={1}>Slug URL: se usa para la pagina perfil de cada especialista.</Text>
            <Text size={1}>Boton WhatsApp: puedes personalizar mensaje por especialista.</Text>
            <Text size={1}>Error comun: no subir foto o dejar especialidad vacia.</Text>
          </Stack>
        </Section>

        <Section title="Galeria">
          <Stack space={2}>
            <Text size={1}>Que llenar: titulo, categoria, tipo y estado activo.</Text>
            <Text size={1}>Si es imagen: sube foto con buena calidad y encuadre claro.</Text>
            <Text size={1}>Si es video: elige plataforma y pega solo el enlace.</Text>
            <Text size={1}>Si no se puede embeber: activa Mostrar solo enlace y sube imagen previa.</Text>
            <Text size={1}>Destacar en Home: envia ese contenido al bloque principal del inicio.</Text>
          </Stack>
        </Section>

        <Section title="Precios">
          <Stack space={2}>
            <Text size={1}>Que llenar: servicio relacionado, nombre del precio, precio desde y estado activo.</Text>
            <Text size={1}>Duracion y nota son opcionales, pero ayudan al paciente a decidir.</Text>
            <Text size={1}>Orden: controla que precios salen primero en la tabla.</Text>
            <Text size={1}>Error comun: no relacionar el precio con un servicio.</Text>
            <Text size={1}>Flujo web: Agendar solo este envia un servicio; Agregar a cotizacion suma varios.</Text>
          </Stack>
        </Section>

        <Section title="Ejemplos correctos de URL de video">
          <Stack space={2}>
            <Text size={1}>YouTube: https://www.youtube.com/watch?v=VIDEO_ID</Text>
            <Text size={1}>YouTube: https://youtu.be/VIDEO_ID</Text>
            <Text size={1}>TikTok: https://www.tiktok.com/@usuario/video/1234567890</Text>
            <Text size={1}>Facebook: https://www.facebook.com/pagina/videos/1234567890/</Text>
            <Text size={1}>Facebook: https://fb.watch/xxxxxx/</Text>
            <Text size={1}>Importante: pega solo el enlace. No pegues iframe.</Text>
          </Stack>
        </Section>

        <Section title="Buenas practicas de redaccion">
          <Stack space={2}>
            <Text size={1}>- Usa frases claras y directas.</Text>
            <Text size={1}>- Evita tecnicismos innecesarios.</Text>
            <Text size={1}>- Explica beneficios para el paciente.</Text>
            <Text size={1}>- En titulos y categorias usa textos cortos (2 a 5 palabras).</Text>
            <Text size={1}>- Revisa ortografia antes de publicar.</Text>
            <Text size={1}>- Usa el mismo tono en todo el sitio: cercano, claro y profesional.</Text>
            <Text size={1}>- Si tienes duda, prioriza textos cortos y accionables.</Text>
          </Stack>
        </Section>

        <Section title="Errores comunes (y que hacer)">
          <Stack space={2}>
            <Text size={1}>- Error al borrar servicio: el servicio tiene referencias en otros documentos.</Text>
            <Text size={1}>- Solucion: quita la referencia en precios/promociones y vuelve a intentar.</Text>
            <Text size={1}>- Si aparece error de calendario (firstDay): recarga el Studio y valida que la fecha este en formato AAAA-MM-DD.</Text>
            <Text size={1}>- Si algo no se refleja en Agenda: revisa categoria del servicio y estado Activo.</Text>
            <Text size={1}>- Si aparece un error tecnico: revisa esta guia.</Text>
            <Text size={1}>- Si persiste: contacta al desarrollador de este sistema ABJV.</Text>
          </Stack>
        </Section>
      </Stack>
    </Box>
  );
}
