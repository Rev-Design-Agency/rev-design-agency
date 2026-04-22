import { client } from "@/sanity/lib/client";
import { blogPostQuery, moreBlogPostsQuery, siteSettingsQuery, footerCtaQuery } from "@/sanity/lib/queries";
import Navbar from "@/components/Navbar";
import BlogPostContent from "@/components/BlogPostContent";
import MoreBlogPosts from "@/components/MoreBlogPosts";
import FooterCTA from "@/components/FooterCTA";

export const revalidate = 10;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, morePosts, siteSettings, footerCta] = await Promise.all([
    client.fetch(blogPostQuery, { slug }),
    client.fetch(moreBlogPostsQuery, { slug }),
    client.fetch(siteSettingsQuery),
    client.fetch(footerCtaQuery),
  ]);

  return (
    <>
      <Navbar siteSettings={siteSettings} />
      <BlogPostContent post={post ?? {}} slug={slug} />
      <MoreBlogPosts currentSlug={slug} posts={morePosts ?? []} />
      <FooterCTA data={footerCta} siteSettings={siteSettings} />
    </>
  );
}
