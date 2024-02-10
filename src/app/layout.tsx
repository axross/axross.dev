import { GoogleAnalytics } from "@next/third-parties/google";
import { type Metadata } from "next";
import { type JSX, type ReactNode } from "react";
import { NavigationProgressBar } from "~/components/navigation-progress-bar";
import { getConfig } from "~/helpers/config";
import { baseFont } from "~/helpers/fonts";
import "../variables.css";
import "./globals.css";
import { resolveRequestedLocale } from "~/helpers/header";
import { TranslationProvider } from "~/helpers/translation.client";
import { queryBio } from "~/queries/query-bio";

async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  const bio = await queryBio();

  return {
    metadataBase: new URL(`${config.website.urlOrigin}/`),
    title: {
      template: `%s | ${config.website.title}`,
      default: config.website.title,
    },
    description: bio?.summary,
    alternates: {
      canonical: `${config.website.urlOrigin}/`,
      types: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "application/atom+xml": [
          {
            title: `Posts at ${config.website.title}`,
            url: `${config.website.urlOrigin}/feed.xml`,
          },
        ],
      },
    },
  };
}

function Layout({ children }: { readonly children: ReactNode }): JSX.Element {
  const config = getConfig();
  const locale = resolveRequestedLocale();

  return (
    <TranslationProvider locale={locale}>
      <html lang="en">
        <body className={baseFont.className}>
          {children}

          <NavigationProgressBar />
        </body>

        <GoogleAnalytics gaId={config.googleAnalytics.measurementId} />
      </html>
    </TranslationProvider>
  );
}

export { generateMetadata };
export default Layout;
