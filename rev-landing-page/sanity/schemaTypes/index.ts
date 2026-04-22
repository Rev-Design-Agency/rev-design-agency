import { type SchemaTypeDefinition } from "sanity";
import { heroType } from "./hero";
import { storyType } from "./story";
import { portfolioType } from "./portfolio";
import { testimonialsType } from "./testimonials";
import { faqType } from "./faq";
import { siteSettingsType } from "./siteSettings";
import { problemType } from "./problem";
import { whyRevType } from "./whyRev";
import { whatWeBuildType } from "./whatWeBuild";
import { reelsType } from "./reels";
import { processType } from "./process";
import { budgetCtaType } from "./budgetCta";
import { footerCtaType } from "./footerCta";
import { blogPostType } from "./blogPost";
import { elveCaseType } from "./elveCase";
import { oathnetCaseType } from "./oathnetCase";
import { caseStudyType } from "./caseStudy";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType,
    storyType,
    portfolioType,
    testimonialsType,
    faqType,
    siteSettingsType,
    problemType,
    whyRevType,
    whatWeBuildType,
    reelsType,
    processType,
    budgetCtaType,
    footerCtaType,
    blogPostType,
    elveCaseType,
    oathnetCaseType,
    caseStudyType,
  ],
};
