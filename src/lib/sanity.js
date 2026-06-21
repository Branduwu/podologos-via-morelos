// src/lib/sanity.js

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { reportError } from "./reportError.js";
import * as mock from "./mockData.js";

const sanityProjectId =
  import.meta.env.SANITY_PROJECT_ID ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  "demo";

// When project ID is "demo" or not set, use local mock data
const DEMO_MODE = !sanityProjectId || sanityProjectId === "demo" || import.meta.env.DEMO_MODE === "true";
const sanityDataset =
  import.meta.env.SANITY_DATASET ||
  import.meta.env.PUBLIC_SANITY_DATASET ||
  "production";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2025-01-01",
  useCdn: import.meta.env.PROD,
  token: import.meta.env.SANITY_TOKEN,
});

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

async function fetchSafe(query, params = {}, fallback = null) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    await reportError("sanity.fetch", error, { query });
    return fallback;
  }
}

export async function getServices() {
  if (DEMO_MODE) return mock.services.map((s) => ({ ...s, slug: { current: s.slug } }));
  return fetchSafe(`*[_type == "service" && (!defined(active) || active == true)]{
    title,
    slug,
    short,
    priceFrom,
    duration,
    category,
    whatsAppNumber,
    whatsAppMessage,
    "leadSpecialistSlug": leadSpecialist->slug.current
  }|order(order asc, title asc)`, {}, []);
}

export async function getServiceBySlug(slug) {
  if (DEMO_MODE) {
    const s = mock.services.find((item) => item.slug === slug);
    return s ? { ...s, slug: { current: s.slug } } : null;
  }
  return fetchSafe(
    `
    *[_type=="service" && slug.current==$slug && (!defined(active) || active == true)][0]{
      title,
      category,
      short,
      long,
      includes,
      duration,
      priceFrom,
      whatsAppNumber,
      whatsAppMessage,
      "leadSpecialistSlug": leadSpecialist->slug.current
    }
  `,
    { slug },
    null
  );
}

export async function getPromotions() {
  if (DEMO_MODE) return mock.promotions;
  return fetchSafe(`*[_type=="promotion" && active==true]|order(pinned desc, startDate desc){
    _id,
    title,
    label,
    shortDescription,
    description,
    startDate,
    endDate,
    featured,
    pinned,
    targetCategories,
    appliesTo,
    "serviceCategories": services[]->category,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`, {}, []);
}

export async function getGallery() {
  if (DEMO_MODE) return mock.gallery;
  return fetchSafe(`*[_type=="galleryItem" && active==true]|order(order asc, _createdAt desc){ _id, title, category, type, featured, "imageUrl": image.asset->url, platform, url, linkOnly, linkText, "linkPreviewImageUrl": linkPreviewImage.asset->url, order }`, {}, []);
}

export async function getPrices() {
  if (DEMO_MODE) return mock.prices;
  return fetchSafe(`*[_type=="priceItem" && active==true]|order(order asc, _createdAt desc){
    _id,
    order,
    title,
    "serviceTitle": select(defined(service->title) => service->title, defined(title) => title, true => "-"),
    "category": service->category,
    "leadSpecialistSlug": select(
      defined(leadSpecialist) && leadSpecialist->active != false => leadSpecialist->slug.current,
      defined(service->leadSpecialist) && service->leadSpecialist->active != false => service->leadSpecialist->slug.current
    ),
    "whatsAppNumber": coalesce(whatsAppNumber, service->whatsAppNumber),
    "whatsAppMessage": coalesce(whatsAppMessage, service->whatsAppMessage),
    priceFrom,
    duration,
    note
  }`, {}, []);
}

export async function getSpecialists() {
  if (DEMO_MODE) return mock.specialists;
  return fetchSafe(`*[_type=="specialistProfile" && active==true]|order(order asc, _createdAt desc){
    _id,
    name,
    specialty,
    specialtyCategory,
    shortBio,
    focusAreas,
    ctaText,
    ctaUrl,
    useWhatsAppButton,
    whatsAppNumber,
    whatsAppMessage,
    "slug": slug.current,
    "photoUrl": photo.asset->url
  }`, {}, []);
}

