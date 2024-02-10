import { type Metadata } from "next";
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
import { getTranslation } from "~/helpers/translation.server";
import { queryPost } from "~/queries/query-post";
import { queryPostMarkdown } from "~/queries/query-post-markdown";
import { JsonLd } from "./json-ld";
import css from "./page.module.css";

interface PageParameters {
  slug: string;
}

async function generateMetadata({
  params: { slug },
}: {
  params: PageParameters;
}): Promise<Metadata> {
  const post = await queryPost({ slug, fallback: true });

  return {
    title: post?.title,
    description: post?.summary,
    category: "technology",
    generator: "Next.js",
    applicationName: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: post?.keywords,
    authors: [{ name: post?.createdBy.name, url: "" }],
    creator: "Kohei Asai",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

async function Page({
  params: { slug },
}: {
  params: PageParameters;
}): Promise<JSX.Element> {
  const [post, markdown, { t }] = await Promise.all([
    queryPost({ slug, fallback: true }),
    queryPostMarkdown({ slug, fallback: true }),
    getTranslation("posts"),
  ]);

  if (post === null || markdown === null) {
    notFound();
  }

  return (
    <>
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
                {t("Last edited on {{date}}", {
                  date: new Intl.DateTimeFormat().format(post.lastEditedAt),
                })}
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

      <JsonLd post={post} />
    </>
  );
}

export { generateMetadata };
export default Page;
