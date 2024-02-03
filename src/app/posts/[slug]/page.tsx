import { notFound } from "next/navigation";
import { type JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/avatar";
import { Image } from "~/components/image";
import { LocaleNotFoundCallout } from "~/components/locale-not-found-callout";
import { Markdown } from "~/components/markdown";
import { SideNavigation } from "~/components/side-navigation";
import {
  TwoColumnLayout,
  TwoColumnLayoutAside,
  TwoColumnLayoutMain,
} from "~/components/two-column-layout";
import { queryPost } from "~/queries/query-post";
import { queryPostMarkdown } from "~/queries/query-post-markdown";
import css from "./page.module.css";

interface PageParameters {
  slug: string;
}

async function Page({
  params: { slug },
}: {
  params: PageParameters;
}): Promise<JSX.Element> {
  const post = await queryPost({ slug, fallback: true });
  const markdown = await queryPostMarkdown({ slug, fallback: true });

  if (post === null || markdown === null) {
    notFound();
  }

  return (
    <TwoColumnLayout>
      <TwoColumnLayoutMain>
        <Image
          src={post.coverImageUrl.toString()}
          alt={post.title}
          width={1280}
          height={800}
          className={css.thumbnail}
        />

        <h1 className={css.title}>{post.title}</h1>

        <div className={css.meta}>
          <Avatar className={css.avatar}>
            <AvatarImage src={post.createdBy.avatarImageUrl.toString()} />

            <AvatarFallback>{post.createdBy.name}</AvatarFallback>
          </Avatar>

          <div className={css["name-and-date"]}>
            <div>{post.createdBy.name}</div>

            <div className={css.date}>
              {`Last edited on ${new Intl.DateTimeFormat().format(
                post.lastEditedAt,
              )}`}
            </div>
          </div>
        </div>

        <LocaleNotFoundCallout
          locale={post.locale}
          className={css["locale-not-found"]}
        />

        <Markdown className={css.markdown} asChild markdown={markdown}>
          {(renderProps) => {
            return <article {...renderProps} />;
          }}
        </Markdown>
      </TwoColumnLayoutMain>

      <TwoColumnLayoutAside>
        <SideNavigation postSlug={slug} markdown={markdown} />
      </TwoColumnLayoutAside>
    </TwoColumnLayout>
  );
}

export default Page;
