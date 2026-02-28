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
  - Compartir enlace (titulo, descripcion e imagen de vista previa para WhatsApp/Facebook)

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
- `Especialista destino (Agendar/WhatsApp)` (opcional):
  - Si lo eliges, desde `Agendar este servicio` se precarga ese especialista y el WhatsApp va a su numero.
  - Si lo dejas vacio, el sistema toma automaticamente el primer especialista activo de la misma categoria.
- No borres servicios con historial. Usa `Activo = apagado`.

## 4) Especialistas

- Edita: nombre, especialidad, categoria, foto, descripcion y areas.
- Boton de WhatsApp:
  - `WhatsApp del especialista`: numero directo de ese especialista (si aplica).
  - `Mensaje de WhatsApp`: texto personalizado para ese especialista.
  - Si esos campos van vacios, usa los valores globales de `Informacion del negocio`.
  - Placeholders soportados en mensajes:
    - `{especialista}`: se rellena con el nombre del especialista.
    - `{servicio}`: se rellena con la especialidad/servicio.
    - `{negocio}`: se rellena con el nombre del negocio.
    - `{problema}`: en botones rapidos usa el valor por defecto global; en `Agendar` usa "Problema o notas".

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
  - WhatsApp general (citas y botones generales)
  - WhatsApp para especialistas (fallback)
  - Mensaje WhatsApp general (editable)
  - Mensaje WhatsApp para especialistas (editable)
  - Problema por defecto para botones rapidos
  - Redes sociales
  - Direccion y mapa

### Plantillas WhatsApp (importante)

- Puedes usar placeholders en mensajes:
  - `{servicio}`, `{especialista}`, `{negocio}`, `{problema}`
- Tambien se acepta `_____` como alias de `{problema}`.
- No dupliques placeholder + texto manual:
  - Correcto: `Hola, quiero agendar con {especialista}.`
  - Incorrecto: `Hola, quiero agendar con {especialista} Bernardo Hernandez.`
- Como se llena `{problema}`:
  - En pagina `Agendar`: toma el texto de `Problema o notas`.
  - En botones rapidos (sin formulario): toma `Problema por defecto para botones rapidos`.
- Logica de envio:
  - Si el mensaje en CMS empieza con `Hola...` o lleva saltos de linea, se envia tal cual (mensaje completo).
  - Si pones solo una frase corta, el sistema arma un formato guiado (intro + servicio + consulta).
  - En lista de especialistas:
    - `Agendar con este especialista` abre la pagina `/agendar` con datos precargados.
    - `WhatsApp` abre WhatsApp con mensaje personalizado.

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