export async function getFaqs() {
  if (DEMO_MODE) return mock.faqs;
  return fetchSafe(`*[_type=="faqItem" && active==true]|order(featured desc, category asc, order asc, _createdAt asc){ _id, question, answer, category, featured }`, {}, []);
}

export async function getPrivacyPage() {
  return fetchSafe(`*[_type=="privacyPage"][0]{ title, subtitle, updatedAt, body }`, {}, null);
}

export async function getSiteAnnouncements() {
  return fetchSafe(
    `*[_type=="siteAnnouncement" && (!defined(active) || active == true)]|order(featured desc, order asc, publishDate desc, _createdAt desc){
      _id,
      title,
      publishDate,
      body,
      featured
    }`,
    {},
    []
  );
}

export async function getBusinessInfo() {
  if (DEMO_MODE) return mock.business;
  return fetchSafe(`*[_type=="businessInfo"][0]{
    name, area, address, phone, hoursText, mapsUrl, whatsappCitasNumber,
    whatsappSpecialistsNumber, whatsappGeneralMessage, whatsappSpecialistsMessage, whatsappQuickProblemDefault,
    socialShareTitle, socialShareDescription, "socialShareImageUrl": socialShareImage.asset->url,
    locationZoneText, locationReferencesText, locationParkingText, locationAccessText, locationGuideTips,
    "locationFacadeImageUrl": locationFacadeImage.asset->url,
    homeHeroEyebrow, homeHeroTitle, homeHeroSubtitle, "homeHeroImageUrl": homeHeroImage.asset->url,
    "homeHeroCarouselImageUrls": homeHeroCarouselImages[].asset->url,
    homeHeroCarouselIntervalMs,
    homePrimaryCtaText, homePrimaryCtaUrl, homeSecondaryCtaText, homeSecondaryCtaUrl,
    homePromotionsTitle, homePromotionsSubtitle, "homePromotionFallbackImageUrl": homePromotionFallbackImage.asset->url,
    googlePlaceId, homeGoogleReviewsTitle, homeGoogleReviewsSubtitle, homeGoogleReviewsCtaText,
    "logoImageUrl": logoImage.asset->url,
    facebookUrl, instagramUrl, tiktokUrl,
    weekdayHours, saturdayHours, sundayOpen, sundayHours,
    footerTagline,
    footerMenuTitle, footerSiteTitle,
    footerPrivacyLabel, footerPrivacyUrl,
    footerNoticesLabel, footerNoticesUrl,
    footerCopyrightText,
    servicesPageContent,
    pricesPageContent,
    bookingPageContent
  }`, {}, null);
}

export async function getAboutSection() {
  if (DEMO_MODE) return mock.about;
  return fetchSafe(`*[_type=="aboutSection"]|order(_updatedAt desc)[0]{ title, titleEn, intro, introEn, secondary, secondaryEn, keyPoints, keyPointsEn, specialistsTitle, specialistsSubtitle, servicesTitle, servicesSubtitle, ctaText, ctaTextEn, ctaUrl, secondaryCtaText, secondaryCtaTextEn, secondaryCtaUrl, "mainImageUrl": mainImage.asset->url, "galleryImageUrls": galleryImages[].asset->url, galleryCarouselIntervalMs }`, {}, null);
}

export async function getPromotionByPath(pathValue) {
  return fetchSafe(
    `*[_type=="promotion" && active==true && (slug.current == $value || _id == $value)][0]{
      _id, title, label, shortDescription, description, startDate, endDate, featured, pinned, targetCategories, appliesTo,
      "serviceCategories": services[]->category,
      "slug": slug.current, "imageUrl": image.asset->url
    }`,
    { value: pathValue },
    null
  );
}

export async function getSpecialistByPath(pathValue) {
  if (DEMO_MODE) {
    return mock.specialists.find((s) => s.slug === pathValue || s._id === pathValue) || null;
  }
  return fetchSafe(
    `*[_type=="specialistProfile" && active==true && (slug.current == $value || _id == $value)][0]{
      _id, name, specialty, specialtyCategory, shortBio, focusAreas, ctaText, ctaUrl, useWhatsAppButton, whatsAppNumber, whatsAppMessage,
      "slug": slug.current, "photoUrl": photo.asset->url
    }`,
    { value: pathValue },
    null
  );
}
