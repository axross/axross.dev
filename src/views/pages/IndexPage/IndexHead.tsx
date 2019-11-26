import IntlMessageFormat from "intl-messageformat";
import * as React from "react";
import useMyself from "../../hooks/useMyself";
import useSelfUrl from "../../hooks/useSelfUrl";
import useTranslation from "../../hooks/useTranslation";
import Head from "../../components/Head";

export default function BlogPostMeta() {
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
    name: myself.name,
    image: url.origin + "/static/profile.jpg",
    jobTitle: myself.jobTitle,
    sameAs: myself.socialLinks.map(({ url }) => url)
  };

  return (
    <Head
      type="profile"
      canonicalUrl={canonicalUrl}
      title={new IntlMessageFormat(translation["website.title"]).format({
        name: myself.name,
        screenName: myself.screenName
      })}
      description={new IntlMessageFormat(
        translation["website.description"]
      ).format({ name: myself.name, screenName: myself.screenName })}
      linkingData={linkingData}
    />
  );
}
