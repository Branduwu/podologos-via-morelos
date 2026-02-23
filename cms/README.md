# CMS Podologos Via Morelos

Studio de Sanity para administrar contenido del sitio.

## Requisitos

- Node.js 20+
- npm

## Ejecutar

```bash
npm install
npm run dev
```

## Variables de entorno recomendadas

Configura en `cms/.env`:

```bash
SANITY_STUDIO_PROJECT_ID=tu_project_id
SANITY_STUDIO_DATASET=production
```

Si no se configuran, usa fallback local.

## Lint

```bash
npm run lint
```

## Flujo recomendado para editores

- No borres directo contenido con historial.
- Primero usa `Desactivar`.
- Si necesitas borrar, usa `Borrar ...` (accion segura) y sigue el mensaje de referencias.
- Si persiste un error: revisa la guia y contacta a ABJV.

Guia completa: `cms/GUIA-EDITORES.md`.
