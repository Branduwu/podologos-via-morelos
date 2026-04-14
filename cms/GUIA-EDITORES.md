# Guia para Editores de Contenido

Esta guia explica como editar el sitio desde el CMS de Sanity de forma clara, segura y consistente.

La idea principal es simple: cada cambio debe ayudar al paciente a entender que se ofrece, cuanto cuesta aproximadamente, donde esta el negocio y como agendar sin confusion.

## Reglas rapidas antes de editar

1. Edita primero el contenido, despues revisa como se ve en la web.
2. Usa textos cortos, claros y profesionales.
3. No borres documentos que ya se usaron; mejor apaga `Activo`.
4. Usa siempre las categorias oficiales.
5. Revisa enlaces, telefonos, fechas y WhatsApp antes de publicar.
6. Si algo afecta agenda, precios o WhatsApp, prueba un clic real en la web.

## Categorias oficiales

Usa estas categorias exactamente como aparecen en el CMS:

- `Podologia`
- `Psicologia`
- `Optica`
- `Quiropractica`
- `Dentista`

Por que importa: las categorias conectan servicios, especialistas, precios, promociones, filtros y la pagina `Agenda tu cita`. Si una categoria queda mal, la web puede mostrar contenido en el lugar incorrecto o no precargar datos.

## Orden recomendado de edicion

1. `Configuracion del sitio`
2. `Contenido comercial`
3. `Fotos y videos`
4. `Preguntas frecuentes`
5. `Contenido legal y avisos`

Este orden evita errores porque primero se configuran los datos base del negocio y despues el contenido que depende de esos datos.

## 1) Configuracion del sitio

Aqui se edita lo que aparece en varias partes del sitio: header, inicio, contacto, ubicacion, redes y pie de pagina.

### Informacion del negocio

Edita aqui:

- Nombre del negocio.
- Subtexto del header.
- Logo del negocio.
- Horarios visibles.
- Direccion.
- Telefono.
- WhatsApp general.
- WhatsApp para especialistas.
- Redes sociales.
- Mapa de Google.
- Textos y botones del inicio.
- Configuracion de resenas de Google.
- Enlaces del pie de pagina.

Consejos:

- En telefonos, usa solo numeros o un formato facil de leer.
- En WhatsApp, usa formato con lada, por ejemplo `5215512345678`.
- En enlaces, pega la URL completa cuando sea externa, por ejemplo `https://...`.
- Para enlaces internos usa rutas como `/privacidad`, `/contacto` o `/agendar`.
- No uses enlaces raros que empiecen con `//sitio.com`.

### Inicio

La pagina de inicio toma datos de `Informacion del negocio` y `Seccion Nosotros`.

Edita con esta idea:

- Titulo principal: debe decir rapidamente que hace el negocio.
- Subtitulo: debe explicar el beneficio para el paciente.
- Botones: deben llevar a acciones claras como agendar, llamar o ver servicios.
- Imagen principal: debe ser limpia, confiable y relacionada con atencion real.
- Promociones en inicio: se muestran solo si estan activas y vigentes.
- Resenas de Google: se muestran si hay Place ID y API configurados.

Buen ejemplo de titulo:

`Atencion profesional para el cuidado de tus pies`

Evita:

`Bienvenidos a nuestra pagina oficial`

### Seccion Nosotros

Edita aqui:

- Texto del bloque Nosotros en inicio.
- Texto de la pagina Nosotros.
- Puntos clave.
- Imagen principal.
- Imagenes de apoyo.
- Botones.

Consejos:

- Escribe como si explicaras el negocio a un paciente nuevo.
- Usa puntos clave concretos: experiencia, higiene, ubicacion, atencion por cita.
- Evita promesas absolutas como "curamos todo" o "resultados garantizados".

## 2) Contenido comercial

Aqui se edita lo que el paciente compara antes de agendar: servicios, especialistas, precios y promociones.

### Servicios

Edita:

- Nombre del servicio.
- Categoria.
- Descripcion corta.
- Descripcion larga.
- Que incluye.
- Duracion.
- Precio desde.
- Especialista destino, si aplica.
- WhatsApp destino, si aplica.
- Mensaje de WhatsApp, si aplica.
- Estado `Activo`.
- Orden.

Como escribir bien:

- Descripcion corta: una linea clara.
- Descripcion larga: explica para quien sirve y que puede esperar el paciente.
- Incluye: usa puntos concretos, no parrafos largos.
- Duracion: ejemplo `45 min aprox.`.
- Precio desde: numero en MXN, sin simbolo `$`.

Agenda y WhatsApp:

