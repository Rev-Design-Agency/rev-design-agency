import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroReveal from "@/components/HeroReveal";
import Reels from "@/components/Reels";
import Problem from "@/components/Problem";
import StackedCards from "@/components/StackedCards";
import WhyRev from "@/components/WhyRev";
import Story from "@/components/Story";
import Portfolio from "@/components/Portfolio";
// import CaseStudies from "@/components/CaseStudies"; // hidden until approved
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Process from "@/components/Process";
import BudgetCTA from "@/components/BudgetCTA";
import FAQ from "@/components/FAQ";
import FooterCTA from "@/components/FooterCTA";
import { client } from "@/sanity/lib/client";
import {
  heroQuery,
  storyQuery,
  portfolioQuery,
  testimonialsQuery,
  faqQuery,
  siteSettingsQuery,
  problemQuery,
  whyRevQuery,
  whatWeBuildQuery,
  reelsQuery,
  processQuery,
  budgetCtaQuery,
  footerCtaQuery,
  blogQuery,
} from "@/sanity/lib/queries";

export const revalidate = 10;

export default async function Home() {
  const [
    hero,
    story,
    portfolio,
    testimonials,
    faq,
    siteSettings,
    problem,
    whyRev,
    whatWeBuild,
    reels,
    process,
    budgetCta,
    footerCta,
    blog,
  ] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(storyQuery),
    client.fetch(portfolioQuery),
    client.fetch(testimonialsQuery),
    client.fetch(faqQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(problemQuery),
    client.fetch(whyRevQuery),
    client.fetch(whatWeBuildQuery),
    client.fetch(reelsQuery),
    client.fetch(processQuery),
    client.fetch(budgetCtaQuery),
    client.fetch(footerCtaQuery),
    client.fetch(blogQuery),
  ]);

  return (
    <main>
      <Navbar siteSettings={siteSettings} />
      <HeroReveal>
        <Hero data={hero} />
      </HeroReveal>
      <Problem data={problem} />
      <StackedCards />
      <WhyRev data={whyRev} />
      <Story data={story} />
      <Portfolio data={portfolio} />
      {/* <CaseStudies /> — hidden until approved */}
      <Testimonials data={testimonials} />
      <Process data={process} />
      <Blog data={blog} showArrows={siteSettings?.showBlogArrows !== false} />
      <BudgetCTA data={budgetCta} siteSettings={siteSettings} />
      <Reels data={reels} />
      <FAQ data={faq} />
      <FooterCTA data={footerCta} siteSettings={siteSettings} />
    </main>
  );
}
