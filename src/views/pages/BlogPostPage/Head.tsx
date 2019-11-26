import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import BlogPost from "../../../entities/BlogPost";
import useMyself from "../../hooks/useMyself";
import useSelfUrl from "../../hooks/useSelfUrl";
import useTranslation from "../../hooks/useTranslation";
import Head from "../../components/Head";

interface Props {
  blogPost: BlogPost;
}

export default function BlogPostHead({ blogPost }: Props) {
  const url = useSelfUrl();
  const translation = useTranslation();
  const canonicalUrl = new URL(url.href);
  const myself = useMyself();

  canonicalUrl.searchParams.forEach((value, key) => {
    if (key !== "hl" || value !== "ja-JP") {
      canonicalUrl.searchParams.delete(key);
    }
  });

  const contentHolderLinkingData = {
    "@type": "Person",
    name: myself.name,
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
      type="article"
      canonicalUrl={canonicalUrl}
      title={new IntlMessageFormat(
        translation["website.title_blog_post"]
      ).format({
        title: blogPost.title,
        name: myself.name,
        screenName: myself.screenName
      })}
      description={blogPost.summary}
      linkingData={linkingData}
    />
  );
}