- Si un servicio debe llegar a un especialista, usa `Especialista destino`.
- Si debe llegar a un numero especifico sin especialista, usa `WhatsApp destino`.
- Evita llenar especialista y WhatsApp manual a la vez si no es necesario; para editores es mas claro elegir un solo destino principal.
- Si no llenas destino, agenda usara el WhatsApp general.
- Si el paciente agenda varios servicios con destinos distintos, se enviara al WhatsApp general para evitar confusiones.

No hagas esto:

- No cambies el slug de un servicio ya publicado si no es necesario.
- No borres un servicio con historial; apaga `Activo`.
- No pongas categorias inventadas.

### Especialistas

Edita:

- Nombre.
- Especialidad.
- Categoria de especialidad.
- Descripcion breve.
- Areas de atencion.
- Foto.
- WhatsApp del especialista.
- Mensaje de WhatsApp.
- Texto de boton.
- Estado `Activo`.
- Orden.

Consejos:

- La categoria del especialista debe coincidir con los servicios que atiende.
- Usa una foto clara, profesional y bien encuadrada.
- Si el especialista no recibe WhatsApp directo, deja su numero vacio y se usara el fallback configurado.
- El mensaje personalizado puede usar placeholders.

Ejemplo de mensaje:

`Hola, quiero agendar con {especialista} en {negocio}. Mi motivo es: {problema}`

### Precios

Edita:

- Servicio relacionado.
- Nombre del precio.
- Precio desde.
- Duracion.
- Nota.
- Especialista destino, si aplica.
- WhatsApp destino, si aplica.
- Mensaje de WhatsApp, si aplica.
- Estado `Activo`.
- Orden.

Por que es importante relacionar el precio con un servicio:

- La web usa esa relacion para filtrar por categoria.
- Agenda usa esa relacion para calcular el total aproximado.
- WhatsApp usa esa relacion para enviar la solicitud al destino correcto.

Consejos:

- Cada precio debe estar conectado a un servicio.
- Usa nombres faciles de entender, por ejemplo `Corte y limpieza podologica`.
- La nota sirve para aclarar condiciones: `Puede variar segun valoracion`.
- Si un precio tiene un destino especial, configuralo aqui.
- Si seleccionan varios precios en la web, agenda suma el total desde el catalogo del CMS, no desde la URL.

### Promociones

Edita:

- Titulo.
- Etiqueta corta.
- Descripcion corta.
- Descripcion completa.
- Imagen.
- Activa.
- Destacada.
- Fijada.
- Fecha de inicio.
- Fecha de fin.
- Categorias.
- Servicios relacionados.
- Slug.

Reglas de vigencia:

- Usa formato `AAAA-MM-DD`, por ejemplo `2026-03-01`.
- Si la promocion ya termino, la web no debe mostrar CTA para agendar.
- Si quieres pausar una promocion antes de que termine, apaga `Activa`.
- Si quieres que aparezca primero, usa `Fijada`.
- Si quieres que se vea en bloque principal, usa `Destacada`.

Buen ejemplo:

- Titulo: `Consulta podologica de valoracion`
- Etiqueta: `Nuevo`
- Descripcion corta: `Agenda una revision inicial y recibe orientacion personalizada.`

Evita:

- Titulos muy largos.
- Promociones sin fecha de fin.
- Imagenes con texto pequeno que no se lee en celular.

## 3) Fotos y videos

Edita:

- Titulo.
- Categoria.
- Tipo de contenido.
- Imagen o URL de video.
- Plataforma.
- Mostrar solo enlace.
- Imagen previa.
- Texto del boton.
- Destacar en Home.
- Estado `Activo`.
- Orden.

Consejos para imagenes:

- Usa fotos claras y bien iluminadas.
- Evita imagenes borrosas o con demasiado texto.
- Si la foto muestra instalaciones, que se vea limpio y profesional.

Consejos para videos:

- Pega solo el enlace, no pegues iframe.
- Si el video no se puede insertar, activa `Mostrar solo enlace`.
- Usa imagen previa si el enlace no genera miniatura.

Ejemplos validos:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.tiktok.com/@usuario/video/1234567890`
- `https://www.facebook.com/pagina/videos/1234567890/`
- `https://fb.watch/xxxxxx/`

## 4) Preguntas frecuentes

Edita:

- Pregunta.
- Respuesta.
- Categoria.
- Destacar pregunta.
- Estado `Activo`.
- Orden.

Consejos:

- Usa preguntas reales de pacientes.
- Responde corto, claro y sin tecnicismos.
- Si la respuesta depende de valoracion, dilo claramente.
- No prometas diagnosticos por internet.

Buen ejemplo:

Pregunta: `Puedo agendar si tengo dolor en el pie?`

Respuesta: `Si. Agenda una valoracion para revisar el caso y definir el tratamiento adecuado.`

## 5) Contenido legal y avisos

### Aviso de privacidad

Edita:

- Titulo.
- Subtitulo.
- Fecha de actualizacion.
- Contenido completo.

