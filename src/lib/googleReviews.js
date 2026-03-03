import { reportError } from "./reportError.js";

const GOOGLE_PLACE_DETAILS_ENDPOINT =
  "https://maps.googleapis.com/maps/api/place/details/json";

function getGooglePlacesApiKey() {
  return (
    import.meta.env.GOOGLE_PLACES_API_KEY ||
    import.meta.env.GOOGLE_MAPS_API_KEY ||
    ""
  );
}

function toSafeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeReview(review = {}) {
  return {
    authorName: String(review.author_name || "Paciente"),
    authorUrl: String(review.author_url || ""),
    profilePhotoUrl: String(review.profile_photo_url || ""),
    rating: toSafeNumber(review.rating, 0),
    text: String(review.text || ""),
    relativeTimeDescription: String(review.relative_time_description || ""),
    unixTime: toSafeNumber(review.time, 0),
  };
}

export async function getGooglePlaceReviews(
  placeId,
  { maxReviews = 4 } = {}
) {
  const safePlaceId = String(placeId || "").trim();
  if (!safePlaceId) return null;

  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) return null;

  const url = new URL(GOOGLE_PLACE_DETAILS_ENDPOINT);
  url.searchParams.set("place_id", safePlaceId);
  url.searchParams.set("language", "es");
  url.searchParams.set("region", "mx");
  url.searchParams.set(
    "fields",
    "name,rating,user_ratings_total,url,reviews"
  );
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      await reportError(
        "google.placeReviews.http",
        new Error(`Google Places HTTP ${response.status}`),
        { placeId: safePlaceId }
      );
      return null;
    }

    const payload = await response.json();
    const status = String(payload?.status || "");
    if (status !== "OK") {
      if (status !== "ZERO_RESULTS") {
        await reportError(
          "google.placeReviews.status",
          new Error(`Google Places status ${status || "UNKNOWN"}`),
          { placeId: safePlaceId, errorMessage: payload?.error_message || "" }
        );
      }
      return null;
    }

    const result = payload?.result || {};
    const rawReviews = Array.isArray(result.reviews) ? result.reviews : [];
    const reviews = rawReviews
      .slice(0, Math.max(1, Math.min(8, Number(maxReviews) || 4)))
      .map((item) => normalizeReview(item))
      .filter((item) => item.text || item.authorName);

    return {
      placeName: String(result.name || ""),
      rating: toSafeNumber(result.rating, 0),
      userRatingsTotal: toSafeNumber(result.user_ratings_total, 0),
      googleMapsUrl: String(result.url || ""),
      reviews,
    };
  } catch (error) {
    await reportError("google.placeReviews.fetch", error, {
      placeId: safePlaceId,
    });
    return null;
  }
}

