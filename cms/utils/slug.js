export function toSlug(input = "") {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

export async function isUniqueSlugWithinType(slug, context) {
  if (!slug) return true;

  const client = context.getClient({ apiVersion: "2024-01-01" });
  const documentId = context.document?._id?.replace(/^drafts\./, "");
  const params = {
    slug,
    type: context.document?._type,
    draft: documentId ? `drafts.${documentId}` : "",
    published: documentId || "",
  };

  const query = `
    count(*[
      _type == $type &&
      slug.current == $slug &&
      !(_id in [$draft, $published])
    ]) == 0
  `;

  return client.fetch(query, params);
}
