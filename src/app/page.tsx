import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { type JSX } from "react";
import { Image } from "~/components/image";
import { LocaleNotFoundCallout } from "~/components/locale-not-found-callout";
import { Markdown } from "~/components/markdown";
import { SideNavigation } from "~/components/side-navigation";
import {
  TwoColumnLayout,
  TwoColumnLayoutAside,
  TwoColumnLayoutMain,
} from "~/components/two-column-layout";
import { getConfig } from "~/helpers/config";
import { queryBio } from "~/queries/query-bio";
import { queryBioMarkdown } from "~/queries/query-bio-markdown";
import { JsonLd } from "./json-ld";
import css from "./page.module.css";

// eslint-disable-next-line import/group-exports
export const runtime = "edge";

async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  const bio = await queryBio({ fallback: true });

  return {
    title: config.website.title,
    description: bio?.summary,
    category: "technology",
    generator: "Next.js",
    applicationName: config.website.title,
    referrer: "origin-when-cross-origin",
    creator: "Kohei Asai",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

async function Page(): Promise<JSX.Element> {
  const bio = await queryBio({ fallback: true });
  const markdown = await queryBioMarkdown({ fallback: true });

  if (bio === null || markdown === null) {
    notFound();
  }

  return (
    <>
      <TwoColumnLayout>
        <TwoColumnLayoutMain>
          <Image
            src={bio.coverImageUrl.toString()}
            alt={bio.title}
            width={2048}
            height={1170}
            className={css.thumbnail}
          />

          <h1 className={css.title}>{bio.title}</h1>

          <LocaleNotFoundCallout
            locale={bio.locale}
            className={css["locale-not-found"]}
          />

          <Markdown className={css.markdown} asChild markdown={markdown}>
            {(renderProps) => {
              return <article {...renderProps} />;
            }}
          </Markdown>
        </TwoColumnLayoutMain>

        <TwoColumnLayoutAside>
          <SideNavigation bio markdown={markdown} />
        </TwoColumnLayoutAside>
      </TwoColumnLayout>

      <JsonLd bio={bio} />
    </>
  );
}

export { generateMetadata };
export default Page;
