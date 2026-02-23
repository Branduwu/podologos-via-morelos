# Podologos Via Morelos

Sitio web en Astro para Podologos Via Morelos con contenido administrado desde Sanity.

## Stack

- Astro 5
- Tailwind CSS 4
- Sanity Studio (carpeta `cms/`)
- Sentry (`@sentry/astro`) para observabilidad

## Estructura

- `src/`: sitio publico (paginas, componentes, layout, estilos)
- `src/lib/sanity.js`: cliente y consultas hacia Sanity
- `cms/`: configuracion de Studio y schemas de contenido
- `astro.config.mjs`: integraciones globales (Tailwind y Sentry)

## Requisitos

- Node.js 20+
- npm

## Ejecutar sitio web

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
npm run preview
```

## Ejecutar CMS (Sanity Studio)

```bash
cd cms
npm install
npm run dev
```

Guia para editores de contenido:

- `cms/GUIA-EDITORES.md`

## Calidad tecnica

```bash
npm run check
npm run lint
npm run lint:cms
npm run quality
```

- `check`: validacion de tipos y templates Astro.
- `lint`: ESLint para archivos JS/MJS del sitio.
- `lint:cms`: lint del Studio de Sanity.
- `quality`: ejecuta `check + lint + lint:cms`.

## Pruebas E2E (Playwright)

Primera vez (local):

```bash
npx playwright install chromium
```

Ejecutar pruebas E2E:

```bash
npm run test:e2e
```

Notas:

- Las pruebas E2E usan `playwright.config.ts`.
- Levantan el sitio con `npm run dev` durante el test.
- Si faltan navegadores, Playwright mostrara el comando de instalacion.

## CI (GitHub Actions)

Archivo: `.github/workflows/ci.yml`

- Job `quality`:
  - `npm ci`
  - `npm run check`
  - `npm run lint`
  - `npm run test:unit`
- Job `e2e` (despues de `quality`):
  - `npm ci`
  - `npx playwright install --with-deps chromium`
  - `npm run test:e2e`
  - Publica artifacts: `playwright-report/` y `test-results/`

Con esto, el pipeline valida calidad tecnica y flujos reales de interfaz.

## Observabilidad (Sentry)

1. Copia `.env.example` a `.env`.
2. Configura:
   - `PUBLIC_SENTRY_DSN`
   - `PUBLIC_SENTRY_TRACES_SAMPLE_RATE`
   - `SENTRY_DSN` (opcional, para entorno server)
   - `SENTRY_TRACES_SAMPLE_RATE` (opcional, para entorno server)
   - `SENTRY_AUTH_TOKEN` (solo si subiras source maps)
   - `SENTRY_ORG` (solo con source maps)
   - `SENTRY_PROJECT` (solo con source maps)
3. Ejecuta build.

La integracion de Sentry ya esta conectada en `astro.config.mjs`.

## Entornos Sanity (dev/staging/prod)

Configura variables para separar proyectos/datasets por entorno:

- Sitio (`src/lib/sanity.js`):
  - `SANITY_PROJECT_ID`
  - `SANITY_DATASET`
  - (fallback opcional) `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`
- CMS (`cms/sanity.config.js`):
  - `SANITY_STUDIO_PROJECT_ID`
  - `SANITY_STUDIO_DATASET`

Sin variables, el proyecto usa fallback local de desarrollo.

## Headers de seguridad (Vercel)

Se agrego `vercel.json` con:

- `Content-Security-Policy` explicita
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`
- `Strict-Transport-Security`

Si despliegas en otro hosting, replica esas cabeceras en su configuracion equivalente.

## Modelo de contenido

- `businessInfo`: datos generales del negocio
- `service`: catalogo de servicios y slugs publicos
- `promotion`: promociones activas y destacadas
- `galleryItem`: imagenes y videos de galeria
- `priceItem`: precios por servicio

## Notas operativas

- Los slugs de `service` se validan para evitar rutas invalidas en build estatico.
- Las consultas usan fallback seguro cuando Sanity falla.
- Usa `active` en `promotion`, `galleryItem` y `priceItem` para publicar u ocultar.
- Las URLs que vienen de CMS (redes, maps, enlaces de footer) se sanean antes de renderizar.
- En `agendar`, al cambiar servicio se limpia el prefill de cotizacion para evitar mensajes inconsistentes.
