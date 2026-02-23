import React from "react";
import { Badge, Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { useFormValue } from "sanity";

function safeUrl(u) {
  try {
    return new URL(u);
  } catch {
    return null;
  }
}

function getTikTokId(u) {
  const parsed = safeUrl(u);
  if (!parsed) return null;
  const host = parsed.hostname.replace("www.", "");
  if (host !== "tiktok.com") return null;
  const parts = parsed.pathname.split("/").filter(Boolean);
  const videoIndex = parts.findIndex((x) => x === "video");
  return videoIndex >= 0 ? parts[videoIndex + 1] || null : null;
}

function getYouTubeId(u) {
  const parsed = safeUrl(u);
  if (!parsed) return null;
  const host = parsed.hostname.replace("www.", "");

  if (host === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0] || null;
  if (host === "youtube.com") {
    const v = parsed.searchParams.get("v");
    if (v) return v;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts[0] === "shorts" && parts[1]) return parts[1];
    if (parts[0] === "embed" && parts[1]) return parts[1];
  }
  return null;
}

function isFacebookEmbeddable(u) {
  const parsed = safeUrl(u);
  if (!parsed) return false;
  const host = parsed.hostname.replace("www.", "");
  if (host === "fb.watch") return true;
  if (!(host === "facebook.com" || host.endsWith(".facebook.com"))) return false;
  const path = parsed.pathname || "";
  return path.includes("/videos/") || path.startsWith("/plugins/video.php");
}

function getPreview(platform, url) {
  if (!url) return null;
  if (platform === "youtube") {
    const id = getYouTubeId(url);
    if (!id) return null;
    return {
      type: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
      thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }
  if (platform === "tiktok") {
    const id = getTikTokId(url);
    if (!id) return null;
    return { type: "iframe", src: `https://www.tiktok.com/embed/v2/${id}`, tall: true };
  }
  if (platform === "facebook") {
    if (!isFacebookEmbeddable(url)) return { type: "link-only" };
    const parsed = safeUrl(url);
    const host = parsed?.hostname.replace("www.", "");
    const isPlugin = host && (host === "facebook.com" || host.endsWith(".facebook.com")) && parsed.pathname.startsWith("/plugins/video.php");
    return {
      type: "iframe",
      src: isPlugin
        ? url
        : `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`,
    };
  }
  return null;
}

export function VideoUrlWithPreviewInput(props) {
  const platform = useFormValue(["platform"]);
  const type = useFormValue(["type"]);
  const linkOnly = Boolean(useFormValue(["linkOnly"]));
  const url = props.value || "";
  const preview = getPreview(platform, url);
  const embeddable = preview?.type === "iframe" && !linkOnly;

  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      {type === "video" ? (
        <Card padding={3} radius={2} tone="transparent" border>
          <Stack space={2}>
            <Flex align="center" justify="space-between">
              <Text size={1} muted>
                Vista previa del video
              </Text>
              <Flex gap={2}>
                <Badge tone={embeddable ? "positive" : "caution"}>
                  {embeddable ? "Embebible" : "Solo enlace"}
                </Badge>
                <Badge>{platform || "Sin plataforma"}</Badge>
              </Flex>
            </Flex>

            {!url ? (
              <Text size={1}>Pega una URL para generar vista previa.</Text>
            ) : linkOnly ? (
              <Text size={1}>Modo solo enlace activado. Se mostrara imagen + boton en la web.</Text>
            ) : preview?.type === "iframe" ? (
              <Stack space={2}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: preview.tall ? "9 / 16" : "16 / 9",
                    maxWidth: preview.tall ? 280 : "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid var(--card-border-color)",
                  }}
                >
                  <iframe
                    title="Vista previa"
                    src={preview.src}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                {preview.thumb ? (
                  <img
                    src={preview.thumb}
                    alt="Miniatura de referencia"
                    style={{
                      width: 220,
                      borderRadius: 8,
                      border: "1px solid var(--card-border-color)",
                    }}
                  />
                ) : null}
              </Stack>
            ) : preview?.type === "link-only" ? (
              <Text size={1}>
                Esta URL de Facebook no se puede embeber de forma estable. Se mostrara como enlace.
              </Text>
            ) : (
              <Text size={1}>No se pudo generar vista previa con esta URL.</Text>
            )}
            {url ? (
              <Button
                as="a"
                href={url}
                target="_blank"
                rel="noreferrer"
                text="Abrir URL original"
                mode="ghost"
                fontSize={1}
              />
            ) : null}
          </Stack>
        </Card>
      ) : null}
    </Stack>
  );
}
