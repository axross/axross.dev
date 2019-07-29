import * as React from "react";
import BlogPost from "../../entities/BlogPost";
import useMyself from "../hooks/useMyself";
import useSelfUrl from "../hooks/useSelfUrl";
import useTranslation from "../hooks/useTranslation";
import Head from "./head/Head";

interface Props {
  blogPost: BlogPost;
}

function BlogPostHead({ blogPost }: Props) {
  const url = useSelfUrl();
  const translation = useTranslation();
  const myself = useMyself();

  const canonicalUrl = new URL(url.href);

  canonicalUrl.searchParams.forEach((value, key) => {
    if (key !== "hl" || value !== "ja-JP") {
      canonicalUrl.searchParams.delete(key);
    }
  });

  const contentHolderLinkingData = {
    "@type": "Person",
    name: translation["person_name"](myself),
    image: url.origin + "/static/profile.jpg",
    jobTitle: myself.jobTitle,
    sameAs: myself.socialLinks.map(({ url }) => url)
  };

  const linkingData = {
    "@context": "https://schema.org",
    "@type": "BlogBlogPosting",
    url: canonicalUrl,
    name: blogPost.title,
    headline: blogPost.title,
    description: blogPost.summary,
    thumbnailUrl: url.origin + "/static/profile.jpg",
    image: url.origin + "/static/profile.jpg",
    myself: contentHolderLinkingData,
    copyrightHolder: contentHolderLinkingData,
    copyrightYear: "2019",
    dateCreated: blogPost.createdAt.toISOString(),
    datePublished: blogPost.createdAt.toISOString(),
    dateModified: blogPost.lastModifiedAt.toISOString(),
    mainEntityOfPage: canonicalUrl.href
  };

  return (
    <Head
      person={myself}
      type="article"
      canonicalUrl={canonicalUrl}
      title={translation["website.title_blog_post"](blogPost, myself)}
      description={blogPost.summary}
      linkingData={linkingData}
    />
  );
}

export default BlogPostHead;
