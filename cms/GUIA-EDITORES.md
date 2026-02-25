# Guia Rapida para Editores de Contenido

## Proyecto firmado por Abraham Jimenez Valdes Dev

Esta guia explica que editar en cada seccion del CMS para que la web se vea clara y consistente.

## Categorias oficiales (usar exactamente asi)

- `Podologia`
- `Psicologia`
- `Optica`
- `Quiropractica`
- `Dentista`

Si una categoria esta mal escrita, pueden fallar filtros y precargas en Agenda.

## Orden recomendado de edicion

1. `Header y navegacion`
2. `Inicio`
3. `Servicios`
4. `Especialistas`
5. `Precios`
6. `Ubicacion`
7. `Promociones`
8. `Fotos y videos`
9. `Nosotros`
10. `FAQ`
11. `Contacto`
12. `Agenda tu cita`

## 1) Header y navegacion

- Edita en `Informacion del negocio`:
  - Nombre del negocio
  - Subtexto del header
  - Logo del header
  - Texto de horario en header
  - Telefono y redes

## 2) Inicio

- Edita en `Informacion del negocio`:
  - Texto pequeno superior
  - Titulo principal
  - Subtitulo
  - Imagen principal
  - Botones (texto + enlace)
  - Titulo/subtitulo de promociones
- Edita en `Nosotros (Inicio)`:
  - Titulo, intro, texto secundario y puntos clave

## 3) Servicios

- Edita: nombre, categoria, descripcion corta/larga, incluye, duracion y precio desde.
- No borres servicios con historial. Usa `Activo = apagado`.

## 4) Especialistas

- Edita: nombre, especialidad, categoria, foto, descripcion y areas.
- Boton de WhatsApp: usa mensaje claro y sin placeholders.

## 5) Precios

- Relaciona cada precio con un servicio.
- El filtro por categoria en web depende de la categoria del servicio relacionado.

## 6) Ubicacion

- Edita en `Informacion del negocio`:
  - Direccion
  - URL de Google Maps
  - Zona
  - Referencias
  - Estacionamiento y acceso (si aplica)
  - Guia rapida (maximo 3 tips)
  - Foto de fachada

## 7) Promociones

- Edita: titulo, etiqueta, descripcion, imagen y vigencia.
- Vigencia: formato `AAAA-MM-DD` (ejemplo `2026-03-01`).
- `Categorias (filtro web)`: selecciona una o varias categorias oficiales (incluye `Dentista`).
- `Aplica a (texto)`: usa etiquetas visibles de marketing (ejemplo: primera vez, prevencion).

## 8) Fotos y videos

- Edita: titulo, categoria, tipo, estado activo y orden.
- Video: pega solo enlace (no iframe).
- Si no se puede embeber, usa modo solo enlace e imagen previa.

## 9) Nosotros

- Edita en `Nosotros (Inicio)`:
  - Textos de bloque Inicio
  - Textos de pagina Nosotros
  - Imagen principal e imagenes de apoyo
  - Botones

## 10) FAQ

- Edita por categoria:
  - General, Podologia, Psicologia, Optica, Quiropractica, Dentista.
- Usa preguntas reales y respuestas cortas.

## 11) Contacto

- Edita en `Informacion del negocio`:
  - Telefono
  - WhatsApp citas
  - Redes sociales
  - Direccion y mapa

## 12) Agenda tu cita

Se alimenta de:

- `Informacion del negocio` (contacto/horario)
- `Servicios` (categorias)
- `Especialistas` (filtro por categoria)
- `Precios` (total aproximado en cotizacion)

## Checklist antes de publicar

1. Guardar borrador.
2. Revisar ortografia.
3. Confirmar categoria correcta.
4. Verificar estado `Activo`.
5. Validar links (WhatsApp, Maps, redes).
6. Probar un clic real en web:
   - `Agendar este servicio`
   - `Agendar con este especialista`
   - `Agendar` en promociones y precios
7. Publicar.

## Errores comunes

- Error al borrar por referencias:
  - Ese documento esta usado en otro lado.
  - Quita referencias primero o usa `Desactivar`.
- Error de calendario (`firstDay`):
  - Recarga Studio y confirma formato `AAAA-MM-DD`.
- Si persiste un error:
  - Revisa esta guia y contacta al desarrollador ABJV.
