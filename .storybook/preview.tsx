import { action } from "@storybook/addon-actions";
import { TestApp } from "../core/test-app";

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
        { value: "fr-FR", right: "🇫🇷", title: "Français" },
        { value: "ja-JP", right: "🇯🇵", title: "Japanese" },
        { value: "du-My", right: "⚙️", title: "Dummy" },
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
        i18nMessages = {},
      },
      globals: { locale },
    }
  ) => {
    return (
      <TestApp
        router={{
          pathname,
          query,
          asPath,
          push: action("useRouter().push()"),
          replace: action("useRouter().replace()"),
          prefetch: action("useRouter().prefetch()"),
          beforePopState: action("useRouter().beforePopState()"),
          back: action("useRouter().back()"),
          reload: action("useRouter().reload()"),
        }}
        intl={{
          locale,
          messages: i18nMessages,
        }}
      >
        <Story />
      </TestApp>
    );
  },
];