Importante:

- El aviso debe ser final, no un borrador.
- No publiques texto tipo "pendiente de revisar".
- Si hay duda legal, pide revision antes de publicar.

### Comunicados

Edita:

- Titulo.
- Fecha del comunicado.
- Contenido.
- Estado `Activo`.
- Orden.

Consejos:

- Usa comunicados para avisos temporales o informativos.
- Si el comunicado ya no aplica, apaga `Activo`.

## Plantillas de WhatsApp

Puedes usar estos placeholders en mensajes:

- `{servicio}`
- `{especialista}`
- `{negocio}`
- `{problema}`

Tambien se acepta `_____` como alias de `{problema}`.

Ejemplo correcto:

`Hola, quiero agendar {servicio} en {negocio}. Mi motivo es: {problema}`

Ejemplo incorrecto:

`Hola, quiero agendar {servicio} en {negocio}. Mi motivo es: {problema} dolor en el pie`

Por que esta mal: el editor ya escribio el motivo manualmente y el sistema tambien lo va a llenar.

Como se llena `{problema}`:

- En `Agenda tu cita`, toma el texto del campo `Problema o notas`.
- En botones rapidos, toma el texto de `Problema por defecto para botones rapidos`.

Consejo:

- Si quieres control total, escribe un mensaje completo que empiece con `Hola`.
- Si solo quieres una frase corta, el sistema arma el formato guiado.

## Como funciona Agenda tu cita

Agenda toma informacion de:

- `Informacion del negocio`: telefonos, mensajes y datos generales.
- `Servicios`: categorias y destinos.
- `Especialistas`: filtros y WhatsApp por especialista.
- `Precios`: servicios, total aproximado y rutas confiables.
- `Promociones`: categoria o servicio precargado.

Reglas importantes:

- El total aproximado se calcula desde el catalogo del CMS.
- El WhatsApp destino se resuelve desde datos confiables del CMS.
- Los parametros publicos de la URL no deben usarse como fuente de verdad para numero de WhatsApp.
- Si hay varios servicios con destinos distintos, se usa el WhatsApp general.
- La hora de cierre significa fin de atencion; no debe ofrecerse como hora de inicio.

## Enlaces recomendados

Usa asi:

- Interno: `/agendar`
- Interno: `/servicios`
- Interno: `/privacidad`
- Externo: `https://www.facebook.com/...`
- Externo: `https://www.google.com/maps/...`

Evita:

- `www.sitio.com` sin `https://`
- `//sitio.com`
- Enlaces copiados con espacios al inicio o al final.

## Slugs y URLs

El slug es la parte final de una URL.

Ejemplo:

- Titulo: `Podologia preventiva`
- Slug: `podologia-preventiva`
- URL resultante: `/servicios/podologia-preventiva`

Consejos:

- Usa minusculas.
- Usa guiones.
- No uses espacios.
- No cambies slugs publicados sin necesidad.

## Checklist antes de publicar

1. El titulo se entiende rapido.
2. La categoria es correcta.
3. El estado `Activo` esta como corresponde.
4. La imagen se ve bien en celular.
5. La fecha esta en formato `AAAA-MM-DD`.
6. El precio no tiene simbolo `$`.
7. El servicio relacionado esta configurado.
8. El WhatsApp tiene lada y solo numeros.
9. Los enlaces abren correctamente.
10. Probaste en la web el boton relacionado.

## Errores comunes y solucion

### No aparece en la web

- Revisa si `Activo` esta encendido.
- Revisa si la categoria es correcta.
- Revisa si el documento fue publicado.
- Espera a que el sitio se reconstruya si aplica.

### Agenda no precarga bien

- Revisa la categoria del servicio.
- Revisa que el precio este relacionado con un servicio.
- Revisa que el especialista tenga categoria compatible.

### El WhatsApp no va al destino esperado

- Revisa primero `Especialista destino`.
- Revisa despues `WhatsApp destino`.
- Si hay varios servicios con destinos distintos, es normal que vaya al WhatsApp general.
- Evita configurar muchos destinos manuales si no son necesarios.

### Una promocion no aparece

- Revisa que `Activa` este encendida.
- Revisa la fecha de inicio y fin.
- Si ya vencio, la web la oculta o desactiva su boton.

### Error al borrar

- Puede estar referenciado por otro documento.
- Mejor apaga `Activo`.
- Si de verdad debe borrarse, quita primero las referencias.

### Error de calendario

- Recarga el Studio.
- Verifica formato `AAAA-MM-DD`.

## Tono recomendado

El tono del sitio debe ser:

- Claro.
- Cercano.
- Profesional.
- Tranquilizador.
- Sin exagerar promesas.

Frase guia:

`Escribe para una persona que quiere resolver una duda y agendar sin batallar.`
