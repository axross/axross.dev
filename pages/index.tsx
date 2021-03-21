import { css } from "@linaria/core";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useIntl } from "react-intl";
import { PromiseValue } from "type-fest";
import { LocaleSwitcher } from "../components/locale-switcher";
import { Markdown } from "../components/markdown-article";
import { PostList, PostListItem } from "../components/post-list";
import {
  TableOfContents,
  TableOfContentsItem,
} from "../components/table-of-contents";
import { WEBSITE_NAME } from "../constants/app";
import { CACHE_HEADER_VALUE } from "../constants/cache";
import { AVAILABLE_LOCALES } from "../constants/locale";
import { CommonServerSideProps } from "../core/ssr-props";
import { useOrigin } from "../global-hooks/url";
import { getLocaleFromQuery } from "../helpers/i18n";
import { getOriginFromRequest } from "../helpers/next";
import { getIndexPageJson, getPostEntryListJson } from "../services/cms-json";
import { getIntlMessages } from "../services/translation";

const Page: NextPage<
  CommonServerSideProps & {
    indexPage: NonNullable<PromiseValue<ReturnType<typeof getIndexPageJson>>>;
    posts: PromiseValue<ReturnType<typeof getPostEntryListJson>>;
  }
> = (props) => {
  const intl = useIntl();
  const origin = useOrigin();
  const {
    title,
    description,
    coverImageUrl,
    tableOfContents,
    body,
  } = props.indexPage;
  const posts = React.useMemo(
    () =>
      props.posts.map((post) => ({
        ...post,
        firstPublishedAt: new Date(post.firstPublishedAt),
        lastPublishedAt: new Date(post.lastPublishedAt),
      })),
    [props.posts]
  );

  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="kohei asai,axross,blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${origin}/?hl=${intl.locale}`} />
        <meta property="og:site_name" content={WEBSITE_NAME} />
        <meta property="og:title" content={WEBSITE_NAME} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content={intl.locale} />
        {AVAILABLE_LOCALES.filter((l) => l !== intl.locale).map((l) => (
          <meta property="og:locale:alternate" content={l} key={l} />
        ))}
        <meta property="og:image" content={coverImageUrl} />
        <meta property="og:image:secure_url" content={coverImageUrl} />
      </Head>

      <div
        className={css`
          padding-block-end: calc(var(--space-xxl) * 2);

          @media screen and (max-width: 1248px) {
            margin-inline-start: 0;
            margin-inline-end: 0;
            padding-inline-start: 0;
            padding-inline-end: 0;
          }
        `}
      >
        <div
          className={css`
            position: relative;
            display: grid;
            grid-template-columns: 768px calc(320px + var(--space-md) * 2);
            grid-template-areas: "main nav";
            column-gap: calc(var(--space-xxl) - var(--space-md));
            justify-content: center;
            padding-inline-start: calc(var(--space-xl) - var(--space-md));
            padding-inline-end: calc(var(--space-xl) - var(--space-md));

            @media screen and (max-width: 1248px) {
              grid-template-columns: 100%;
              grid-template-areas: "main" "nav-hr" "nav";
              justify-content: stretch;
              padding-inline-start: 0;
              padding-inline-end: 0;
            }
          `}
        >
          <main
            className={css`
              grid-area: main;
            `}
          >
            <article className="post">
              <img
                src={coverImageUrl}
                alt={title}
                className={css`
                  width: 100%;
                  height: 320px;
                  object-fit: cover;
                  object-position: top right;
                `}
              />

              <h1
                className={css`
                  margin-block-end: 0.5rem;
                  line-height: 1.5;
                  display: block;
                  margin-block-start: var(--space-xl);
                  margin-block-end: 0;
                  color: var(--color-fg-strong);
                  font-size: var(--font-size-xxl);
                  font-weight: bold;

                  @media screen and (max-width: 1248px) {
                    padding-inline-start: var(--space-md);
                    padding-inline-end: var(--space-md);
                  }
                `}
                data-testid="article-title"
              >
                {title}
              </h1>

              <Markdown
                markdown={body}
                className={css`
                  margin-block-start: var(--space-xl);

                  @media screen and (max-width: 1248px) {
                    padding-inline-start: var(--space-md);
                    padding-inline-end: var(--space-md);
                  }
                `}
              />
            </article>
          </main>

          <hr
            className={css`
              grid-area: nav-hr;
              display: none;
              width: 100%;
              height: 0;
              margin-block-start: var(--space-xl);
              margin-block-end: 0;
              background: linear-gradient(
                to right,
                transparent,
                #8180787f,
                transparent
              );
              border: none;
              outline: none;

              @media screen and (max-width: 1248px) {
                display: block;
                height: 1px;
              }
            `}
          />

          <aside
            className={css`
              grid-area: nav;
              align-self: flex-start;
              position: sticky;
              top: 0;
              padding-block-start: var(--space-lg);
              padding-block-end: var(--space-lg);
              padding-inline-start: var(--space-md);
              padding-inline-end: var(--space-md);
              overflow-y: scroll;

              @media screen and (max-width: 1248px) {
                position: static;
                width: 100%;
                height: auto;
                margin-block-start: var(--space-xl);
                padding-block-start: 0;
                padding-block-end: 0;
                padding-inline-start: var(--space-md);
                padding-inline-end: var(--space-md);
                overflow-y: auto;
              }
            `}
          >
            <LocaleSwitcher
              className={css`
                justify-content: flex-end;
              `}
            />

            <PostList
              className={css`
                margin-block-start: var(--space-xl);
              `}
            >
              <PostListItem
                href="/"
                as="/"
                tableOfContents={
                  <TableOfContents>
                    {tableOfContents.map(({ id, level, text }) => (
                      <TableOfContentsItem targetId={id} level={level} key={id}>
                        {text}
                      </TableOfContentsItem>
                    ))}
                  </TableOfContents>
                }
              >
                {title}
              </PostListItem>

              {posts.map((p) => (
                <PostListItem
                  href="/posts/[slug]"
                  as={`/posts/${p.slug}`}
                  key={p.slug}
                >
                  {p.title}
                </PostListItem>
              ))}
            </PostList>
          </aside>
        </div>

        <hr
          className={css`
            grid-area: footer-hr;
            width: 100%;
            height: 1px;
            margin-block-start: var(--space-xl);
            margin-block-end: 0;
            background: linear-gradient(
              to right,
              transparent,
              #8180787f,
              transparent
            );
            border: none;
            outline: none;
          `}
        />

        <footer
          className={css`
            margin-block-start: var(--space-xl);
            font-size: var(--font-size-sm);
            text-align: center;
          `}
        >
          {intl.formatMessage({
            defaultMessage: "kohei.dev is open source project.",
          })}
        </footer>
      </div>
    </>
  );
};

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const locale = getLocaleFromQuery(query);
  const previewToken = query!.preview_token
    ? `${query!.preview_token}`
    : undefined;

  if (!previewToken) {
    // WORKAROUND:
    // it needs to manually set this here
    // since vercel doesn't use cache-control header specified in any of next.config.js or vercel.json
    res.setHeader("cache-control", CACHE_HEADER_VALUE);
  }

  if (!locale) {
    return { redirect: { destination: `/?hl=en-US`, permanent: true } };
  }

  const origin = getOriginFromRequest(req);
  const intlMessages = await getIntlMessages({ locale });
  const posts = await getPostEntryListJson({ locale, previewToken });
  const indexPage = await getIndexPageJson({ locale, previewToken });

  return {
    props: { origin, locale, intlMessages, indexPage, posts },
  };
}

export default Page;
