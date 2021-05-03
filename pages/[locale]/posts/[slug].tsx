import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from "next";
import Head from "next/head";
import * as React from "react";
import { useIntl } from "react-intl";
import { PromiseValue } from "type-fest";
import { getPostEntryListJson, getPostJson } from "../../../adapters/cms";
import { fetchTranslationDictionary } from "../../../adapters/translation";
import { Article } from "../../../components/article";
import { AsideNavigation } from "../../../components/aside-navigation";
import {
  TwoColumnPageLayout,
  TwoColumnPageLayoutAside,
  TwoColumnPageLayoutFooter,
  TwoColumnPageLayoutMain,
} from "../../../components/page-layout";
import { WEBSITE_NAME } from "../../../constants/app";
import { CommonServerSideProps } from "../../../core/ssr-props";
import { isDevelopment } from "../../../helpers/app";
import { getLocales } from "../../../helpers/localization";
import { useRouter } from "../../../hooks/router";
import { useUserMonitoring } from "../../../hooks/user-monitoring";

interface ServerSideProps extends CommonServerSideProps {
  post: NonNullable<PromiseValue<ReturnType<typeof getPostJson>>>;
  posts: PromiseValue<ReturnType<typeof getPostEntryListJson>>;
}

const Page: NextPage<ServerSideProps> = (props) => {
  const { trackUiEvent } = useUserMonitoring();
  const { url, alternativeLocales } = useRouter();
  const intl = useIntl();
  const {
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
        <meta property="og:url" content={`${url.origin}${url.pathname}`} />
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
        {alternativeLocales.map((l) => (
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
            shareUrl={`${url.origin}${url.pathname}`}
            onShareBalloonButtonClick={(_, { type }) =>
              trackUiEvent(`click_balloon_${type}_share_button`)
            }
          />
        </TwoColumnPageLayoutMain>

        <TwoColumnPageLayoutAside
          onFloatingSidebarButtonClick={(_, isMenuOpen) =>
            trackUiEvent(isMenuOpen ? "open_aside" : "close_aside", 1)
          }
        >
          <AsideNavigation posts={posts} tableOfContents={tableOfContents} />
        </TwoColumnPageLayoutAside>

        <TwoColumnPageLayoutFooter />
      </TwoColumnPageLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{
  locale: string;
  slug: string;
}> = async () => {
  const locales = getLocales();
  const paths: GetStaticPathsResult<{
    locale: string;
    slug: string;
  }>["paths"] = [];

  for (const locale of locales!) {
    const postEntryList = await getPostEntryListJson({ locale: locale });

    for (const postEntry of postEntryList) {
      paths.push({
        params: { locale, slug: postEntry.slug },
      });
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ServerSideProps,
  { locale: string; slug: string }
> = async ({ params }) => {
  if (!getLocales().includes(params!.locale)) {
    return {
      notFound: true,
    };
  }

  const [intlMessages, posts, post] = await Promise.all([
    fetchTranslationDictionary(params!.locale),
    getPostEntryListJson({ locale: params!.locale }),
    getPostJson({ slug: params!.slug, locale: params!.locale }),
  ]);

  if (post === null) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: { intlMessages, post, posts },
    revalidate: isDevelopment() ? 1 : 60 * 60,
  };
};

export default Page;
