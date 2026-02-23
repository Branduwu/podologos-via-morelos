// src/lib/sanity.js

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const sanityProjectId =
  import.meta.env.SANITY_PROJECT_ID ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  "yb71w9t5";
const sanityDataset =
  import.meta.env.SANITY_DATASET ||
  import.meta.env.PUBLIC_SANITY_DATASET ||
  "production";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2025-01-01",
  useCdn: import.meta.env.PROD,
});

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

async function fetchSafe(query, params = {}, fallback = null) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return fallback;
  }
}

export async function getServices() {
  return fetchSafe(`*[_type == "service" && (!defined(active) || active == true)]{ title, slug, short, priceFrom, duration, category }|order(order asc, title asc)`, {}, []);
}

export async function getPromotions() {
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
    appliesTo,
    "serviceCategories": services[]->category,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }`, {}, []);
}

export async function getGallery() {
  return fetchSafe(`*[_type=="galleryItem" && active==true]|order(order asc, _createdAt desc){ _id, title, category, type, featured, "imageUrl": image.asset->url, platform, url, linkOnly, linkText, "linkPreviewImageUrl": linkPreviewImage.asset->url, order }`, {}, []);
}

export async function getPrices() {
  return fetchSafe(`*[_type=="priceItem" && active==true]|order(order asc, _createdAt desc){ _id, order, title, "serviceTitle": select(defined(service->title) => service->title, defined(title) => title, true => "-"), "category": service->category, priceFrom, duration, note }`, {}, []);
}

export async function getSpecialists() {
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
    whatsAppMessage,
    "slug": slug.current,
    "photoUrl": photo.asset->url
  }`, {}, []);
}

export async function getFaqs() {
  return fetchSafe(`*[_type=="faqItem" && active==true]|order(featured desc, category asc, order asc, _createdAt asc){ _id, question, answer, category, featured }`, {}, []);
}

export async function getBusinessInfo() {
  return fetchSafe(`*[_type=="businessInfo"][0]{
    name, area, address, phone, hoursText, mapsUrl, whatsappCitasNumber,
    locationZoneText, locationReferencesText, locationParkingText, locationAccessText, locationGuideTips,
    "locationFacadeImageUrl": locationFacadeImage.asset->url,
    homeHeroEyebrow, homeHeroTitle, homeHeroSubtitle, "homeHeroImageUrl": homeHeroImage.asset->url,
    homePrimaryCtaText, homePrimaryCtaUrl, homeSecondaryCtaText, homeSecondaryCtaUrl,
    homePromotionsTitle, homePromotionsSubtitle, "homePromotionFallbackImageUrl": homePromotionFallbackImage.asset->url,
    "logoImageUrl": logoImage.asset->url,
    facebookUrl, instagramUrl, tiktokUrl,
    footerMenuTitle, footerSiteTitle, footerPrivacyUrl, footerNoticesUrl, footerCopyrightText, footerProjectSignature
  }`, {}, null);
}

export async function getAboutSection() {
  return fetchSafe(`*[_type=="aboutSection"]|order(_updatedAt desc)[0]{ title, intro, secondary, keyPoints, specialistsTitle, specialistsSubtitle, servicesTitle, servicesSubtitle, ctaText, ctaUrl, secondaryCtaText, secondaryCtaUrl, "mainImageUrl": mainImage.asset->url, "galleryImageUrls": galleryImages[].asset->url }`, {}, null);
}

export async function getPromotionByPath(pathValue) {
  return fetchSafe(
    `*[_type=="promotion" && active==true && (slug.current == $value || _id == $value)][0]{
      _id, title, label, shortDescription, description, startDate, endDate, featured, pinned, appliesTo,
      "slug": slug.current, "imageUrl": image.asset->url
    }`,
    { value: pathValue },
    null
  );
}

export async function getSpecialistByPath(pathValue) {
  return fetchSafe(
    `*[_type=="specialistProfile" && active==true && (slug.current == $value || _id == $value)][0]{
      _id, name, specialty, specialtyCategory, shortBio, focusAreas, ctaText, ctaUrl, useWhatsAppButton, whatsAppMessage,
      "slug": slug.current, "photoUrl": photo.asset->url
    }`,
    { value: pathValue },
    null
  );
}
