import { css } from "@linaria/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import {
  generateMarkdown,
  generateTableOfContents,
  parseMarkdown,
} from "../adapters/markdown-processing";
import { getAllPosts } from "../adapters/post-repository";
import { fetchTranslationDictionary } from "../adapters/translation";
import { Article } from "../components/article";
import { AsideNavigation } from "../components/aside-navigation";
import {
  TwoColumnPageLayout,
  TwoColumnPageLayoutAside,
  TwoColumnPageLayoutFooter,
  TwoColumnPageLayoutMain,
} from "../components/page-layout";
import {
  WEBSITE_DESCRIPTION_EN_US,
  WEBSITE_DESCRIPTION_JA_JP,
  WEBSITE_NAME,
} from "../constants/app";
import { AUTHOR_NAME } from "../constants/author";
import {
  INDEX_MARKDOWN_BODY_EN_US,
  INDEX_MARKDOWN_BODY_JA_JP,
} from "../constants/index-page";
import { CommonServerSideProps } from "../core/ssr-props";
import { isDevelopment } from "../helpers/app";
import { getLocales } from "../helpers/localization";
import { useRouter } from "../hooks/router";
import { useUserMonitoring } from "../hooks/user-monitoring";

interface ServerSideProps extends CommonServerSideProps {
  body: string;
  tableOfContents: { id: string; level: number; text: string }[];
  posts: { slug: string; title: string }[];
}

const Page: NextPage<ServerSideProps> = ({ body, tableOfContents, posts }) => {
  const { trackUiEvent } = useUserMonitoring();
  const { url, locale, alternativeLocales } = useRouter();
  const description =
    locale === "ja-jp" ? WEBSITE_DESCRIPTION_JA_JP : WEBSITE_DESCRIPTION_EN_US;

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
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:image:secure_url" content="/profile.jpg" />
      </Head>

      <TwoColumnPageLayout>
        <TwoColumnPageLayoutMain>
          <Article
            title={AUTHOR_NAME}
            coverImageUrl="/profile.jpg"
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

  const [intlMessages, posts] = await Promise.all([
    fetchTranslationDictionary(params!.locale),
    getAllPosts({ locale: params!.locale }),
  ]);

  const markdown =
    params!.locale === "ja-jp"
      ? INDEX_MARKDOWN_BODY_JA_JP
      : INDEX_MARKDOWN_BODY_EN_US;
  const ast = await parseMarkdown(markdown);

  return {
    props: {
      intlMessages,
      body: generateMarkdown(ast),
      tableOfContents: generateTableOfContents(ast),
      posts: posts.map((p) => ({ slug: p.slug, title: p.title })),
    },
    revalidate: isDevelopment() ? 1 : 60 * 60,
  };
};

export default Page;
