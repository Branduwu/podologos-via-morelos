# Guia Rapida para Editores de Contenido

## Proyecto firmado por Abraham Jimenez Valdes Dev

Esta guia explica que editar en cada area para mantener la web clara y ordenada.

## Novedades sincronizadas (Front + CMS)

- `Agenda desde cualquier pagina`:
  - Servicios, Especialistas, Precios y Promociones ya envian datos a `Agenda tu cita`.
  - Si eliges varios servicios en Precios, se envia cotizacion con total aproximado.
- `Categorias unificadas`:
  - Usa siempre: `Podologia`, `Psicologia`, `Optica`, `Quiropractica`.
  - Estas categorias alimentan filtros en Web (Precios, Especialistas, Promociones, FAQ).
- `Botones de Precios`:
  - La web ya usa texto claro:
    - `Agendar solo este`
    - `Agregar a cotizacion`
  - No cambies estos textos en CMS porque son parte del flujo de conversion.

## Orden recomendado de edicion

1. `1) Configuracion del sitio`
2. `2) Contenido comercial`
3. `3) Fotos y videos`
4. `4) Preguntas frecuentes (FAQ)`

## 1) Configuracion del sitio

### Informacion del negocio
- Edita: nombre, zona, direccion, telefono, horarios, WhatsApp y mapa.
- Edita redes: Facebook, Instagram y TikTok.
- Edita Home: texto principal, botones y fondo.
- Edita Footer: titulos de columnas, enlaces y copyright.

### Seccion Nosotros
- Edita titulo, textos, puntos clave e imagen principal.
- Edita subtitulos y botones de la pagina Nosotros.

## 2) Contenido comercial

### Servicios
- Edita: nombre, categoria, descripcion corta/larga, duracion y precio desde.
- Recomendado: descripcion corta de una linea.
- No borres servicios con historial. Usa `Activo = apagado` para ocultarlo.
- Si necesitas borrar, usa `Borrar servicio` y sigue el mensaje de validacion.

### Especialistas
- Edita: nombre, especialidad, categoria, foto, descripcion y areas.
- Puedes activar WhatsApp y personalizar mensaje por especialista.

### Precios
- Relaciona cada precio con un servicio.
- Edita: nombre del precio, monto, nota, activo y orden.
- La categoria del servicio debe estar correcta para que el filtro y la agenda funcionen.
- Si un precio no aparece en filtro, revisa categoria del servicio relacionado.

### Promociones
- Edita: titulo, etiqueta, descripcion, vigencia, imagen y estado.
- Vigencia: usa formato `AAAA-MM-DD` (ejemplo `2026-03-01`).
- Usa `Fijada` para subir prioridad.

## 3) Fotos y videos

### Galeria
- Edita: titulo, categoria, tipo (imagen/video), activo y orden.
- Si es video: pega solo URL (no iframe).
- Si no se puede embeber: activa "solo enlace" y usa imagen previa.

## 4) Preguntas frecuentes (FAQ)

- Edita por categoria: General, Podologia, Psicologia, Optica y Quiropractica.
- Cada item debe tener pregunta clara + respuesta corta.
- Usa `Destacada` solo en dudas clave.

## Que pagina se alimenta de que area

- Inicio: Informacion del negocio + Servicios + Promociones + Nosotros.
- Servicios: Servicios.
- Especialistas: Especialistas.
- Precios: Precios.
- Ubicacion: Informacion del negocio.
- Promociones: Promociones.
- Fotos y videos: Galeria.
- Nosotros: Seccion Nosotros.
- FAQ: FAQ.
- Contacto: Informacion del negocio + Redes.
- Agenda tu cita: Informacion del negocio + Servicios + Especialistas.

## Antes de publicar

1. Guardar borrador.
2. Revisar ortografia.
3. Validar links (WhatsApp, Maps, redes).
4. Confirmar categoria correcta (Podologia/Psicologia/Optica/Quiropractica).
5. Probar un click real en Web:
   - `Agendar este servicio` o `Agendar con este especialista`.
   - Verificar que se precargue en `Agenda tu cita`.
6. Publicar.

## Errores comunes y como resolver

- Error al borrar servicio por referencias:
  - Significa que otro documento usa ese servicio.
  - Abre los documentos relacionados y quita la referencia.
  - Vuelve a intentar borrar.

- Error al borrar especialista/promocion/precio por referencias:
  - Significa que hay relacion activa con otro documento.
  - Revisa y limpia referencias relacionadas.
  - Si no es urgente, usa `Desactivar` en lugar de borrar.

- Si aparece un error y no sabes como resolver:
  - Revisa esta guia.
  - Si persiste, contacta al desarrollador de este sistema ABJV.

- Si aparece un error de calendario (`firstDay`):
  - Recarga el Studio.
  - Verifica que la vigencia este en formato `AAAA-MM-DD`.
