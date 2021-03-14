import { action } from "@storybook/addon-actions";
import { IntlProvider } from "react-intl";
import { MockRouterProvider } from "../core/mock-router-provider";

import "./patch-next-image";

import "normalize.css/normalize.css";
import "../pages/_app";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en-US",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en-US", right: "🇺🇸", title: "English" },
        { value: "fr_FR", right: "🇫🇷", title: "Français" },
        { value: "ja-JP", right: "🇯🇵", title: "Japanese" },
        { value: "du_My", right: "⚙️", title: "Dummy" },
      ],
    },
  },
};

export const decorators = [
  (
    Story: React.ComponentType,
    {
      parameters: {
        initialRoute: { pathname = "", query = {}, asPath = "" } = {},
      },
      globals: { locale },
    }
  ) => {
    return (
      <MockRouterProvider
        basePath=""
        route=""
        isFallback={false}
        isReady={true}
        isPreview={false}
        pathname={pathname}
        query={query}
        asPath={asPath}
        push={(...args: any[]) => {
          action("useRouter().push()")(...args);
          return Promise.resolve(false);
        }}
        replace={(...args: any[]) => {
          action("useRouter().replace()")(...args);
          return Promise.resolve(false);
        }}
        prefetch={(...args: any[]) => {
          action("useRouter().prefetch()")(...args);
          return Promise.resolve(undefined);
        }}
        beforePopState={action("useRouter().beforePopState()")}
        back={action("useRouter().back()")}
        reload={action("useRouter().reload()")}
        locale={locale}
        isLocaleDomain={false}
        events={
          {
            on: action("useRouter().events.on()"),
            off: action("useRouter().events.off()"),
          } as any
        }
      >
        <Story />
      </MockRouterProvider>
    );
  },
  (
    Story: React.ComponentType,
    { parameters: { i18nMessages = {} }, globals: { locale } }
  ) => {
    return (
      <IntlProvider locale={locale} messages={i18nMessages}>
        <Story />
      </IntlProvider>
    );
  },
];
