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
import { queryBio } from "~/queries/query-bio";
import { queryBioMarkdown } from "~/queries/query-bio-markdown";
import css from "./page.module.css";

async function Page(): Promise<JSX.Element> {
  const bio = await queryBio({ fallback: true });
  const markdown = await queryBioMarkdown({ fallback: true });

  if (bio === null || markdown === null) {
    notFound();
  }

  return (
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
  );
}

export default Page;
