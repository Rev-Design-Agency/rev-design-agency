import { groq } from "next-sanity";

export const oathnetCaseQuery = groq`*[_type == "oathnetCase"][0]{
  "showcaseImageUrl": showcaseImage.asset->url,
}`;

export const elveCaseQuery = groq`*[_type == "elveCase"][0]{
  heroVideoUrl,
  projectTitle,
  projectSubtitle,
  metaClient,
  metaIndustry,
  metaYear,
  metaServices,
  "showcaseImageUrl":      showcaseImage.asset->url,
  "testimonialImageUrl":   testimonialImage.asset->url,
  "productShowcaseImageUrl": productShowcaseImage.asset->url,
}`;

export const heroQuery = groq`*[_type == "hero"][0]{
  ...,
  "trustAvatarUrl": trustAvatar.asset->url,
  "heroImageUrl": heroImage.asset->url
}`;

export const storyQuery = groq`*[_type == "story"][0]{
  ...,
  desktopPhoto,
  mobilePhoto
}`;

export const portfolioQuery = groq`*[_type == "portfolio"] | order(order asc){
  title,
  "imageUrl": image.asset->url
}`;

// All case study slugs from BOTH portfolio (legacy) + caseStudy (new template) docs.
// Merged and ordered by the shared `order` field — drives prev/next navigation.
export const caseStudySlugsQuery = groq`*[
  (_type == "portfolio" && defined(caseStudySlug) && caseStudySlug != "") ||
  (_type == "caseStudy"  && defined(slug.current))
] | order(order asc){
  "slug":  select(_type == "portfolio" => caseStudySlug, slug.current),
  "order": order
}`;

// Fetch a single generic case study page by slug.
export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  projectName,
  "slug": slug.current,
  heroVideoUrl,
  accentColor,
  accentTextColor,
  descriptionParagraphs,
  services,
  "showcaseImages": showcaseImages[]{
    "url": asset->url,
    "alt": coalesce(alt, "")
  }
}`;

// All generic case study slugs — used by generateStaticParams.
export const allCaseStudySlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)]{
  "slug": slug.current
}`;

export const testimonialsQuery = groq`*[_type == "testimonials"][0]{
  ...,
  cards[]{
    ...,
    avatar
  }
}`;

export const faqQuery = groq`*[_type == "faq"][0]`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const problemQuery = groq`*[_type == "problem"][0]`;

export const whyRevQuery = groq`*[_type == "whyRev"][0]`;

export const whatWeBuildQuery = groq`*[_type == "whatWeBuild"][0]`;

export const reelsQuery = groq`*[_type == "reels"][0]`;

export const processQuery = groq`*[_type == "process"][0]`;

export const budgetCtaQuery = groq`*[_type == "budgetCta"][0]`;

export const footerCtaQuery = groq`*[_type == "footerCta"][0]`;

// Fetches the 2 most recent visible posts, excluding the current one.
// Used by the "More from the blog" section on individual post pages.
export const moreBlogPostsQuery = groq`*[_type == "blogPost" && !(isHidden == true) && slug.current != $slug] | order(publishedAt desc)[0...2]{
  title,
  "slug": slug.current,
  category,
  readTime,
  publishedAt,
  excerpt,
  heroImage
}`;

export const blogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  category,
  readTime,
  metaDescription,
  heroImage,
  sections[]{
    intro,
    heading,
    body,
    callout,
    bulletHeading,
    bullets[]{ bold, text }
  },
  ctaDisplayText,
  ctaButtonText,
  ctaButtonUrl
}`;

// Pulls the 3 most recent visible blog posts directly from Blog Posts.
// Filter: isHidden != true  |  Sort: newest first  |  Limit: 3
// !(isHidden == true) safely includes docs where isHidden is null/unset.
// In GROQ: null != true → null (falsy), but !(null == true) → !(false) → true.
export const blogQuery = groq`*[_type == "blogPost" && !(isHidden == true)] | order(publishedAt desc)[0...20]{
  title,
  "slug": slug.current,
  category,
  readTime,
  publishedAt,
  excerpt,
  heroImage
}`;
