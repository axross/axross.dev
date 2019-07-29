import * as React from "react";
import useMyself from "../hooks/useMyself";
import useSelfUrl from "../hooks/useSelfUrl";
import useTranslation from "../hooks/useTranslation";
import Head from "./head/Head";

function BlogPostMeta() {
  const myself = useMyself();
  const url = useSelfUrl();
  const translation = useTranslation();

  const canonicalUrl = new URL(url.href);

  canonicalUrl.searchParams.forEach((value, key) => {
    if (key !== "hl" || value !== "ja-JP") {
      canonicalUrl.searchParams.delete(key);
    }
  });

  const linkingData = {
    "@context": "https://schema.org",
    "@type": "Person",
    url: canonicalUrl,
    name: translation["person_name"](myself),
    image: url.origin + "/static/profile.jpg",
    jobTitle: myself.jobTitle,
    sameAs: myself.socialLinks.map(({ url }) => url)
  };

  return (
    <Head
      person={myself}
      type="profile"
      canonicalUrl={canonicalUrl}
      title={translation["website.title"](myself)}
      description={translation["website.description"](myself)}
      linkingData={linkingData}
    />
  );
}

export default BlogPostMeta;
