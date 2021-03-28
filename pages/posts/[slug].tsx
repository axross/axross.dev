import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useIntl } from "react-intl";
import { PromiseValue } from "type-fest";
import { Article } from "../../components/article";
import { AsideNavigation } from "../../components/aside-navigation";
import {
  TwoColumnPageLayout,
  TwoColumnPageLayoutAside,
  TwoColumnPageLayoutFooter,
  TwoColumnPageLayoutMain,
} from "../../components/page-layout";
import { WEBSITE_NAME } from "../../constants/app";
import { CACHE_HEADER_VALUE } from "../../constants/cache";
import { AVAILABLE_LOCALES } from "../../constants/locale";
import { CommonServerSideProps } from "../../core/ssr-props";
import { useOrigin } from "../../global-hooks/url";
import {
  getBestMatchedLocaleOrFallbackFromLanguageRange,
  getLocaleFromQuery,
} from "../../helpers/i18n";
import { getOriginFromRequest } from "../../helpers/next";
import { getPostEntryListJson, getPostJson } from "../../services/cms-json";
import { getIntlMessages } from "../../services/translation";

interface ServerSideProps extends CommonServerSideProps {
  post: NonNullable<PromiseValue<ReturnType<typeof getPostJson>>>;
  posts: PromiseValue<ReturnType<typeof getPostEntryListJson>>;
}

const Page: NextPage<ServerSideProps> = (props) => {
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

      <TwoColumnPageLayout>
        <TwoColumnPageLayoutMain>
          <Article
            title={title}
            coverImageUrl={coverImageUrl}
            tags={tags}
            lastPublishedAt={lastPublishedAt}
            author={author}
            body={body}
          />
        </TwoColumnPageLayoutMain>

        <TwoColumnPageLayoutAside>
          <AsideNavigation posts={posts} tableOfContents={tableOfContents} />
        </TwoColumnPageLayoutAside>

        <TwoColumnPageLayoutFooter />
      </TwoColumnPageLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  query,
  params,
}) => {
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
    const redirectLocale = getBestMatchedLocaleOrFallbackFromLanguageRange(
      req.headers["accept-language"] ?? ""
    );

    return {
      redirect: {
        destination: `/posts/${slug}?hl=${redirectLocale}`,
        permanent: true,
      },
    };
  }

  const origin = getOriginFromRequest(req);
  const [intlMessages, posts, post] = await Promise.all([
    getIntlMessages({ locale }),
    getPostEntryListJson({ locale, previewToken }),
    getPostJson({ slug, locale, previewToken }),
  ]);

  if (post === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { origin, locale, intlMessages, post, posts },
  };
};

export default Page;
