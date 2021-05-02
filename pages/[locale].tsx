import { css } from "@linaria/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { PromiseValue } from "type-fest";
import { getIndexPageJson, getPostEntryListJson } from "../adapters/cms";
import { fetchTranslationDictionary } from "../adapters/translation";
import { Article } from "../components/article";
import { AsideNavigation } from "../components/aside-navigation";
import {
  TwoColumnPageLayout,
  TwoColumnPageLayoutAside,
  TwoColumnPageLayoutFooter,
  TwoColumnPageLayoutMain,
} from "../components/page-layout";
import { WEBSITE_NAME } from "../constants/app";
import { CommonServerSideProps } from "../core/ssr-props";
import { isDevelopment } from "../helpers/app";
import { getLocales } from "../helpers/localization";
import { useRouter } from "../hooks/router";
import { useUserMonitoring } from "../hooks/user-monitoring";

interface ServerSideProps extends CommonServerSideProps {
  indexPage: NonNullable<PromiseValue<ReturnType<typeof getIndexPageJson>>>;
  posts: PromiseValue<ReturnType<typeof getPostEntryListJson>>;
}

const Page: NextPage<ServerSideProps> = (props) => {
  const { trackUiEvent } = useUserMonitoring();
  const { url, locale, alternativeLocales } = useRouter();
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
        <meta property="og:url" content={`${url.origin}${url.pathname}`} />
        <meta property="og:site_name" content={WEBSITE_NAME} />
        <meta property="og:title" content={WEBSITE_NAME} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content={locale} />
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
            body={body}
            className={css`
              > img {
                object-position: top right;
              }
            `}
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
}> = async () => {
  const locales = getLocales();

  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  ServerSideProps,
  { locale: string }
> = async ({ params }) => {
  if (!getLocales().includes(params!.locale)) {
    return {
      notFound: true,
    };
  }

  const [intlMessages, posts, indexPage] = await Promise.all([
    fetchTranslationDictionary(params!.locale),
    getPostEntryListJson({ locale: params!.locale }),
    getIndexPageJson({ locale: params!.locale }),
  ]);

  return {
    props: { intlMessages, indexPage, posts },
    revalidate: isDevelopment() ? 1 : 60 * 60,
  };
};

export default Page;
