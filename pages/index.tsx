import { css } from "@linaria/core";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useIntl } from "react-intl";
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
import { CACHE_HEADER_VALUE } from "../constants/cache";
import { AVAILABLE_LOCALES } from "../constants/locale";
import { CommonServerSideProps } from "../core/ssr-props";
import { useOrigin } from "../global-hooks/url";
import {
  getBestMatchedLocaleOrFallbackFromLanguageRange,
  getLocaleFromQuery,
} from "../helpers/i18n";
import { getOriginFromRequest } from "../helpers/next";
import { useUserMonitoring } from "../hooks/user-monitoring";

interface ServerSideProps extends CommonServerSideProps {
  indexPage: NonNullable<PromiseValue<ReturnType<typeof getIndexPageJson>>>;
  posts: PromiseValue<ReturnType<typeof getPostEntryListJson>>;
}

const Page: NextPage<ServerSideProps> = (props) => {
  const { trackUiEvent } = useUserMonitoring();
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

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({
  req,
  res,
  query,
}) => {
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
    const redirectLocale = getBestMatchedLocaleOrFallbackFromLanguageRange(
      req.headers["accept-language"] ?? ""
    );

    return {
      redirect: {
        destination: `/?hl=${redirectLocale}`,
        permanent: true,
      },
    };
  }

  const origin = getOriginFromRequest(req);
  const [intlMessages, posts, indexPage] = await Promise.all([
    fetchTranslationDictionary(locale),
    getPostEntryListJson({ locale, previewToken }),
    getIndexPageJson({ locale, previewToken }),
  ]);

  return {
    props: { origin, locale, intlMessages, indexPage, posts },
  };
};

export default Page;
