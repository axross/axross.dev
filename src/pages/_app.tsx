import * as React from "react";
import NextApp, { AppContext, Container } from "next/app";
import getLocale from "../utility/getLocale";
import LocaleString from "../entities/LocaleString";
import getTranslation from "../repositories/translationRepository";
import { getMyself } from "../repositories/personRepository";
import CurrentLocaleContext from "../views/components/CurrentLocaleContext";
import MyselfContext from "../views/components/MyselfContext";
import SelfUrlContext from "../views/components/SelfUrlContext";
import TranslationContext from "../views/components/TranslationContext";
import { parseJsonToPerson, jsonifyPerson } from "../parsers/person";

interface Props {
  myselfJson: any;
  locale: LocaleString;
  translation: Record<string, string>;
  pageProps: any;
}

class App extends NextApp<Props> {
  render() {
    const {
      myselfJson,
      locale,
      translation,
      pageProps,
      Component,
      router
    } = this.props;

    const myself = parseJsonToPerson(myselfJson);
    const url = new URL(router.asPath, process.env.ORIGIN);

    return (
      <Container>
        <SelfUrlContext.Provider value={url}>
          <MyselfContext.Provider value={myself}>
            <CurrentLocaleContext.Provider value={locale}>
              <TranslationContext.Provider value={translation}>
                <Component {...pageProps} />
              </TranslationContext.Provider>
            </CurrentLocaleContext.Provider>
          </MyselfContext.Provider>
        </SelfUrlContext.Provider>
      </Container>
    );
  }

  static async getInitialProps({ Component, ctx }: AppContext) {
    const locale = getLocale(ctx.query);

    const componentGetInitialProps =
      Component.getInitialProps || (() => Promise.resolve());
    const [myself, translation, pageProps] = await Promise.all([
      getMyself({ locale }),
      getTranslation(locale),
      componentGetInitialProps(ctx)
    ]);

    return {
      myselfJson: jsonifyPerson(myself),
      locale,
      translation,
      pageProps
    };
  }
}

export default App;
