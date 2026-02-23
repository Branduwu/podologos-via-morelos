import { VideoUrlWithPreviewInput } from "../components/VideoUrlWithPreviewInput";

function safeUrl(u) {
  try {
    return new URL(u);
  } catch {
    return null;
  }
}

function isEmbeddable(platform, value) {
  if (!value || !platform) return false;
  const parsed = safeUrl(value);
  if (!parsed) return false;
  const host = parsed.hostname.replace("www.", "");
  const path = parsed.pathname || "";

  if (platform === "youtube") return host === "youtube.com" || host === "youtu.be";
  if (platform === "tiktok") return host === "tiktok.com" && /\/@[^/]+\/video\/\d+/.test(path);
  if (platform === "facebook") {
    const okHost = host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.watch";
    const okPath =
      path.includes("/videos/") || path.startsWith("/plugins/video.php") || host === "fb.watch";
    return okHost && okPath;
  }
  return false;
}

export default {
  name: "galleryItem",
  title: "Galeria",
  type: "document",
  description: "Fotos y videos visibles en la pagina de galeria.",
  fieldsets: [
    { name: "basic", title: "Basico", options: { collapsible: true, collapsed: false } },
    { name: "media", title: "Multimedia", options: { collapsible: true, collapsed: false } },
    { name: "publish", title: "Publicacion", options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    {
      name: "title",
      title: "Titulo",
      type: "string",
      description: "Nombre corto para identificar el elemento.",
      fieldset: "basic",
      validation: (R) => R.required().error("El titulo es obligatorio."),
    },
    {
      name: "category",
      title: "Categoria",
      type: "string",
      description: "Se usa para filtros en la galeria publica.",
      fieldset: "basic",
      options: {
        list: [
          { title: "Podologia", value: "podologia" },
          { title: "Psicologia", value: "psicologia" },
          { title: "Optica / Optometria", value: "optica" },
          { title: "Quiropractica", value: "quiropractica" },
          { title: "Instalaciones", value: "instalaciones" },
        ],
        layout: "dropdown",
      },
      validation: (R) => R.required().error("Selecciona una categoria."),
    },
    {
      name: "type",
      title: "Tipo de contenido",
      type: "string",
      description: "Define si sera imagen o video.",
      fieldset: "basic",
      options: {
        list: [
          { title: "Imagen", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      validation: (R) => R.required().error("Selecciona el tipo de contenido."),
    },
    {
      name: "image",
      title: "Imagen",
      type: "image",
      description: "Obligatorio cuando el tipo sea Imagen.",
      fieldset: "media",
      options: { hotspot: true },
      hidden: ({ document }) => document?.type !== "image",
      validation: (R) =>
        R.custom((value, context) => {
          if (context.document?.type !== "image") return true;
          return value ? true : "Debes subir una imagen cuando el tipo es Imagen.";
        }),
    },
    {
      name: "platform",
      title: "Plataforma de video",
      type: "string",
      description: "Solo para videos.",
      fieldset: "media",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Facebook", value: "facebook" },
        ],
      },
      hidden: ({ document }) => document?.type !== "video",
      validation: (R) =>
        R.custom((value, context) => {
          if (context.document?.type !== "video") return true;
          return value ? true : "Selecciona la plataforma del video.";
        }),
    },
    {
      name: "url",
      title: "URL del video",
      type: "url",
      description: "Pega solo el enlace. No pegues iframe.",
      fieldset: "media",
      components: { input: VideoUrlWithPreviewInput },
      hidden: ({ document }) => document?.type !== "video",
      validation: (R) =>
        R.custom((value, context) => {
          if (context.document?.type !== "video") return true;
          if (!value) return "La URL del video es obligatoria.";
          if (typeof value === "string" && value.includes("<iframe")) {
            return "Pega solo la URL del video, no el codigo iframe.";
          }
          if (!/^https?:\/\//.test(value)) return "La URL debe iniciar con http o https.";

          const platform = context.document?.platform;
          let parsed;
          try {
            parsed = new URL(value);
          } catch {
            return "URL invalida.";
          }

          const host = parsed.hostname.replace("www.", "");
          const path = parsed.pathname;

          if (platform === "youtube") {
            const okHost = host === "youtube.com" || host === "youtu.be";
            return okHost || "Para YouTube usa un link de youtube.com o youtu.be.";
          }

          if (platform === "tiktok") {
            const looksLikeVideo = host === "tiktok.com" && /\/@[^/]+\/video\/\d+/.test(path);
            return (
              looksLikeVideo || "Para TikTok usa URL de video: https://www.tiktok.com/@usuario/video/ID"
            );
          }

          if (platform === "facebook") {
            const okHost =
              host === "facebook.com" ||
              host === "fb.watch" ||
              host.endsWith(".facebook.com");
            const looksLikeVideoPath =
              path.includes("/videos/") ||
              path.startsWith("/plugins/video.php") ||
              path.startsWith("/share/v/") ||
              host === "fb.watch";
            return (
              (okHost && looksLikeVideoPath) ||
              "Para Facebook usa URL de video, share/v o plugins/video.php."
            );
          }

          return true;
        }),
    },
    {
      name: "linkOnly",
      title: "Mostrar solo enlace (sin embed)",
      type: "boolean",
      initialValue: false,
      description: "Activalo si prefieres mostrar imagen + boton en vez de iframe.",
      fieldset: "media",
      hidden: ({ document }) => document?.type !== "video",
    },
    {
      name: "linkPreviewImage",
      title: "Imagen previa para enlace",
      type: "image",
      description: "Opcional. Se usa cuando el video se muestra como solo enlace.",
      options: { hotspot: true },
      fieldset: "media",
      hidden: ({ document }) => document?.type !== "video",
    },
    {
      name: "linkText",
      title: "Texto del boton",
      type: "string",
      description: "Opcional. Ejemplo: Ver video completo.",
      fieldset: "media",
      hidden: ({ document }) => document?.type !== "video",
      validation: (R) => R.max(40).warning("Recomendado: maximo 40 caracteres."),
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      description: "Menor numero = aparece primero.",
      fieldset: "publish",
    },
    {
      name: "active",
      title: "Activo",
      type: "boolean",
      initialValue: true,
      description: "Si esta apagado, no se publica.",
      fieldset: "publish",
    },
    {
      name: "featured",
      title: "Destacar en Home",
      type: "boolean",
      initialValue: false,
      description: "Si esta activo, el elemento puede mostrarse en la seccion destacada del Home.",
      fieldset: "publish",
    },
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      category: "category",
      media: "image",
      platform: "platform",
      url: "url",
      linkOnly: "linkOnly",
      linkPreviewImage: "linkPreviewImage",
    },
    prepare({ title, type, category, media, platform, url, linkOnly, linkPreviewImage }) {
      const categoryMap = {
        podologia: "Podologia",
        psicologia: "Psicologia",
        optica: "Optica/Optometria",
        quiropractica: "Quiropractica",
        instalaciones: "Instalaciones",
      };
      const status =
        type !== "video"
          ? "Imagen"
          : linkOnly
            ? "Solo enlace"
            : isEmbeddable(platform, url)
              ? "Embebible"
              : "Solo enlace";
      return {
        title,
        subtitle: `${type || "sin tipo"} | ${categoryMap[category] || "Sin categoria"} | ${status}`,
        media: media || linkPreviewImage,
      };
    },
  },
};
