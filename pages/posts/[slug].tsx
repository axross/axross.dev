import { css } from "@linaria/core";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useIntl } from "react-intl";
import { PromiseValue } from "type-fest";
import { Badge } from "../../components/badge";
import { HorizontalList } from "../../components/layout";
import { LocaleSwitcher } from "../../components/locale-switcher";
import { Markdown } from "../../components/markdown-article";
import { PostList, PostListItem } from "../../components/post-list";
import {
  TableOfContents,
  TableOfContentsItem,
} from "../../components/table-of-contents";
import { WEBSITE_NAME } from "../../constants/app";
import { CACHE_HEADER_VALUE } from "../../constants/cache";
import { AVAILABLE_LOCALES } from "../../constants/locale";
import { CommonServerSideProps } from "../../core/ssr-props";
import { useOrigin } from "../../global-hooks/url";
import { getLocaleFromQuery } from "../../helpers/i18n";
import { getOriginFromRequest } from "../../helpers/next";
import { getPostEntryListJson, getPostJson } from "../../services/cms-json";
import { getIntlMessages } from "../../services/translation";

const Page: NextPage<
  CommonServerSideProps & {
    post: NonNullable<PromiseValue<ReturnType<typeof getPostJson>>>;
    posts: PromiseValue<ReturnType<typeof getPostEntryListJson>>;
  }
> = (props) => {
  const origin = useOrigin();
  const intl = useIntl();
  const {
    slug,
    title,
    description,
    coverImageUrl,
    tags,
    author,
    firstPublishedAt,
    lastPublishedAt,
    tableOfContents,
    body,
  } = React.useMemo(() => {
    return {
      ...props.post,
      firstPublishedAt: new Date(props.post.firstPublishedAt),
      lastPublishedAt: new Date(props.post.lastPublishedAt),
    };
  }, [props.post]);
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
        <title>
          {title} - {WEBSITE_NAME}
        </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags.join(",")} />
        <meta name="author" content={author.name} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${origin}/posts/${slug}?hl=${intl.locale}`}
        />
        <meta property="og:site_name" content={WEBSITE_NAME} />
        <meta property="og:title" content={`${title} - ${WEBSITE_NAME}`} />
        <meta property="og:description" content={description} />
        <meta
          property="og:author:first_name"
          content={author.name.split(" ")[0]}
        />
        <meta
          property="og:author:last_name"
          content={author.name.split(" ")[1]}
        />
        {tags.length >= 1 ? (
          <meta property="og:section" content={tags[tags.length - 1]} />
        ) : null}
        {tags.map((tag: string) => (
          <meta property="og:tag" content={tag} key={tag} />
        ))}
        <meta
          property="og:published_time"
          content={firstPublishedAt.toISOString()}
        />
        <meta
          property="og:modified_time"
          content={lastPublishedAt.toISOString()}
        />
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
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt={title}
                  className={css`
                    width: 100%;
                    height: 320px;
                    object-fit: cover;
                    object-position: center;
                  `}
                />
              ) : null}

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

              <aside
                className={css`
                  margin-block-start: var(--space-xl);

                  @media screen and (max-width: 1248px) {
                    padding-inline-start: var(--space-md);
                    padding-inline-end: var(--space-md);
                  }
                `}
              >
                <div
                  className={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <img
                    src={author.avatarUrl}
                    className={css`
                      width: 64px;
                      height: 64px;
                      border-radius: 100%;
                      user-select: none;
                    `}
                  />

                  <div
                    className={css`
                      margin-inline-start: var(--space-md);
                    `}
                  >
                    <div>{author.name}</div>

                    <div
                      className={css`
                        margin-block-start: var(--space-xs);
                        font-size: var(--font-size-xs);
                      `}
                    >
                      {"Last modified at "}
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(lastPublishedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <HorizontalList
                  columnGap="var(--space-sm)"
                  className={css`
                    margin-block-start: var(--space-md);
                  `}
                >
                  {tags.map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </HorizontalList>
              </aside>

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
              <PostListItem href="/" as="/">
                {intl.formatMessage({ defaultMessage: "About" })}
              </PostListItem>

              {posts.map((p) => (
                <PostListItem
                  href="/posts/[slug]"
                  as={`/posts/${p.slug}`}
                  tableOfContents={
                    p.slug === slug ? (
                      <TableOfContents>
                        {tableOfContents.map(({ id, level, text }) => (
                          <TableOfContentsItem
                            targetId={id}
                            level={level}
                            key={id}
                          >
                            {text}
                          </TableOfContentsItem>
                        ))}
                      </TableOfContents>
                    ) : undefined
                  }
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
            defaultMessage: "this webpage is part of an open source project.",
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
  params,
}: GetServerSidePropsContext) {
  const slug = `${params!.slug}`;
  const previewToken = query!.preview_token
    ? `${query!.preview_token}`
    : undefined;
  const locale = getLocaleFromQuery(query);

  if (!previewToken) {
    // WORKAROUND:
    // it needs to manually set this here
    // since vercel doesn't use cache-control header specified in any of next.config.js or vercel.json
    res.setHeader("cache-control", CACHE_HEADER_VALUE);
  }

  if (!locale) {
    return {
      redirect: { destination: `/posts/${slug}?hl=en-US`, permanent: true },
    };
  }

  const origin = getOriginFromRequest(req);
  const intlMessages = await getIntlMessages({ locale });

  const posts = await getPostEntryListJson({ locale, previewToken });
  const post = await getPostJson({ slug, locale, previewToken });

  if (post === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { origin, locale, intlMessages, post, posts },
  };
}

export default Page;
